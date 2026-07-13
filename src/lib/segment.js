import { DICT } from "../data/dict.js";

// ============================================================================
// SEGMENTATION — forward maximum matching (longest word wins)
//
// Two properties that matter for this client, and that the reference site
// (zbschools.sg) does NOT have:
//
//  1. The window is as long as the longest headword in the lexicon — currently
//     9 — so 多一事不如少一事 (8) and 事不关己，己不劳心 (9) match as ONE token
//     instead of being shredded into single characters.
//
//  2. The candidate slice is taken from the RAW text, punctuation included.
//     That is what lets 事不关己，己不劳心 match across the 逗号. A segmenter
//     that stops at punctuation can never find it.
//
// Because the lexicon carries a Singapore overlay, 沙爹 matches as one word
// (satay) rather than 沙 (sand) + 爹 (father).
//
// PRODUCTION: swap in jieba-wasm or a CRF/BiLSTM segmenter, but keep the
// Singapore + idiom lexicon as a user-dictionary override — general-purpose
// segmenters trained on mainland corpora will still miss 菜头粿.
// ============================================================================

const HAN = /[一-鿿]/;

// Longest headword in the lexicon drives the matching window.
export const MAX_WORD_LEN = Object.keys(DICT).reduce(
  (m, w) => Math.max(m, w.length),
  1
);

export function segment(text) {
  const tokens = [];
  let i = 0;

  while (i < text.length) {
    const ch = text[i];

    // Non-Chinese (punctuation, latin, spaces) passes through untouched.
    if (!HAN.test(ch)) {
      tokens.push({ word: ch, isHan: false, inDict: false });
      i++;
      continue;
    }

    // Longest-first match. Slices come from the raw text, so a headword that
    // contains punctuation (事不关己，己不劳心) can still be found.
    let matched = null;
    const window = Math.min(MAX_WORD_LEN, text.length - i);
    for (let len = window; len >= 1; len--) {
      const candidate = text.slice(i, i + len);
      if (DICT[candidate]) {
        matched = candidate;
        break;
      }
    }

    if (matched) {
      tokens.push({ word: matched, isHan: true, inDict: true, entry: DICT[matched] });
      i += matched.length;
    } else {
      // Unknown character — still rendered, just not clickable.
      tokens.push({ word: ch, isHan: true, inDict: false });
      i++;
    }
  }

  return tokens;
}

// ── Sentence splitting, for the read-aloud karaoke highlight ────────────────
// Splits on 。！？ and absorbs any trailing closing quote so that a sentence
// ending inside a quotation doesn't leave a stray ” on the next line.
const SENTENCE_END = "。！？";
const CLOSERS = "”’」』）)》";

export function splitSentences(paragraph) {
  const sentences = [];
  let buf = "";

  for (let i = 0; i < paragraph.length; i++) {
    buf += paragraph[i];
    if (SENTENCE_END.includes(paragraph[i])) {
      while (i + 1 < paragraph.length && CLOSERS.includes(paragraph[i + 1])) {
        buf += paragraph[++i];
      }
      sentences.push(buf);
      buf = "";
    }
  }
  if (buf.trim()) sentences.push(buf);

  return sentences;
}

// ── Build the full render model: paragraphs → sentences → tokens ────────────
// Sentences get a flat index so read-aloud can walk the passage linearly
// while the DOM stays nested.
export function buildPassage(paragraphs) {
  let flat = 0;
  const model = paragraphs.map((para) =>
    splitSentences(para).map((text) => ({
      index: flat++,
      text,
      tokens: segment(text),
    }))
  );
  return { model, sentenceCount: flat };
}

// Flatten to the linear sentence list the player walks through.
export function flatten(model) {
  return model.flat();
}
