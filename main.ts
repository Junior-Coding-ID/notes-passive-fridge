import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const TEXT = "I counted the door opens today: 47. The yogurt expired Tuesday. I am not angry. I am just documenting it.";

if (TEXT.length < 1 || TEXT.length > 200) {
  throw new Error(`entry text must be 1-200 characters, got ${TEXT.length}`);
}
if (TEXT.includes("\n") || TEXT.includes("\r")) {
  throw new Error("entry text must be a single line");
}

const outDir = process.env.MAKEFUN_OUTPUT ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), TEXT + "\n", "utf8");
const written = readFileSync(join(outDir, "entry.txt"), "utf8");
if (written !== TEXT + "\n") {
  throw new Error("written entry.txt does not match expected text");
}
