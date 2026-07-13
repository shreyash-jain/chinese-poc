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

// Known zh voice names by gender. Covers Microsoft/Edge (Xiaoxiao, Yunxi…),
// the classic macOS voices (Tingting, Meijia, Sinji) AND the newer Apple
// expressive voices (Reed, Eddy, Flo, Shelley…), which is where the first
// version went wrong: it recognised none of the Apple names, so it concluded
// the machine had no male Chinese voice when in fact it has four.
const FEMALE_HINTS = [
  // Microsoft / Edge
  "xiaoxiao", "xiaoyi", "xiaohan", "xiaomo", "xiaoxuan", "xiaorui", "huihui", "yaoyao",
  // Apple — classic
  "tingting", "ting-ting", "婷婷", "meijia", "mei-jia", "美佳", "sinji", "善怡",
  // Apple — expressive
  "flo", "shelley", "sandy", "grandma",
  "female", "女",
];
const MALE_HINTS = [
  // Microsoft / Edge
  "yunxi", "yunyang", "yunjian", "yunye", "yunfeng", "yunhao", "yunze",
  "kangkang", "liangliang", "li-mu", "limu",
  // Apple — expressive
  "reed", "eddy", "rocko", "grandpa",
  "male", "男",
];

// Voices that are deliberately cartoonish. Usable, but never auto-selected for
// a language-learning demo — a student should not be taught tones by "Grandpa".
const NOVELTY = ["grandma", "grandpa", "rocko", "sandy", "shelley", "flo", "eddy"];

function isMandarinCN(v) {
  return (v.lang || "").toLowerCase().replace("_", "-").startsWith("zh-cn");
}

// Ranking. The single biggest factor is zh-CN: we are teaching 普通话, so a
// Taiwanese (zh-TW) or Cantonese (zh-HK) voice is the wrong accent even when
// it is the higher-fidelity voice.
function quality(v) {
  const n = (v.name || "").toLowerCase();
  let s = 0;
  if (isMandarinCN(v)) s += 500;                                  // right accent, above all else
  if (n.includes("natural") || n.includes("neural")) s += 100;    // neural > concatenative
  if (n.includes("online")) s += 30;
  if (n.includes("google")) s += 25;
  if (v.localService === false) s += 10;
  if (NOVELTY.some((h) => n.includes(h))) s -= 60;                // usable, but not the default
  return s;
}

export function genderOf(v) {
  const n = (v.name || "").toLowerCase();
  if (MALE_HINTS.some((h) => n.includes(h))) return "male";
  if (FEMALE_HINTS.some((h) => n.includes(h))) return "female";
  return null;
}

export function useChineseTTS() {
  const [all, setAll] = useState([]);
  const [auto, setAuto] = useState({ female: null, male: null });
  // User's explicit choice, by voiceURI. Beats the heuristic every time.
  const [override, setOverride] = useState({ female: null, male: null });
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

      setAll(zh);
      setAuto({
        female: zh.find((v) => genderOf(v) === "female") || zh[0] || null,
        male: zh.find((v) => genderOf(v) === "male") || null,
      });
    };

    pick();
    window.speechSynthesis.onvoiceschanged = pick;
    return () => { window.speechSynthesis.onvoiceschanged = null; };
  }, []);

  const byURI = (uri) => all.find((v) => v.voiceURI === uri) || null;

  const female = (override.female && byURI(override.female)) || auto.female;
  const male = (override.male && byURI(override.male)) || auto.male;

  // Only "simulated" when there is genuinely no male voice to use.
  const maleIsSimulated = !male;
  const voices = { female, male: male || female, all };

  const setVoiceFor = useCallback((gender, voiceURI) => {
    setOverride((o) => ({ ...o, [gender]: voiceURI || null }));
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
    setVoiceFor,
    genderOf,
    maleIsSimulated,
    hasVoice: all.length > 0,
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
