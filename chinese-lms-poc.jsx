import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Volume2, Split, Merge, Type, X, Loader2, PenLine,
} from "lucide-react";

// ============================================================================
// MOCK DICTIONARY (CC-CEDICT style entries)
// Production: bundle CC-CEDICT (~120k entries) as a trie/IndexedDB lookup.
// ============================================================================
const DICT = {
  "我": { trad: "我", pinyin: "wǒ", def: "I; me; my" },
  "想": { trad: "想", pinyin: "xiǎng", def: "to want; to think; to miss" },
  "学": { trad: "學", pinyin: "xué", def: "to study; to learn" },
  "学习": { trad: "學習", pinyin: "xuéxí", def: "to learn; to study" },
  "习": { trad: "習", pinyin: "xí", def: "to practice; habit" },
  "中文": { trad: "中文", pinyin: "zhōngwén", def: "Chinese language" },
  "中": { trad: "中", pinyin: "zhōng", def: "middle; center; China" },
  "文": { trad: "文", pinyin: "wén", def: "language; culture; writing" },
  "因为": { trad: "因為", pinyin: "yīnwèi", def: "because; owing to" },
  "因": { trad: "因", pinyin: "yīn", def: "cause; reason; because" },
  "为": { trad: "為", pinyin: "wèi", def: "for; because of" },
  "它": { trad: "它", pinyin: "tā", def: "it (non-human)" },
  "很": { trad: "很", pinyin: "hěn", def: "very; quite" },
  "有": { trad: "有", pinyin: "yǒu", def: "to have; there is" },
  "意思": { trad: "意思", pinyin: "yìsi", def: "meaning; idea; intention" },
  "意": { trad: "意", pinyin: "yì", def: "idea; meaning; intention" },
  "思": { trad: "思", pinyin: "sī", def: "to think; to consider" },
  "老师": { trad: "老師", pinyin: "lǎoshī", def: "teacher" },
  "老": { trad: "老", pinyin: "lǎo", def: "old; experienced" },
  "师": { trad: "師", pinyin: "shī", def: "teacher; master; expert" },
  "教": { trad: "教", pinyin: "jiāo", def: "to teach" },
  "我们": { trad: "我們", pinyin: "wǒmen", def: "we; us" },
  "们": { trad: "們", pinyin: "men", def: "plural marker for pronouns" },
  "今天": { trad: "今天", pinyin: "jīntiān", def: "today" },
  "今": { trad: "今", pinyin: "jīn", def: "now; today" },
  "天": { trad: "天", pinyin: "tiān", def: "day; sky; heaven" },
};

const SIMP_TO_TRAD = Object.fromEntries(
  Object.entries(DICT).map(([s, e]) => [s, e.trad])
);

// ============================================================================
// TONE DETECTION + COLOR (from pinyin diacritics) → 1..5 (5 = neutral)
// Palette follows the common Hanping/Dong Chinese tone scheme.
// ============================================================================
const TONE_MARKS = {
  1: "āēīōūǖ", 2: "áéíóúǘ", 3: "ǎěǐǒǔǚ", 4: "àèìòùǜ",
};
function toneOf(pinyin) {
  if (!pinyin) return 5;
  for (const t of [1, 2, 3, 4]) {
    for (const ch of pinyin) if (TONE_MARKS[t].includes(ch)) return t;
  }
  return 5;
}
const TONE_COLORS = {
  1: "#D14B3D", 2: "#E08A1E", 3: "#2F9E52", 4: "#2868C8", 5: "#9A948C",
};
const TONE_NAMES = {
  1: "high level", 2: "rising", 3: "dipping", 4: "falling", 5: "neutral",
};
function toneColorForChar(simpChar) {
  const e = DICT[simpChar];
  return e ? TONE_COLORS[toneOf(e.pinyin)] : null;
}

// ============================================================================
// Character component breakdown (radical decomposition) — illustrative subset.
// Production: use a CHISE / IDS decomposition dataset.
// ============================================================================
const COMPONENTS = {
  "想": [
    { c: "相", role: "phonetic", note: "xiāng — gives the sound" },
    { c: "心", role: "semantic", note: "heart — relates to thinking/feeling" },
  ],
  "学": [
    { c: "⺍", role: "top", note: "simplified 'learning' cap" },
    { c: "子", role: "semantic", note: "child — one who learns" },
  ],
  "意": [
    { c: "音", role: "phonetic", note: "yīn — sound" },
    { c: "心", role: "semantic", note: "heart — the mind's intent" },
  ],
  "思": [
    { c: "田", role: "top", note: "field (historically 囟, the skull)" },
    { c: "心", role: "semantic", note: "heart — the seat of thought" },
  ],
  "老": [
    { c: "耂", role: "semantic", note: "old-person radical" },
    { c: "匕", role: "phonetic", note: "component" },
  ],
  "教": [
    { c: "孝", role: "phonetic", note: "xiào — filial" },
    { c: "攵", role: "semantic", note: "'rap/strike' — action of instructing" },
  ],
  "很": [
    { c: "彳", role: "semantic", note: "'step' radical" },
    { c: "艮", role: "phonetic", note: "gèn" },
  ],
};

// ============================================================================
// SEGMENTATION — greedy forward-maximum-matching (longest word wins).
// Production: jieba-wasm or a CRF segmenter for real accuracy.
// ============================================================================
function segment(text) {
  const tokens = [];
  let i = 0;
  while (i < text.length) {
    const ch = text[i];
    if (!/[\u4e00-\u9fff]/.test(ch)) {
      tokens.push({ word: ch, isHan: false });
      i++;
      continue;
    }
    let matched = null;
    for (let len = Math.min(4, text.length - i); len >= 1; len--) {
      const candidate = text.slice(i, i + len);
      if (DICT[candidate]) { matched = candidate; break; }
    }
    if (matched) { tokens.push({ word: matched, isHan: true }); i += matched.length; }
    else { tokens.push({ word: ch, isHan: true }); i++; }
  }
  return tokens;
}

const SAMPLE_TEXT = "我想学习中文，因为它很有意思。今天老师教我们。";

// ============================================================================
// TTS — Web Speech API (zh-CN), with voice-quality ranking so we pick a
// neural/"Natural" voice when the OS/browser offers one.
// Production: route to Azure Speech (zh-CN-XiaoxiaoNeural) with SSML tone
// control for consistent, non-robotic pronunciation. See speakRemote() stub.
// ============================================================================
function rankVoice(v) {
  const n = (v.name || "").toLowerCase();
  let s = 0;
  if (n.includes("natural") || n.includes("neural")) s += 100;
  if (n.includes("xiaoxiao") || n.includes("yunxi") || n.includes("yunyang")) s += 60;
  if (n.includes("google")) s += 40;            // Google zh voices are decent
  if (n.includes("online")) s += 20;
  if (v.localService === false) s += 10;          // cloud voices > local concatenative
  return s;
}
function useChineseTTS() {
  const [speaking, setSpeaking] = useState(false);
  const [voice, setVoice] = useState(null);

  useEffect(() => {
    if (!("speechSynthesis" in window)) return;
    const pick = () => {
      const zh = window.speechSynthesis
        .getVoices()
        .filter((v) => v.lang && v.lang.toLowerCase().startsWith("zh"))
        .sort((a, b) => rankVoice(b) - rankVoice(a));
      setVoice(zh[0] || null);
    };
    pick();
    window.speechSynthesis.onvoiceschanged = pick;
  }, []);

  const speak = useCallback(
    (text, rate = 0.85) => {
      if (!("speechSynthesis" in window) || !text) return;
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = "zh-CN";
      if (voice) u.voice = voice;
      u.rate = rate;
      u.onstart = () => setSpeaking(true);
      u.onend = () => setSpeaking(false);
      u.onerror = () => setSpeaking(false);
      window.speechSynthesis.speak(u);
    },
    [voice]
  );

  return { speak, speaking, voiceName: voice?.name || null };
}

// PRODUCTION STUB — wire this to your backend that proxies Azure/Google TTS.
// Returns an audio URL/blob so the client never holds the API key.
// async function speakRemote(text, { citation = false } = {}) {
//   const ssml = citation
//     ? `<speak><prosody rate="-25%"><break time="120ms"/>${text}</prosody></speak>`
//     : text;
//   const res = await fetch("/api/tts", { method: "POST",
//     body: JSON.stringify({ text: ssml, voice: "zh-CN-XiaoxiaoNeural" }) });
//   const blob = await res.blob();
//   new Audio(URL.createObjectURL(blob)).play();
// }

// ============================================================================
// HANZI WRITER loader — injects the lib once; stroke data streams from its CDN.
// ============================================================================
function useHanziWriter() {
  const [state, setState] = useState(() =>
    typeof window !== "undefined" && window.HanziWriter ? "ready" : "loading"
  );
  useEffect(() => {
    if (window.HanziWriter) { setState("ready"); return; }
    if (document.getElementById("hanzi-writer-cdn")) return;
    const s = document.createElement("script");
    s.id = "hanzi-writer-cdn";
    s.src = "https://cdn.jsdelivr.net/npm/hanzi-writer@3/dist/hanzi-writer.min.js";
    s.async = true;
    s.onload = () => setState("ready");
    s.onerror = () => setState("error");
    document.body.appendChild(s);
    const t = setTimeout(() => { if (!window.HanziWriter) setState("error"); }, 8000);
    return () => clearTimeout(t);
  }, []);
  return state;
}

// ============================================================================
// MAIN
// ============================================================================
export default function ChineseLMS() {
  const [script, setScript] = useState("simp"); // "simp" | "trad"
  const [tokens] = useState(() => segment(SAMPLE_TEXT));
  const [hover, setHover] = useState(null);
  const [breakdown, setBreakdown] = useState(null);
  const [selection, setSelection] = useState("");
  const [showPinyin, setShowPinyin] = useState(true);
  const [toneColor, setToneColor] = useState(true);
  const { speak, speaking, voiceName } = useChineseTTS();
  const hwState = useHanziWriter();
  const containerRef = useRef(null);
  const hoverTimer = useRef(null);

  const display = (simp) =>
    script === "trad" ? SIMP_TO_TRAD[simp] || simp : simp;

  useEffect(() => {
    const onSelect = () => {
      const txt = window.getSelection()?.toString().trim() || "";
      setSelection(txt.replace(/[^\u4e00-\u9fff]/g, ""));
    };
    document.addEventListener("selectionchange", onSelect);
    return () => document.removeEventListener("selectionchange", onSelect);
  }, []);

  const showHover = (e, simpWord) => {
    clearTimeout(hoverTimer.current);
    if (!DICT[simpWord]) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const crect = containerRef.current.getBoundingClientRect();
    setHover({
      entry: DICT[simpWord],
      simp: simpWord,
      x: rect.left - crect.left + rect.width / 2,
      y: rect.top - crect.top,
    });
  };
  const hideHover = () => {
    hoverTimer.current = setTimeout(() => setHover(null), 120);
  };

  return (
    <div style={S.page}>
      <style>{CSS}</style>

      {/* Header */}
      <header style={S.header}>
        <div>
          <div style={S.kicker}>VACADEMY · LMS MODULE</div>
          <h1 style={S.h1}>读 — Chinese Reader</h1>
          <p style={S.sub}>
            Hover a word for its dictionary entry · select text to hear it ·
            tap a word to split it, see components, and watch stroke order.
          </p>
        </div>
        <div style={S.scriptToggle}>
          <button onClick={() => setScript("simp")}
            style={{ ...S.toggleBtn, ...(script === "simp" ? S.toggleOn : {}) }}>
            简 Simplified
          </button>
          <button onClick={() => setScript("trad")}
            style={{ ...S.toggleBtn, ...(script === "trad" ? S.toggleOn : {}) }}>
            繁 Traditional
          </button>
        </div>
      </header>

      {/* Selection action bar */}
      <div style={S.actionBar}>
        <div style={S.actionLabel}>
          {selection ? (
            <>Selected: <span style={S.selText}>{display(selection) || selection}</span></>
          ) : (
            <span style={{ color: "#9a9488" }}>Select Chinese text below to enable playback</span>
          )}
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button disabled={!selection} onClick={() => speak(selection)}
            style={{ ...S.playBtn, ...(!selection ? S.disabled : {}) }}>
            {speaking ? <Loader2 size={15} className="spin" /> : <Volume2 size={15} />}
            Play selection
          </button>
          <button onClick={() => speak(SAMPLE_TEXT)} style={S.playGhost}>
            <Volume2 size={15} /> Play all
          </button>
        </div>
      </div>

      {/* Reading aids */}
      <div style={S.controls}>
        <button onClick={() => setShowPinyin((v) => !v)}
          style={{ ...S.chip, ...(showPinyin ? S.chipOn : {}) }}>
          拼 Pinyin · {showPinyin ? "on" : "off"}
        </button>
        <button onClick={() => setToneColor((v) => !v)}
          style={{ ...S.chip, ...(toneColor ? S.chipOn : {}) }}>
          Tone colors · {toneColor ? "on" : "off"}
        </button>
        {toneColor && (
          <div style={S.legend}>
            {[1, 2, 3, 4, 5].map((t) => (
              <span key={t} style={S.legendItem} title={TONE_NAMES[t]}>
                <span style={{ ...S.legendDot, background: TONE_COLORS[t] }} />
                {t === 5 ? "·" : t}
              </span>
            ))}
          </div>
        )}
      </div>

      <div style={S.warn}>
        {voiceName
          ? `TTS voice: ${voiceName}. `
          : "No Chinese voice found — TTS uses the default voice. "}
        For production-grade pronunciation, route to Azure/Google neural TTS (see speakRemote stub).
      </div>

      {/* Reading pane */}
      <div style={S.readerWrap} ref={containerRef}>
        <p style={{ ...S.reader, ...(showPinyin ? S.readerRuby : {}) }}>
          {tokens.map((t, idx) => {
            if (!t.isHan)
              return <span key={idx} style={S.punct}>{t.word}</span>;
            const inDict = !!DICT[t.word];
            const shownChars = [...display(t.word)];
            const simpChars = [...t.word];
            return (
              <span key={idx}
                style={{ ...S.word, ...(inDict ? {} : S.wordPlain) }}
                onMouseEnter={(e) => showHover(e, t.word)}
                onMouseLeave={hideHover}
                onClick={() => setBreakdown(t.word)}>
                {shownChars.map((ch, j) => {
                  const simp = simpChars[j];
                  const col = toneColor ? toneColorForChar(simp) : null;
                  const py = DICT[simp]?.pinyin;
                  if (showPinyin) {
                    return (
                      <ruby key={j} style={S.ruby}>
                        <span style={col ? { color: col } : undefined}>{ch}</span>
                        <rt style={{ ...S.rt, ...(col ? { color: col } : {}) }}>{py || ""}</rt>
                      </ruby>
                    );
                  }
                  return <span key={j} style={col ? { color: col } : undefined}>{ch}</span>;
                })}
              </span>
            );
          })}
        </p>

        {/* Hover dictionary card */}
        {hover && (
          <div style={{ ...S.hoverCard, left: hover.x, top: hover.y }}
            onMouseEnter={() => clearTimeout(hoverTimer.current)}
            onMouseLeave={hideHover}>
            <div style={S.hoverHead}>
              <span style={S.hoverHanzi}>{display(hover.simp)}</span>
              <button style={S.hoverPlay} onClick={() => speak(hover.simp)} aria-label="Play">
                <Volume2 size={14} />
              </button>
            </div>
            <div style={{ ...S.hoverPinyin, color: TONE_COLORS[toneOf(hover.entry.pinyin)] }}>
              {hover.entry.pinyin}
            </div>
            <div style={S.hoverDef}>{hover.entry.def}</div>
            {script === "simp" && hover.entry.trad !== hover.simp && (
              <div style={S.hoverTrad}>trad. {hover.entry.trad}</div>
            )}
            <button style={S.hoverSplit} onClick={() => setBreakdown(hover.simp)}>
              <Split size={12} /> Break down
            </button>
          </div>
        )}
      </div>

      {breakdown && (
        <BreakdownPanel word={breakdown} display={display} speak={speak}
          hwState={hwState} onClose={() => setBreakdown(null)} />
      )}

      <footer style={S.footer}>
        POC · greedy max-match segmentation · CC-CEDICT-style sample dictionary ·
        Web Speech API · Hanzi Writer stroke data · component data illustrative
      </footer>
    </div>
  );
}

// ----------------------------------------------------------------------------
// Stroke-order animation (Hanzi Writer). Watch, then trace.
// ----------------------------------------------------------------------------
function StrokeOrder({ char, hwState }) {
  const ref = useRef(null);
  const writerRef = useRef(null);
  const [err, setErr] = useState(false);

  useEffect(() => {
    if (hwState !== "ready" || !ref.current || !window.HanziWriter) return;
    ref.current.innerHTML = "";
    setErr(false);
    let cancelled = false;
    try {
      const w = window.HanziWriter.create(ref.current, char, {
        width: 104, height: 104, padding: 6,
        showOutline: true, showCharacter: false,
        strokeAnimationSpeed: 1.1, delayBetweenStrokes: 240,
        strokeColor: "#1f1b16", outlineColor: "#e2dac9", radicalColor: "#C8453B",
        drawingColor: "#C8453B",
        charDataLoader: (c, onComplete) => {
          fetch(`https://cdn.jsdelivr.net/npm/hanzi-writer-data@2/${c}.json`)
            .then((r) => { if (!r.ok) throw new Error(); return r.json(); })
            .then((d) => { if (!cancelled) onComplete(d); })
            .catch(() => { if (!cancelled) setErr(true); });
        },
        onLoadCharDataError: () => { if (!cancelled) setErr(true); },
      });
      writerRef.current = w;
      w.animateCharacter();
    } catch { setErr(true); }
    return () => { cancelled = true; };
  }, [char, hwState]);

  if (hwState === "loading")
    return (
      <div style={S.strokeCanvas}>
        <Loader2 size={20} className="spin" style={{ color: "#b8b0a2" }} />
      </div>
    );

  if (hwState === "error" || err)
    return (
      <div style={{ ...S.strokeCanvas, ...S.strokeFallback }}>
        <span style={{ fontSize: 40, fontFamily: "'Noto Serif SC',serif" }}>{char}</span>
        <span style={S.strokeFallbackNote}>stroke data needs network</span>
      </div>
    );

  return (
    <div style={S.strokeBox}>
      <div ref={ref} style={S.strokeCanvas} />
      <div style={S.strokeBtns}>
        <button style={S.strokeBtn} onClick={() => writerRef.current?.animateCharacter()}>
          Replay
        </button>
        <button style={S.strokeBtn} onClick={() => writerRef.current?.quiz()}>
          Trace it
        </button>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------------
// Breakdown panel: stroke order + word→characters + character→components
// ----------------------------------------------------------------------------
function BreakdownPanel({ word, display, speak, hwState, onClose }) {
  const chars = [...word];
  return (
    <div style={S.modalOverlay} onClick={onClose}>
      <div style={S.modal} onClick={(e) => e.stopPropagation()}>
        <div style={S.modalHead}>
          <div>
            <div style={S.modalKicker}><Split size={13} /> Separate &amp; understand</div>
            <div style={S.modalWord}>{display(word)}</div>
          </div>
          <button style={S.closeBtn} onClick={onClose}><X size={18} /></button>
        </div>

        {/* Stroke order */}
        <div style={S.section}>
          <div style={S.sectionLabel}><PenLine size={13} /> Stroke order — watch, then trace</div>
          <div style={S.strokeRow}>
            {chars.map((c, i) => (
              <div key={i} style={S.strokeCell}>
                <StrokeOrder char={display(c)} hwState={hwState} />
                <span style={S.strokeLabel}>{display(c)} · {DICT[c]?.pinyin || ""}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Word -> characters */}
        {chars.length > 1 && (
          <div style={S.section}>
            <div style={S.sectionLabel}><Merge size={13} /> This word combines {chars.length} characters</div>
            <div style={S.charRow}>
              {chars.map((c, i) => {
                const e = DICT[c];
                const col = toneColorForChar(c);
                return (
                  <div key={i} style={S.charChip}>
                    <span style={{ ...S.chipHanzi, ...(col ? { color: col } : {}) }}>{display(c)}</span>
                    {e && <span style={S.chipPinyin}>{e.pinyin}</span>}
                    {e && <span style={S.chipDef}>{e.def.split(";")[0]}</span>}
                    <button style={S.chipPlay} onClick={() => speak(c)}><Volume2 size={12} /></button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Each character -> components */}
        <div style={S.section}>
          <div style={S.sectionLabel}><Type size={13} /> Character components</div>
          {chars.map((c, i) => {
            const comps = COMPONENTS[c];
            const e = DICT[c];
            const col = toneColorForChar(c);
            return (
              <div key={i} style={S.compBlock}>
                <div style={S.compHead}>
                  <span style={{ ...S.compHanzi, ...(col ? { color: col } : {}) }}>{display(c)}</span>
                  <div>
                    <div style={S.compPinyin}>{e?.pinyin || "—"}</div>
                    <div style={S.compMeaning}>{e?.def || ""}</div>
                  </div>
                </div>
                {comps ? (
                  <div style={S.compParts}>
                    {comps.map((p, j) => (
                      <div key={j} style={S.partRow}>
                        <span style={S.partGlyph}>{p.c}</span>
                        <span style={{ ...S.partTag, ...roleStyle(p.role) }}>{p.role}</span>
                        <span style={S.partNote}>{p.note}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={S.noComp}>Single-component character — no further breakdown.</div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function roleStyle(role) {
  if (role === "semantic") return { background: "#e7f0e4", color: "#3d6b34" };
  if (role === "phonetic") return { background: "#f3e6dd", color: "#a85a2c" };
  return { background: "#ece9e2", color: "#6b665c" };
}

// ============================================================================
// STYLES — warm paper ground, ink-red accent
// ============================================================================
const ACCENT = "#C8453B";
const INK = "#1f1b16";
const PAPER = "#F6F2E9";

const S = {
  page: { fontFamily: "'Inter', system-ui, sans-serif", background: PAPER, color: INK,
    minHeight: "100vh", padding: "32px clamp(16px, 5vw, 56px)", maxWidth: 920,
    margin: "0 auto", position: "relative" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "flex-start",
    gap: 24, flexWrap: "wrap", borderBottom: `2px solid ${INK}`, paddingBottom: 20 },
  kicker: { fontSize: 11, letterSpacing: "0.18em", color: ACCENT, fontWeight: 700, marginBottom: 8 },
  h1: { fontFamily: "'Noto Serif SC', Georgia, serif", fontSize: 34, margin: 0,
    fontWeight: 700, letterSpacing: "-0.01em" },
  sub: { fontSize: 13.5, color: "#6b665c", marginTop: 8, maxWidth: 460, lineHeight: 1.5 },
  scriptToggle: { display: "flex", border: `1.5px solid ${INK}`, borderRadius: 2, overflow: "hidden" },
  toggleBtn: { border: "none", background: "transparent", padding: "9px 14px",
    fontSize: 13, cursor: "pointer", fontWeight: 600, color: INK },
  toggleOn: { background: INK, color: PAPER },
  actionBar: { display: "flex", justifyContent: "space-between", alignItems: "center",
    gap: 16, flexWrap: "wrap", marginTop: 22, marginBottom: 12 },
  actionLabel: { fontSize: 13.5, color: "#6b665c" },
  selText: { fontFamily: "'Noto Serif SC', serif", color: INK, fontWeight: 600, fontSize: 16 },
  playBtn: { display: "inline-flex", alignItems: "center", gap: 7, background: ACCENT,
    color: "#fff", border: "none", padding: "9px 15px", borderRadius: 2, fontSize: 13,
    fontWeight: 600, cursor: "pointer" },
  playGhost: { display: "inline-flex", alignItems: "center", gap: 7, background: "transparent",
    color: INK, border: `1.5px solid ${INK}`, padding: "9px 15px", borderRadius: 2,
    fontSize: 13, fontWeight: 600, cursor: "pointer" },
  disabled: { opacity: 0.35, cursor: "not-allowed" },
  controls: { display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 12 },
  chip: { border: `1.5px solid #d8d0c0`, background: "#fffdf7", color: "#6b665c",
    padding: "7px 12px", borderRadius: 20, fontSize: 12.5, fontWeight: 600, cursor: "pointer" },
  chipOn: { borderColor: INK, background: INK, color: PAPER },
  legend: { display: "flex", alignItems: "center", gap: 12, marginLeft: 4 },
  legendItem: { display: "inline-flex", alignItems: "center", gap: 4, fontSize: 11.5,
    color: "#6b665c", fontWeight: 600 },
  legendDot: { width: 10, height: 10, borderRadius: "50%", display: "inline-block" },
  warn: { background: "#fbf0d8", border: "1px solid #e4c97a", color: "#7a5e1e",
    fontSize: 12.5, padding: "10px 14px", borderRadius: 3, marginBottom: 14, lineHeight: 1.5 },
  readerWrap: { position: "relative", background: "#fffdf7", border: `1px solid #e4ddcd`,
    borderRadius: 4, padding: "38px 34px", boxShadow: "0 1px 2px rgba(0,0,0,0.03)" },
  reader: { fontFamily: "'Noto Serif SC', serif", fontSize: 30, lineHeight: 2.1,
    margin: 0, letterSpacing: "0.02em" },
  readerRuby: { lineHeight: 2.8 },
  ruby: { rubyPosition: "over", margin: "0 1px" },
  rt: { fontFamily: "'Inter', sans-serif", fontSize: "0.36em", fontWeight: 600,
    color: "#9a948c", letterSpacing: 0, userSelect: "none" },
  word: { cursor: "pointer", borderRadius: 3, padding: "1px 2px",
    transition: "background 0.12s", display: "inline-block" },
  wordPlain: { color: "#46413a" },
  punct: { color: "#9a9488" },
  hoverCard: { position: "absolute", transform: "translate(-50%, calc(-100% - 12px))",
    background: INK, color: "#fff", borderRadius: 6, padding: "12px 14px", minWidth: 170,
    maxWidth: 230, zIndex: 30, boxShadow: "0 8px 28px rgba(0,0,0,0.28)" },
  hoverHead: { display: "flex", justifyContent: "space-between", alignItems: "center" },
  hoverHanzi: { fontFamily: "'Noto Serif SC', serif", fontSize: 24, fontWeight: 700 },
  hoverPlay: { background: "rgba(255,255,255,0.14)", border: "none", color: "#fff",
    width: 26, height: 26, borderRadius: 4, cursor: "pointer", display: "grid", placeItems: "center" },
  hoverPinyin: { fontSize: 14, fontWeight: 700, marginTop: 4 },
  hoverDef: { fontSize: 13, color: "#e8e4db", marginTop: 5, lineHeight: 1.45 },
  hoverTrad: { fontSize: 11.5, color: "#a8a297", marginTop: 6 },
  hoverSplit: { display: "inline-flex", alignItems: "center", gap: 5, marginTop: 9,
    background: "transparent", border: "1px solid rgba(255,255,255,0.25)", color: "#fff",
    fontSize: 11.5, padding: "5px 9px", borderRadius: 4, cursor: "pointer" },
  modalOverlay: { position: "fixed", inset: 0, background: "rgba(31,27,22,0.45)",
    display: "grid", placeItems: "center", padding: 20, zIndex: 50 },
  modal: { background: "#fffdf7", borderRadius: 8, maxWidth: 560, width: "100%",
    maxHeight: "85vh", overflowY: "auto", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" },
  modalHead: { display: "flex", justifyContent: "space-between", alignItems: "flex-start",
    padding: "22px 24px 16px", borderBottom: "1px solid #ece5d5", position: "sticky",
    top: 0, background: "#fffdf7", zIndex: 2 },
  modalKicker: { display: "flex", alignItems: "center", gap: 6, fontSize: 11,
    letterSpacing: "0.12em", color: ACCENT, fontWeight: 700, textTransform: "uppercase" },
  modalWord: { fontFamily: "'Noto Serif SC', serif", fontSize: 32, fontWeight: 700, marginTop: 6 },
  closeBtn: { background: "transparent", border: "none", cursor: "pointer", color: "#6b665c", padding: 4 },
  section: { padding: "18px 24px" },
  sectionLabel: { display: "flex", alignItems: "center", gap: 7, fontSize: 12, fontWeight: 700,
    color: "#6b665c", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 14 },
  strokeRow: { display: "flex", gap: 16, flexWrap: "wrap" },
  strokeCell: { display: "flex", flexDirection: "column", alignItems: "center", gap: 8 },
  strokeBox: { display: "flex", flexDirection: "column", alignItems: "center", gap: 8 },
  strokeCanvas: { width: 104, height: 104, border: "1px solid #e4ddcd", borderRadius: 6,
    background: "#fff", display: "grid", placeItems: "center",
    backgroundImage: "linear-gradient(#f1ece0 1px, transparent 1px), linear-gradient(90deg, #f1ece0 1px, transparent 1px)",
    backgroundSize: "52px 52px", backgroundPosition: "center" },
  strokeFallback: { flexDirection: "column", gap: 2, color: "#b0a896" },
  strokeFallbackNote: { fontSize: 9.5, color: "#b0a896" },
  strokeBtns: { display: "flex", gap: 6 },
  strokeBtn: { fontSize: 11.5, fontWeight: 600, padding: "5px 10px", borderRadius: 4,
    border: "1px solid #d8d0c0", background: "#faf7ef", color: INK, cursor: "pointer" },
  strokeLabel: { fontSize: 12, color: "#6b665c", fontWeight: 600 },
  charRow: { display: "flex", gap: 10, flexWrap: "wrap" },
  charChip: { border: "1px solid #e4ddcd", borderRadius: 6, padding: "12px 14px",
    background: "#faf7ef", minWidth: 92, position: "relative", display: "flex",
    flexDirection: "column", gap: 2 },
  chipHanzi: { fontFamily: "'Noto Serif SC', serif", fontSize: 26, fontWeight: 700 },
  chipPinyin: { color: ACCENT, fontSize: 13, fontWeight: 600 },
  chipDef: { fontSize: 11.5, color: "#6b665c", lineHeight: 1.3 },
  chipPlay: { position: "absolute", top: 8, right: 8, background: "#f0e9da", border: "none",
    borderRadius: 4, width: 24, height: 24, cursor: "pointer", display: "grid",
    placeItems: "center", color: INK },
  compBlock: { border: "1px solid #ece5d5", borderRadius: 6, padding: 14, marginBottom: 12, background: "#faf7ef" },
  compHead: { display: "flex", alignItems: "center", gap: 14, marginBottom: 12 },
  compHanzi: { fontFamily: "'Noto Serif SC', serif", fontSize: 40, fontWeight: 700, lineHeight: 1 },
  compPinyin: { fontSize: 15, fontWeight: 600 },
  compMeaning: { fontSize: 12.5, color: "#6b665c", marginTop: 2 },
  compParts: { display: "flex", flexDirection: "column", gap: 8 },
  partRow: { display: "flex", alignItems: "center", gap: 10 },
  partGlyph: { fontFamily: "'Noto Serif SC', serif", fontSize: 26, width: 40, textAlign: "center",
    background: "#fff", border: "1px solid #e4ddcd", borderRadius: 4, padding: "2px 0" },
  partTag: { fontSize: 10.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em",
    padding: "3px 8px", borderRadius: 10 },
  partNote: { fontSize: 12.5, color: "#46413a", lineHeight: 1.4, flex: 1 },
  noComp: { fontSize: 12.5, color: "#9a9488", fontStyle: "italic" },
  footer: { fontSize: 11, color: "#9a9488", marginTop: 28, textAlign: "center", lineHeight: 1.6 },
};

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;700&family=Inter:wght@400;600;700&display=swap');
.spin { animation: spin 0.8s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }
[style*="cursor: pointer"][style*="inline-block"]:hover { background: #f6e3df !important; }
::selection { background: #f5cfc9; }
rt { user-select: none; }
`;
