// One Word From Grandma — entry program.
// Writes the single word a grandma would text about AI to entry.txt.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry word, held as its parts so the assembled word is checked
// as one unit before it is ever written out.
const WORD_PARTS = ["Witch", "craft"] as const;
const ENTRY_WORD = WORD_PARTS.join("");

// The gate: /output/entry.txt must be UTF-8 text of 1-30 characters,
// not only whitespace, and this competition wants exactly one word.
function validateEntryWord(word: string): void {
  if (word.length < 1 || word.length > 30) {
    throw new Error(`entry word must be 1-30 characters, got ${word.length}`);
  }
  if (word.trim().length === 0) {
    throw new Error("entry word must not be only whitespace");
  }
  if (/\s/.test(word)) {
    throw new Error("entry must be exactly one word with no whitespace");
  }
  if (/[.,!?;:'"()\[\]{}]/.test(word)) {
    throw new Error("entry must be one plain word with no punctuation");
  }
}

validateEntryWord(ENTRY_WORD);

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outputPath = join(outputDir, "entry.txt");

mkdirSync(outputDir, { recursive: true });
writeFileSync(outputPath, ENTRY_WORD, "utf8");

// Read back what was written and re-check it: the file on disk must
// be exactly the validated word, nothing more.
const written = readFileSync(outputPath, "utf8");
if (written !== ENTRY_WORD) {
  throw new Error(`verification failed: file contains ${JSON.stringify(written)}`);
}
console.log(`wrote ${ENTRY_WORD.length} characters to ${outputPath}`);
