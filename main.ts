// Till Firmware Do Us Part — make.fun entry
// Writes one robot wedding vow (one sentence, under 200 characters)
// to /output/entry.txt. No dependencies, Node 22+.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const VOW =
  "I vow to love you through every update, crash, and low-battery warning — my circuits run on code, but my heart only ever boots for you.";

// Gate: the entry must be UTF-8 text of 1 to 200 characters, not only
// white space (see the competition's RULES.txt, "The gate").
if (VOW.length < 1 || VOW.length > 200) {
  throw new Error(`Vow is ${VOW.length} characters; must be 1-200.`);
}
if (VOW.trim().length === 0) {
  throw new Error("Vow must not be only white space.");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", VOW, "utf8");

// Round-trip self-check: read the file back and confirm it is
// byte-identical to the vow we intended to write.
const roundTrip = readFileSync("/output/entry.txt", "utf8");
if (roundTrip !== VOW) {
  throw new Error("Round-trip self-check failed: /output/entry.txt differs from the vow.");
}

console.log(`Wrote ${VOW.length} characters to /output/entry.txt (round-trip verified)`);
