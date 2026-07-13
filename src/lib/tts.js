import { useState, useEffect, useRef, useCallback } from "react";

// ============================================================================
// TEXT-TO-SPEECH — Web Speech API, with a female voice and a male voice.
//
// Reality check for the demo: the browser can only offer the zh voices the OS
// has installed. Edge ships both (Xiaoxiao 女 / Yunxi 男). macOS Safari and
// Chrome usually ship only 婷婷 (female). So we:
//   • rank the available zh voices and pick the best distinct 女声 and 男声;
//   • if the OS has no male zh voice, fall back to the same voice at a lower
//     pitch and SAY SO in the UI rather than pretending.
//
// PRODUCTION: proxy to Azure Speech through your own backend so the two voices
// are guaranteed and identical on every device, and the API key never reaches
// the client:
//     女声  zh-CN-XiaoxiaoNeural
//     男声  zh-CN-YunxiNeural
// See speakRemote() at the bottom.
// ============================================================================

const FEMALE_HINTS = [
  "xiaoxiao", "xiaoyi", "xiaohan", "xiaomo", "xiaoxuan", "xiaorui",
  "tingting", "ting-ting", "婷婷", "sinji", "meijia", "mei-jia",
  "huihui", "yaoyao", "female", "女",
];
const MALE_HINTS = [
  "yunxi", "yunyang", "yunjian", "yunye", "yunfeng", "yunhao",
  "kangkang", "liangliang", "li-mu", "limu", "yunze",
  "male", "男",
];

// Prefer neural / cloud voices — the old concatenative ones sound robotic.
function quality(v) {
  const n = (v.name || "").toLowerCase();
  let s = 0;
  if (n.includes("natural") || n.includes("neural")) s += 100;
  if (n.includes("online")) s += 30;
  if (n.includes("google")) s += 25;
  if (v.localService === false) s += 10;
  return s;
}

function genderOf(v) {
  const n = (v.name || "").toLowerCase();
  if (MALE_HINTS.some((h) => n.includes(h))) return "male";
  if (FEMALE_HINTS.some((h) => n.includes(h))) return "female";
  return null;
}

export function useChineseTTS() {
  const [voices, setVoices] = useState({ female: null, male: null, all: [] });
  const [maleIsSimulated, setMaleIsSimulated] = useState(false);
  const [speaking, setSpeaking] = useState(false);

  // Bumped on every stop / new playback. Any callback holding a stale
  // generation number silently no-ops, which is what keeps a cancelled queue
  // from resuming — speechSynthesis.cancel() fires onend, so a naive chain
  // would march on after being stopped.
  const gen = useRef(0);

  useEffect(() => {
    if (!("speechSynthesis" in window)) return;

    const pick = () => {
      const zh = window.speechSynthesis
        .getVoices()
        .filter((v) => v.lang && v.lang.toLowerCase().startsWith("zh"))
        .sort((a, b) => quality(b) - quality(a));

      if (!zh.length) {
        setVoices({ female: null, male: null, all: [] });
        return;
      }

      const female = zh.find((v) => genderOf(v) === "female") || zh[0];
      const male = zh.find((v) => genderOf(v) === "male");

      setMaleIsSimulated(!male);
      setVoices({ female, male: male || female, all: zh });
    };

    pick();
    window.speechSynthesis.onvoiceschanged = pick;
    return () => { window.speechSynthesis.onvoiceschanged = null; };
  }, []);

  // Chrome silently suspends synthesis after ~15s. Nudging it keeps a long
  // read-aloud alive.
  useEffect(() => {
    if (!speaking) return;
    const id = setInterval(() => {
      const s = window.speechSynthesis;
      if (s.speaking && !s.paused) { s.pause(); s.resume(); }
    }, 10000);
    return () => clearInterval(id);
  }, [speaking]);

  const stop = useCallback(() => {
    gen.current++;
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    setSpeaking(false);
  }, []);

  // One utterance. Does NOT cancel — the queue below relies on chaining from
  // onend, and cancelling mid-chain would kill the next utterance.
  const utter = useCallback(
    (text, { gender = "female", rate = 0.85, onEnd, myGen }) => {
      if (!("speechSynthesis" in window) || !text) return;
      const u = new SpeechSynthesisUtterance(text);
      u.lang = "zh-CN";

      const v = gender === "male" ? voices.male : voices.female;
      if (v) u.voice = v;

      u.rate = rate;
      // No real male voice on this OS → drop the pitch so the two buttons are
      // at least audibly different. Flagged in the UI as simulated.
      u.pitch = gender === "male" && maleIsSimulated ? 0.6 : 1;

      const done = () => {
        if (myGen !== undefined && myGen !== gen.current) return;
        onEnd?.();
      };
      u.onend = done;
      u.onerror = done;

      window.speechSynthesis.speak(u);
    },
    [voices, maleIsSimulated]
  );

  // Speak an arbitrary string (a word in the panel, or the user's selection).
  const speak = useCallback(
    (text, { gender = "female", rate = 0.85 } = {}) => {
      if (!text) return;
      gen.current++;
      const myGen = gen.current;
      if ("speechSynthesis" in window) window.speechSynthesis.cancel();
      setSpeaking(true);
      utter(text, {
        gender,
        rate,
        myGen,
        onEnd: () => { if (myGen === gen.current) setSpeaking(false); },
      });
    },
    [utter]
  );

  // Read a list of sentences in order, calling onSentence(i) as each begins
  // and onSentence(null) when the passage finishes. This is what drives the
  // highlight-and-scroll — Web Speech `boundary` events are unreliable for
  // Chinese, so we sequence at the sentence level instead.
  const speakSequence = useCallback(
    (sentences, { gender = "female", rate = 0.85, from = 0, onSentence } = {}) => {
      if (!sentences.length) return;
      gen.current++;
      const myGen = gen.current;
      if ("speechSynthesis" in window) window.speechSynthesis.cancel();
      setSpeaking(true);

      const step = (i) => {
        if (myGen !== gen.current) return;
        if (i >= sentences.length) {
          setSpeaking(false);
          onSentence?.(null);
          return;
        }
        onSentence?.(i);
        utter(sentences[i], { gender, rate, myGen, onEnd: () => step(i + 1) });
      };

      step(from);
    },
    [utter]
  );

  return {
    speak,
    speakSequence,
    stop,
    speaking,
    voices,
    maleIsSimulated,
    hasVoice: voices.all.length > 0,
  };
}

// PRODUCTION STUB — route through your backend so the key stays server-side
// and both voices exist on every device.
//
// async function speakRemote(text, { gender = "female", slow = false } = {}) {
//   const voice = gender === "male" ? "zh-CN-YunxiNeural" : "zh-CN-XiaoxiaoNeural";
//   const ssml = slow
//     ? `<speak><prosody rate="-25%">${text}</prosody></speak>`
//     : text;
//   const res = await fetch("/api/tts", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ text: ssml, voice }),
//   });
//   new Audio(URL.createObjectURL(await res.blob())).play();
// }
