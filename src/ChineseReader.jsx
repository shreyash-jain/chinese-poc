import React, { useState, useRef, useEffect, useMemo, useCallback } from "react";
import {
  Volume2, Square, X, PenLine, Loader2, BookOpen, Quote,
  Sparkles, ChevronRight, Play, Shuffle, CornerDownRight,
} from "lucide-react";

import { DICT, SIMP_TO_TRAD, COMPONENTS } from "./data/dict.js";
import { PASSAGES } from "./data/passages.js";
import { buildPassage, flatten } from "./lib/segment.js";
import { useChineseTTS } from "./lib/tts.js";

// ── word colours ────────────────────────────────────────────────────────────
// One word = one colour, cycling. NOT tone colours — the client explicitly
// rejected per-tone highlighting as too busy to read. The point of the colour
// is to make WORD BOUNDARIES visible, so adjacent words simply differ.
const WORD_COLORS = ["#B4453C", "#2A6BB0", "#3B8A57", "#8B5BA6", "#B5762A", "#1B7C85"];

const KIND_LABEL = {
  sg: "新加坡华语",
  idiom: "成语 · 惯用语",
  name: "专有名词",
  word: "词语",
  char: "单字",
};

// ── traditional conversion (best-effort: word-level, then character-level) ──
function toTrad(s) {
  if (SIMP_TO_TRAD[s]) return SIMP_TO_TRAD[s];
  return [...s].map((c) => SIMP_TO_TRAD[c] || c).join("");
}

// ── Hanzi Writer CDN loader ─────────────────────────────────────────────────
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
  }, []);
  return state;
}

// ════════════════════════════════════════════════════════════════════════════
// MAIN
// ════════════════════════════════════════════════════════════════════════════
export default function ChineseReader() {
  const [passageIdx, setPassageIdx] = useState(0);
  const [script, setScript] = useState("simp");
  const [showPinyin, setShowPinyin] = useState(false);   // default OFF — plain black text
  const [wordColor, setWordColor] = useState(false);     // default OFF
  const [annotate, setAnnotate] = useState(true);        // marks 新加坡华语 + 成语
  const [gender, setGender] = useState("female");
  const [rate, setRate] = useState(0.85);

  const [playingIdx, setPlayingIdx] = useState(null);
  const [selection, setSelection] = useState("");
  const [active, setActive] = useState(null);            // the word in the panel

  const { speak, speakSequence, stop, speaking, voices, maleIsSimulated, hasVoice } = useChineseTTS();
  const hwState = useHanziWriter();

  const passage = PASSAGES[passageIdx];
  const { model } = useMemo(() => buildPassage(passage.paragraphs), [passage]);
  const sentences = useMemo(() => flatten(model), [model]);

  const sentenceRefs = useRef({});

  // Stop audio when the passage changes.
  useEffect(() => { stop(); setPlayingIdx(null); setActive(null); }, [passageIdx, stop]);

  // Track the user's text selection so "播放选中" can play an arbitrary span.
  useEffect(() => {
    const onSelect = () => {
      const txt = window.getSelection()?.toString() || "";
      setSelection(txt.replace(/[^一-鿿]/g, ""));
    };
    document.addEventListener("selectionchange", onSelect);
    return () => document.removeEventListener("selectionchange", onSelect);
  }, []);

  // Keep the sentence being read in view.
  useEffect(() => {
    if (playingIdx == null) return;
    sentenceRefs.current[playingIdx]?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [playingIdx]);

  const playAll = useCallback((from = 0) => {
    speakSequence(sentences.map((s) => s.text), {
      gender, rate, from,
      onSentence: setPlayingIdx,
    });
  }, [sentences, gender, rate, speakSequence]);

  const stopAll = useCallback(() => { stop(); setPlayingIdx(null); }, [stop]);

  // A drag-select ends in a click on whichever word the mouse came up over.
  // Without this guard, selecting text would also fling the panel open.
  const onWordClick = (word) => {
    if (window.getSelection()?.toString().trim()) return;
    if (DICT[word]) setActive(word);
  };

  const display = (s) => (script === "trad" ? toTrad(s) : s);

  return (
    <div style={{ ...S.shell, paddingRight: active ? PANEL_W : 0 }}>
      <style>{CSS}</style>

      <div style={S.main}>
        {/* ── Header ───────────────────────────────────────────────── */}
        <header style={S.header}>
          <div>
            <div style={S.kicker}>VACADEMY · 华文阅读模块 POC</div>
            <h1 style={S.h1}>读 · Chinese Reader</h1>
          </div>
          <div style={S.segmented}>
            <button onClick={() => setScript("simp")}
              style={{ ...S.segBtn, ...(script === "simp" ? S.segOn : {}) }}>简</button>
            <button onClick={() => setScript("trad")}
              style={{ ...S.segBtn, ...(script === "trad" ? S.segOn : {}) }}>繁</button>
          </div>
        </header>

        {/* ── What this POC is proving ─────────────────────────────── */}
        <div style={S.proof}>
          <Sparkles size={14} style={{ flexShrink: 0, marginTop: 2, color: ACCENT }} />
          <div>
            <b>这个 POC 要证明两件参考网站做不到的事：</b>
            <div style={S.proofRow}>
              <span style={S.tagSg}>新加坡华语</span>
              <span>
                <b>沙爹</b> 被识别成一个词（satay），而不是「沙」(sand) ＋「爹」(father)。
                同样：菜头粿 · 老巴刹 · 福建炒虾面 · 斑兰 · 肉干 · 鸳鸯 · 巴士。
              </span>
            </div>
            <div style={S.proofRow}>
              <span style={S.tagIdiom}>成语识别</span>
              <span>
                任意长度的成语整体识别：<b>不费吹灰之力</b>（6字）·
                <b> 多一事不如少一事</b>（8字）· <b>事不关己，己不劳心</b>（9字，跨逗号）。
              </span>
            </div>
          </div>
        </div>

        {/* ── Passage switcher ─────────────────────────────────────── */}
        <div style={S.passageTabs}>
          {PASSAGES.map((p, i) => (
            <button key={p.id} onClick={() => setPassageIdx(i)}
              style={{ ...S.passageTab, ...(i === passageIdx ? S.passageTabOn : {}) }}>
              <div style={S.passageTabTitle}>{display(p.title)}</div>
              <div style={S.passageTabMeta}>测试：{p.tests}</div>
            </button>
          ))}
        </div>

        {/* ── Playback bar ─────────────────────────────────────────── */}
        <div style={S.bar}>
          <div style={S.barGroup}>
            <span style={S.barLabel}>朗读声音</span>
            <div style={S.segmented}>
              <button onClick={() => setGender("female")}
                style={{ ...S.segBtn, ...(gender === "female" ? S.segOn : {}) }}>女声</button>
              <button onClick={() => setGender("male")}
                style={{ ...S.segBtn, ...(gender === "male" ? S.segOn : {}) }}>男声</button>
            </div>
          </div>

          <div style={S.barGroup}>
            {speaking ? (
              <button onClick={stopAll} style={S.btnStop}>
                <Square size={13} fill="currentColor" /> 停止
              </button>
            ) : (
              <button onClick={() => playAll(0)} style={S.btnPrimary}>
                <Volume2 size={15} /> 朗读全文
              </button>
            )}

            <button
              disabled={!selection}
              onClick={() => speak(selection, { gender, rate })}
              style={{ ...S.btnGhost, ...(!selection ? S.disabled : {}) }}
              title={selection ? `播放：${selection}` : "先在文章中选取一段文字"}>
              <Play size={13} /> 播放选中
              {selection && <span style={S.selChip}>{display(selection).slice(0, 8)}</span>}
            </button>
          </div>

          <div style={S.barGroup}>
            <span style={S.barLabel}>语速</span>
            <input type="range" min="0.5" max="1.2" step="0.05" value={rate}
              onChange={(e) => setRate(+e.target.value)} style={{ width: 80 }} />
            <span style={S.rateNum}>{rate.toFixed(2)}×</span>
          </div>
        </div>

        {/* ── Reading aids ─────────────────────────────────────────── */}
        <div style={S.chips}>
          <button onClick={() => setShowPinyin((v) => !v)}
            style={{ ...S.chip, ...(showPinyin ? S.chipOn : {}) }}>
            汉语拼音 · {showPinyin ? "开" : "关"}
          </button>
          <button onClick={() => setWordColor((v) => !v)}
            style={{ ...S.chip, ...(wordColor ? S.chipOn : {}) }}>
            词语分色 · {wordColor ? "开" : "关"}
          </button>
          <button onClick={() => setAnnotate((v) => !v)}
            style={{ ...S.chip, ...(annotate ? S.chipOn : {}) }}>
            标注新加坡华语／成语 · {annotate ? "开" : "关"}
          </button>
          <span style={S.hint}>
            默认是全黑的基本文本 · 悬停显示可点击 · 点击查看释义、例句和笔顺
          </span>
        </div>

        {!hasVoice && (
          <div style={S.warn}>
            这台机器没有安装中文语音，朗读会用默认语音（可能不是中文）。
            正式版会走 Azure Neural TTS（女声 XiaoxiaoNeural／男声 YunxiNeural），两把声音在所有设备上都一致。
          </div>
        )}
        {hasVoice && maleIsSimulated && (
          <div style={S.warn}>
            这台机器只装了一把中文语音（{voices.female?.name}）。「男声」目前是用降低音调模拟的。
            正式版接 Azure Neural TTS 后就是两把真人级的声音。
          </div>
        )}

        {/* ── Reader ───────────────────────────────────────────────── */}
        <article style={S.paper}>
          <h2 style={S.articleTitle}>{display(passage.title)}</h2>
          <div style={S.articleMeta}>{passage.subtitle}</div>

          {model.map((para, pi) => (
            <p key={pi} style={{ ...S.para, ...(showPinyin ? S.paraRuby : {}) }}>
              {para.map((sent) => {
                const isPlaying = sent.index === playingIdx;
                return (
                  <span
                    key={sent.index}
                    ref={(el) => { sentenceRefs.current[sent.index] = el; }}
                    onDoubleClick={() => playAll(sent.index)}
                    title="双击：从这一句开始朗读"
                    style={{ ...S.sentence, ...(isPlaying ? S.sentenceOn : {}) }}>
                    {sent.tokens.map((t, ti) => (
                      <Token
                        key={ti}
                        token={t}
                        colorIdx={ti}
                        wordColor={wordColor}
                        showPinyin={showPinyin}
                        annotate={annotate}
                        script={script}
                        onClick={onWordClick}
                      />
                    ))}
                  </span>
                );
              })}
            </p>
          ))}
        </article>

        <footer style={S.footer}>
          POC · 最长匹配分词（词库含新加坡华语与成语覆盖层）· Web Speech API 双声道朗读 ·
          Hanzi Writer 笔顺数据 · 释义与例句为示范内容
        </footer>
      </div>

      {active && (
        <WordPanel
          word={active}
          script={script}
          gender={gender}
          rate={rate}
          speak={speak}
          hwState={hwState}
          onClose={() => setActive(null)}
          onNavigate={setActive}
        />
      )}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// TOKEN — one word. Renders with optional ruby pinyin and word colour.
// ════════════════════════════════════════════════════════════════════════════
function Token({ token, colorIdx, wordColor, showPinyin, annotate, script, onClick }) {
  const { word, isHan, inDict, entry } = token;

  if (!isHan) return <span style={S.punct}>{word}</span>;

  const shown = script === "trad" ? toTrad(word) : word;
  const color = wordColor && inDict ? WORD_COLORS[colorIdx % WORD_COLORS.length] : undefined;

  const marked = annotate && (entry?.kind === "sg" || entry?.kind === "idiom");
  const markStyle = marked
    ? entry.kind === "sg" ? S.markSg : S.markIdiom
    : null;

  const cls = inDict ? "w" : "w-plain";

  return (
    <span
      className={cls}
      onClick={() => onClick(word)}
      style={{ ...S.token, ...(color ? { color } : {}), ...(markStyle || {}) }}
      title={inDict ? `${word} ${entry.py}` : undefined}
    >
      {showPinyin
        ? <ruby style={S.ruby}>
            {shown}
            <rt style={S.rt}>{entry?.py || ""}</rt>
          </ruby>
        : shown}
    </span>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// WORD PANEL — 释义 (numbered senses, EN + ZH) · 例句 · 笔顺
// ════════════════════════════════════════════════════════════════════════════
function WordPanel({ word, script, gender, rate, speak, hwState, onClose, onNavigate }) {
  const [tab, setTab] = useState("def");
  const entry = DICT[word];

  useEffect(() => { setTab("def"); }, [word]);
  if (!entry) return null;

  const shown = script === "trad" ? toTrad(word) : word;
  const chars = [...word].filter((c) => /[一-鿿]/.test(c));

  const synCount =
    (entry.syn?.length || 0) + (entry.ant?.length || 0) + (entry.rel?.length || 0);

  const TABS = [
    { id: "def", label: "释义", icon: BookOpen },
    { id: "ex", label: `例句${entry.ex?.length ? ` ${entry.ex.length}` : ""}`, icon: Quote },
    { id: "syn", label: `近义${synCount ? ` ${synCount}` : ""}`, icon: Shuffle },
    { id: "stroke", label: "笔顺", icon: PenLine },
  ];

  return (
    <aside style={S.panel}>
      {/* Head */}
      <div style={S.panelHead}>
        <button style={S.close} onClick={onClose}><X size={18} /></button>

        <div style={S.panelKindRow}>
          <span style={{
            ...S.kindTag,
            ...(entry.kind === "sg" ? S.tagSg : entry.kind === "idiom" ? S.tagIdiom : S.tagPlain),
          }}>
            {KIND_LABEL[entry.kind] || "词语"}
          </span>
        </div>

        <div style={S.panelWord}>{shown}</div>

        {/* 汉语拼音 — always shown, per the client */}
        <div style={S.panelPy}>{entry.py}</div>

        {/* Two voices */}
        <div style={S.voiceRow}>
          <button style={S.voiceBtn}
            onClick={() => speak(word, { gender: "female", rate })}>
            <Volume2 size={13} /> 女声
          </button>
          <button style={S.voiceBtn}
            onClick={() => speak(word, { gender: "male", rate })}>
            <Volume2 size={13} /> 男声
          </button>
        </div>

        {entry.note && <div style={S.note}>{entry.note}</div>}
      </div>

      {/* Tabs */}
      <div style={S.tabs}>
        {TABS.map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)}
            style={{ ...S.tab, ...(tab === t.id ? S.tabOn : {}) }}>
            <t.icon size={13} /> {t.label}
          </button>
        ))}
      </div>

      <div style={S.panelBody}>
        {/* ── 释义 ─────────────────────────────────────────────────── */}
        {tab === "def" && (
          <>
            {entry.lit && (
              <div style={S.lit}>字面：{entry.lit}</div>
            )}

            <ol style={S.senses}>
              {entry.senses.map((s, i) => (
                <li key={i} style={S.sense}>
                  <span style={S.senseNum}>{i + 1}</span>
                  <div>
                    <div style={S.senseEn}>{s.en}</div>
                    <div style={S.senseZh}>{s.zh}</div>
                  </div>
                </li>
              ))}
            </ol>

            {/* Word → characters */}
            {chars.length > 1 && (
              <div style={S.block}>
                <div style={S.blockLabel}>这个词由 {chars.length} 个字组成</div>
                <div style={S.charGrid}>
                  {chars.map((c, i) => {
                    const ce = DICT[c];
                    return (
                      <button key={i} style={S.charCell}
                        disabled={!ce}
                        onClick={() => ce && onNavigate(c)}>
                        <span style={S.charGlyph}>{script === "trad" ? toTrad(c) : c}</span>
                        <span style={S.charPy}>{ce?.py || "—"}</span>
                        <span style={S.charDef}>
                          {ce?.senses?.[0]?.en.split(";")[0] || ""}
                        </span>
                        {ce && <ChevronRight size={12} style={S.charArrow} />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </>
        )}

        {/* ── 例句 ─────────────────────────────────────────────────── */}
        {tab === "ex" && (
          <div style={S.block}>
            {entry.ex?.length ? (
              <>
                <div style={S.blockLabel}>
                  用「{shown}」造句 · 共 {entry.ex.length} 句
                </div>
                {entry.ex.map((e, i) => (
                  <div key={i} style={S.exRow}>
                    <div style={S.exHead}>
                      <span style={S.exNum}>{i + 1}</span>
                      <button style={S.exPlay}
                        onClick={() => speak(e.zh, { gender, rate })}
                        title="朗读这句">
                        <Volume2 size={12} />
                      </button>
                    </div>
                    <div style={S.exZh}>{highlight(script === "trad" ? toTrad(e.zh) : e.zh, shown)}</div>
                    <div style={S.exPy}>{e.py}</div>
                    <div style={S.exEn}>{e.en}</div>
                  </div>
                ))}
                <div style={S.exNote}>
                  示范内容。正式版每个词条会挂 20 句左右的语料（对齐参考网站），由编辑审核。
                </div>
              </>
            ) : (
              <div style={S.empty}>这个词条还没有例句。</div>
            )}
          </div>
        )}

        {/* ── 近义 · 反义 · 相关 ───────────────────────────────────── */}
        {tab === "syn" && (
          <>
            {!synCount && (
              <div style={S.empty}>这个词条还没有近义词资料。</div>
            )}

            <RelatedGroup
              title="近义词"
              hint="意思相近，但用法未必相同 —— 注意下面的辨析。"
              items={entry.syn}
              tone="syn"
              speak={speak} gender={gender} rate={rate}
              onNavigate={onNavigate} script={script}
            />
            <RelatedGroup
              title="反义词"
              items={entry.ant}
              tone="ant"
              speak={speak} gender={gender} rate={rate}
              onNavigate={onNavigate} script={script}
            />
            <RelatedGroup
              title="相关词"
              items={entry.rel}
              tone="rel"
              speak={speak} gender={gender} rate={rate}
              onNavigate={onNavigate} script={script}
            />
          </>
        )}

        {/* ── 笔顺 ─────────────────────────────────────────────────── */}
        {tab === "stroke" && (
          <div style={S.block}>
            <div style={S.blockLabel}>笔顺 — 先看动画，再自己描一次</div>
            <div style={S.strokeRow}>
              {chars.map((c, i) => (
                <div key={i} style={S.strokeCell}>
                  <StrokeOrder char={script === "trad" ? toTrad(c) : c} hwState={hwState} />
                  <span style={S.strokeLabel}>
                    {script === "trad" ? toTrad(c) : c} · {DICT[c]?.py || ""}
                  </span>
                </div>
              ))}
            </div>

            {chars.some((c) => COMPONENTS[c]) && (
              <>
                <div style={{ ...S.blockLabel, marginTop: 22 }}>部件拆解</div>
                {chars.filter((c) => COMPONENTS[c]).map((c) => (
                  <div key={c} style={S.compBlock}>
                    <div style={S.compHead}>
                      <span style={S.compGlyph}>{c}</span>
                      <span style={S.compPy}>{DICT[c]?.py}</span>
                    </div>
                    {COMPONENTS[c].map((p, j) => (
                      <div key={j} style={S.partRow}>
                        <span style={S.partGlyph}>{p.c}</span>
                        <span style={{ ...S.partTag, ...roleStyle(p.role) }}>{p.role}</span>
                        <span style={S.partNote}>{p.note}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </>
            )}

            <div style={S.exNote}>
              客户备注：笔顺属於「锦上添花」，不是这个年龄层的首要需求 —— 首要是释义和例句。
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}

// ── One group of related words (近义 / 反义 / 相关) ──────────────────────────
// A word that also exists as a headword is clickable and swaps the panel to it;
// one that doesn't still shows its pinyin and gloss, so the list is never a
// dead end. The `note` is the 辨析 — the part that says why two near-synonyms
// are not actually interchangeable.
function RelatedGroup({ title, hint, items, tone, speak, gender, rate, onNavigate, script }) {
  if (!items?.length) return null;

  return (
    <div style={S.block}>
      <div style={S.blockLabel}>
        <span style={{ ...S.relDot, background: REL_TONE[tone] }} />
        {title} · {items.length}
      </div>
      {hint && <div style={S.relHint}>{hint}</div>}

      {items.map((it, i) => {
        const known = !!DICT[it.w];
        return (
          <div key={i} style={S.relRow}>
            <div style={S.relHead}>
              <button
                disabled={!known}
                onClick={() => known && onNavigate(it.w)}
                style={{ ...S.relWord, ...(known ? S.relWordLink : {}) }}
                title={known ? "在词典中查看" : "不在示范词库内"}>
                {script === "trad" ? toTrad(it.w) : it.w}
                {known && <ChevronRight size={13} style={{ opacity: 0.5 }} />}
              </button>

              <button style={S.relPlay}
                onClick={() => speak(it.w, { gender, rate })}
                title="朗读">
                <Volume2 size={11} />
              </button>
            </div>

            <div style={S.relPy}>{it.py}</div>
            <div style={S.relEn}>{it.en}</div>

            {it.note && (
              <div style={S.relNote}>
                <CornerDownRight size={11} style={{ flexShrink: 0, marginTop: 3, opacity: 0.5 }} />
                <span>{it.note}</span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// Bold the headword wherever it appears inside an example sentence.
function highlight(sentence, word) {
  const parts = sentence.split(word);
  if (parts.length === 1) return sentence;
  return parts.flatMap((p, i) =>
    i === 0 ? [p] : [<b key={i} style={S.exHit}>{word}</b>, p]
  );
}

function roleStyle(role) {
  if (role === "semantic") return { background: "#e7f0e4", color: "#3d6b34" };
  if (role === "phonetic") return { background: "#f3e6dd", color: "#a85a2c" };
  return { background: "#ece9e2", color: "#6b665c" };
}

// ════════════════════════════════════════════════════════════════════════════
// STROKE ORDER
// ════════════════════════════════════════════════════════════════════════════
function StrokeOrder({ char, hwState }) {
  const ref = useRef(null);
  const writer = useRef(null);
  const [err, setErr] = useState(false);

  useEffect(() => {
    if (hwState !== "ready" || !ref.current || !window.HanziWriter) return;
    ref.current.innerHTML = "";
    setErr(false);
    let cancelled = false;

    try {
      const w = window.HanziWriter.create(ref.current, char, {
        width: 96, height: 96, padding: 5,
        showOutline: true, showCharacter: false,
        strokeAnimationSpeed: 1.1, delayBetweenStrokes: 220,
        strokeColor: "#1f1b16", outlineColor: "#e2dac9",
        radicalColor: ACCENT, drawingColor: ACCENT,
        charDataLoader: (c, onComplete) => {
          fetch(`https://cdn.jsdelivr.net/npm/hanzi-writer-data@2/${c}.json`)
            .then((r) => { if (!r.ok) throw new Error("no data"); return r.json(); })
            .then((d) => { if (!cancelled) onComplete(d); })
            .catch(() => { if (!cancelled) setErr(true); });
        },
      });
      writer.current = w;
      w.animateCharacter();
    } catch { setErr(true); }

    return () => { cancelled = true; };
  }, [char, hwState]);

  if (hwState === "loading")
    return <div style={S.canvas}><Loader2 size={18} className="spin" style={{ color: "#b8b0a2" }} /></div>;

  if (hwState === "error" || err)
    return (
      <div style={{ ...S.canvas, flexDirection: "column", gap: 2 }}>
        <span style={{ fontSize: 34, fontFamily: SERIF }}>{char}</span>
        <span style={{ fontSize: 9, color: "#b0a896" }}>笔顺数据需要网络</span>
      </div>
    );

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 7 }}>
      <div ref={ref} style={S.canvas} />
      <div style={{ display: "flex", gap: 5 }}>
        <button style={S.strokeBtn} onClick={() => writer.current?.animateCharacter()}>重播</button>
        <button style={S.strokeBtn} onClick={() => writer.current?.quiz()}>描一次</button>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// STYLES
// ════════════════════════════════════════════════════════════════════════════
const ACCENT = "#C8453B";
const INK = "#1f1b16";
const PAPER = "#F6F2E9";
const SERIF = "'Noto Serif SC', Georgia, serif";
const PANEL_W = 400;

const S = {
  shell: { fontFamily: "'Inter', system-ui, sans-serif", background: PAPER, color: INK, minHeight: "100vh", transition: "padding-right 0.22s" },
  // NOTE: centre with explicit marginLeft/marginRight, never the `margin` shorthand.
  // Spreading a `marginRight` override on top of `margin: "0 auto"` kills the
  // shorthand's auto-right and slams the column against the right edge.
  main: { maxWidth: 880, marginLeft: "auto", marginRight: "auto", padding: "30px clamp(16px,4vw,40px) 60px" },

  header: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 20, borderBottom: `2px solid ${INK}`, paddingBottom: 16 },
  kicker: { fontSize: 10.5, letterSpacing: "0.16em", color: ACCENT, fontWeight: 700, marginBottom: 6 },
  h1: { fontFamily: SERIF, fontSize: 30, margin: 0, fontWeight: 700 },

  segmented: { display: "flex", border: `1.5px solid ${INK}`, borderRadius: 3, overflow: "hidden", flexShrink: 0 },
  segBtn: { border: "none", background: "transparent", padding: "7px 13px", fontSize: 12.5, fontWeight: 600, color: INK, cursor: "pointer" },
  segOn: { background: INK, color: PAPER },

  proof: { display: "flex", gap: 9, background: "#fff9ec", border: "1px solid #e8d7a8", borderRadius: 5, padding: "12px 14px", marginTop: 18, fontSize: 12.5, lineHeight: 1.6, color: "#5e5344" },
  proofRow: { display: "flex", gap: 8, alignItems: "baseline", marginTop: 7 },

  passageTabs: { display: "flex", gap: 10, marginTop: 16 },
  passageTab: { flex: 1, textAlign: "left", background: "#fffdf7", border: "1.5px solid #e0d8c6", borderRadius: 5, padding: "11px 13px", cursor: "pointer", transition: "border-color .15s" },
  passageTabOn: { borderColor: INK, background: "#fff" },
  passageTabTitle: { fontFamily: SERIF, fontSize: 15, fontWeight: 700, color: INK },
  passageTabMeta: { fontSize: 11, color: "#8d8577", marginTop: 4 },

  bar: { display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap", marginTop: 18, padding: "12px 14px", background: "#fffdf7", border: "1px solid #e4ddcd", borderRadius: 5 },
  barGroup: { display: "flex", alignItems: "center", gap: 8 },
  barLabel: { fontSize: 11.5, color: "#8d8577", fontWeight: 600 },
  rateNum: { fontSize: 11.5, color: "#6b665c", fontWeight: 600, width: 34 },

  btnPrimary: { display: "inline-flex", alignItems: "center", gap: 6, background: ACCENT, color: "#fff", border: "none", padding: "8px 14px", borderRadius: 3, fontSize: 13, fontWeight: 600, cursor: "pointer" },
  btnStop: { display: "inline-flex", alignItems: "center", gap: 6, background: INK, color: PAPER, border: "none", padding: "8px 14px", borderRadius: 3, fontSize: 13, fontWeight: 600, cursor: "pointer" },
  btnGhost: { display: "inline-flex", alignItems: "center", gap: 6, background: "transparent", color: INK, border: `1.5px solid ${INK}`, padding: "7px 12px", borderRadius: 3, fontSize: 12.5, fontWeight: 600, cursor: "pointer" },
  disabled: { opacity: 0.3, cursor: "not-allowed" },
  selChip: { fontFamily: SERIF, background: "#f0e6d4", padding: "1px 5px", borderRadius: 3, fontSize: 12 },

  chips: { display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginTop: 12 },
  chip: { border: "1.5px solid #ddd5c4", background: "#fffdf7", color: "#6b665c", padding: "6px 11px", borderRadius: 16, fontSize: 12, fontWeight: 600, cursor: "pointer" },
  chipOn: { borderColor: INK, background: INK, color: PAPER },
  hint: { fontSize: 11.5, color: "#9a9488", marginLeft: 2 },

  warn: { background: "#fbf0d8", border: "1px solid #e4c97a", color: "#7a5e1e", fontSize: 12, padding: "9px 13px", borderRadius: 4, marginTop: 12, lineHeight: 1.55 },

  paper: { background: "#fffdf7", border: "1px solid #e4ddcd", borderRadius: 5, padding: "34px clamp(20px,4vw,38px)", marginTop: 16, boxShadow: "0 1px 2px rgba(0,0,0,0.03)" },
  articleTitle: { fontFamily: SERIF, fontSize: 25, fontWeight: 700, margin: 0, lineHeight: 1.45 },
  articleMeta: { fontSize: 11.5, color: "#9a9488", marginTop: 6, marginBottom: 26, paddingBottom: 14, borderBottom: "1px solid #efe8d8" },

  para: { fontFamily: SERIF, fontSize: 20, lineHeight: 2.05, margin: "0 0 22px", letterSpacing: "0.01em" },
  paraRuby: { lineHeight: 2.9 },

  sentence: { borderRadius: 3, transition: "background .18s", padding: "1px 0" },
  sentenceOn: { background: "#fbe6c8", boxShadow: "0 0 0 3px #fbe6c8" },

  token: { cursor: "pointer", borderRadius: 2, transition: "background .1s" },
  punct: { color: "#a8a296" },

  markSg: { borderBottom: "2px solid #3B8A57", paddingBottom: 1 },
  markIdiom: { borderBottom: "2px dotted #B4453C", paddingBottom: 1 },

  ruby: { rubyPosition: "over" },
  rt: { fontFamily: "'Inter', sans-serif", fontSize: "0.4em", fontWeight: 600, color: "#a09a90", letterSpacing: 0, userSelect: "none" },

  footer: { fontSize: 10.5, color: "#a8a296", marginTop: 26, textAlign: "center", lineHeight: 1.7 },

  // ── panel ──
  panel: { position: "fixed", top: 0, right: 0, width: PANEL_W, height: "100vh", background: "#fffdf7", borderLeft: "1px solid #e0d8c6", boxShadow: "-8px 0 28px rgba(0,0,0,0.06)", display: "flex", flexDirection: "column", zIndex: 40 },
  panelHead: { padding: "20px 22px 16px", borderBottom: "1px solid #ece5d5", position: "relative" },
  close: { position: "absolute", top: 14, right: 14, background: "transparent", border: "none", cursor: "pointer", color: "#9a9488", padding: 3 },
  panelKindRow: { display: "flex", gap: 6 },
  kindTag: { fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 10, letterSpacing: "0.04em" },
  tagSg: { background: "#e3f0e6", color: "#2f6b3c", fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 10, whiteSpace: "nowrap" },
  tagIdiom: { background: "#f7e3e0", color: "#a53f36", fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 10, whiteSpace: "nowrap" },
  tagPlain: { background: "#ece9e2", color: "#6b665c" },

  panelWord: { fontFamily: SERIF, fontSize: 38, fontWeight: 700, marginTop: 10, lineHeight: 1.2 },
  panelPy: { fontSize: 17, fontWeight: 600, color: ACCENT, marginTop: 3 },
  voiceRow: { display: "flex", gap: 7, marginTop: 12 },
  voiceBtn: { display: "inline-flex", alignItems: "center", gap: 5, background: "#f2ece0", border: "1px solid #e0d8c6", color: INK, fontSize: 12, fontWeight: 600, padding: "6px 11px", borderRadius: 3, cursor: "pointer" },
  note: { fontSize: 11.5, color: "#7a705f", background: "#f6f1e4", borderLeft: `3px solid ${ACCENT}`, padding: "7px 10px", borderRadius: 2, marginTop: 12, lineHeight: 1.5 },

  tabs: { display: "flex", gap: 2, padding: "0 16px", borderBottom: "1px solid #ece5d5" },
  tab: { display: "inline-flex", alignItems: "center", gap: 5, background: "transparent", border: "none", borderBottom: "2px solid transparent", padding: "10px 10px", fontSize: 12.5, fontWeight: 600, color: "#9a9488", cursor: "pointer", marginBottom: -1 },
  tabOn: { color: INK, borderBottomColor: ACCENT },

  panelBody: { flex: 1, overflowY: "auto", padding: "18px 22px 40px" },

  lit: { fontSize: 12, color: "#7a705f", fontStyle: "italic", marginBottom: 12 },
  senses: { listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 },
  sense: { display: "flex", gap: 9, alignItems: "flex-start" },
  senseNum: { flexShrink: 0, width: 19, height: 19, borderRadius: "50%", background: INK, color: PAPER, fontSize: 11, fontWeight: 700, display: "grid", placeItems: "center", marginTop: 1 },
  senseEn: { fontSize: 13.5, lineHeight: 1.5, color: INK },
  senseZh: { fontFamily: SERIF, fontSize: 13, lineHeight: 1.6, color: "#6b665c", marginTop: 2 },

  block: { marginTop: 22 },
  blockLabel: { fontSize: 11, fontWeight: 700, color: "#9a9488", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 11 },

  charGrid: { display: "flex", gap: 8, flexWrap: "wrap" },
  charCell: { position: "relative", display: "flex", flexDirection: "column", gap: 2, alignItems: "flex-start", background: "#faf7ef", border: "1px solid #e4ddcd", borderRadius: 4, padding: "9px 11px", minWidth: 84, cursor: "pointer", textAlign: "left" },
  charGlyph: { fontFamily: SERIF, fontSize: 22, fontWeight: 700 },
  charPy: { fontSize: 12, color: ACCENT, fontWeight: 600 },
  charDef: { fontSize: 10.5, color: "#8d8577", lineHeight: 1.3 },
  charArrow: { position: "absolute", top: 8, right: 6, color: "#c4bcaa" },

  exRow: { borderTop: "1px solid #efe8d8", padding: "12px 0" },
  exHead: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 5 },
  exNum: { fontSize: 10.5, fontWeight: 700, color: "#b0a896" },
  exPlay: { background: "#f2ece0", border: "none", borderRadius: 3, width: 22, height: 22, display: "grid", placeItems: "center", cursor: "pointer", color: INK },
  exZh: { fontFamily: SERIF, fontSize: 16, lineHeight: 1.75, color: INK },
  exHit: { color: ACCENT },
  exPy: { fontSize: 11.5, color: "#a09a90", marginTop: 3, lineHeight: 1.4 },
  exEn: { fontSize: 12.5, color: "#6b665c", marginTop: 4, lineHeight: 1.5 },
  exNote: { fontSize: 11, color: "#a8a296", marginTop: 16, lineHeight: 1.6, fontStyle: "italic" },
  empty: { fontSize: 12.5, color: "#a8a296", fontStyle: "italic" },

  strokeRow: { display: "flex", gap: 12, flexWrap: "wrap" },
  strokeCell: { display: "flex", flexDirection: "column", alignItems: "center", gap: 6 },
  canvas: { width: 96, height: 96, border: "1px solid #e4ddcd", borderRadius: 5, background: "#fff", display: "grid", placeItems: "center", backgroundImage: "linear-gradient(#f3eee2 1px, transparent 1px), linear-gradient(90deg, #f3eee2 1px, transparent 1px)", backgroundSize: "48px 48px", backgroundPosition: "center" },
  strokeBtn: { fontSize: 11, fontWeight: 600, padding: "4px 9px", borderRadius: 3, border: "1px solid #ddd5c4", background: "#faf7ef", color: INK, cursor: "pointer" },
  strokeLabel: { fontSize: 11.5, color: "#8d8577", fontWeight: 600 },

  compBlock: { border: "1px solid #ece5d5", borderRadius: 5, padding: 12, marginBottom: 9, background: "#faf7ef" },
  compHead: { display: "flex", alignItems: "baseline", gap: 9, marginBottom: 9 },
  compGlyph: { fontFamily: SERIF, fontSize: 26, fontWeight: 700 },
  compPy: { fontSize: 13, color: ACCENT, fontWeight: 600 },
  partRow: { display: "flex", alignItems: "center", gap: 8, marginTop: 6 },
  partGlyph: { fontFamily: SERIF, fontSize: 20, width: 32, textAlign: "center", background: "#fff", border: "1px solid #e4ddcd", borderRadius: 3, padding: "1px 0" },
  partTag: { fontSize: 9.5, fontWeight: 700, textTransform: "uppercase", padding: "2px 6px", borderRadius: 8 },
  partNote: { fontSize: 11.5, color: "#6b665c", lineHeight: 1.4, flex: 1 },
};

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;700&family=Inter:wght@400;600;700&display=swap');
* { box-sizing: border-box; }
.spin { animation: spin .8s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }

/* Hover is the affordance: the text stays clean until you point at a word. */
.w:hover { background: #f7ded9; }
.w-plain { cursor: default; }

::selection { background: #f8d3cc; }
rt { user-select: none; }
`;
