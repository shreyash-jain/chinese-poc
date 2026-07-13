// Verifies the two claims the POC is making to the client.
// Run: node scripts/verify-segmentation.js
import { segment, MAX_WORD_LEN } from "../src/lib/segment.js";
import { DICT } from "../src/data/dict.js";
import { PASSAGES } from "../src/data/passages.js";

const RESET = "\x1b[0m", GREEN = "\x1b[32m", RED = "\x1b[31m", DIM = "\x1b[2m";

let failures = 0;

// A case passes if `want` comes out as ONE token.
function expectToken(text, want) {
  const tokens = segment(text);
  const hit = tokens.find((t) => t.word === want);
  const ok = !!hit;
  if (!ok) failures++;
  const got = tokens.filter((t) => t.isHan).map((t) => t.word).join(" / ");
  console.log(
    `${ok ? GREEN + "PASS" : RED + "FAIL"}${RESET}  ${want.padEnd(12)} ` +
    `${DIM}→ ${got}${RESET}`
  );
}

console.log(`\nLexicon: ${Object.keys(DICT).length} headwords, longest = ${MAX_WORD_LEN} chars\n`);

console.log("── Singapore Chinese (zbschools splits these) ──────────────");
expectToken("桌上有沙爹、烤鸡翅。", "沙爹");
expectToken("和“鸳鸯”菜头粿。", "菜头粿");
expectToken("到老巴刹吃夜宵。", "老巴刹");
expectToken("桌上有福建炒虾面。", "福建炒虾面");
expectToken("视频里还出现了斑兰蛋糕。", "斑兰蛋糕");
expectToken("用鸡肉肉干破冰。", "肉干");
expectToken("我赶着搭巴士回家。", "巴士");
expectToken("和“鸳鸯”菜头粿。", "鸳鸯");

console.log("\n── Idioms, incl. long and comma-spanning ───────────────────");
expectToken("只是举手之劳。", "举手之劳");
expectToken("看似微不足道的小举动。", "微不足道");
expectToken("选择视而不见？", "视而不见");
expectToken("于是选择袖手旁观。", "袖手旁观");
expectToken("外交不一定要山珍海味。", "山珍海味");
expectToken("民以食为天，美食比演讲好。", "民以食为天");        // 5 chars
expectToken("明明不费吹灰之力。", "不费吹灰之力");                // 6 chars
expectToken("觉得“多一事不如少一事”。", "多一事不如少一事");        // 8 chars
expectToken("是一种“事不关己，己不劳心”的心态。", "事不关己，己不劳心"); // 9, spans a comma

console.log("\n── Coverage across both passages ───────────────────────────");
for (const p of PASSAGES) {
  const toks = p.paragraphs.flatMap((para) => segment(para)).filter((t) => t.isHan);
  const known = toks.filter((t) => t.inDict).length;
  const pct = ((known / toks.length) * 100).toFixed(1);
  console.log(`  ${p.title.slice(0, 18).padEnd(20)} ${known}/${toks.length} tokens in lexicon (${pct}%)`);

  const unknown = [...new Set(toks.filter((t) => !t.inDict).map((t) => t.word))];
  if (unknown.length) console.log(`  ${DIM}  not in lexicon: ${unknown.join(" ")}${RESET}`);
}

console.log(
  failures === 0
    ? `\n${GREEN}All segmentation claims hold.${RESET}\n`
    : `\n${RED}${failures} failing case(s).${RESET}\n`
);
process.exit(failures ? 1 : 0);
