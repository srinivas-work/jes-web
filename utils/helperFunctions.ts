export function toRoman(num: number): string {
  if (num <= 0 || num >= 4000) {
    throw new Error("Number out of range (must be between 1 and 3999)");
  }

  const map: [number, string][] = [
    [1000, "M"],
    [900, "CM"],
    [500, "D"],
    [400, "CD"],
    [100, "C"],
    [90, "XC"],
    [50, "L"],
    [40, "XL"],
    [10, "X"],
    [9, "IX"],
    [5, "V"],
    [4, "IV"],
    [1, "I"],
  ];

  let result = "";
  for (const [value, numeral] of map) {
    while (num >= value) {
      result += numeral;
      num -= value;
    }
  }

  return result;
}

/**
 * Splits a given string into two parts for use as text1 and text2.
 * Rules:
 * - If any word contains ':' prefer splitting immediately after that word.
 * - 4 words → split 2 : 2
 * - 3 words → split 1 : 2
 * - 2 words → split 1 : 1
 * - 1 word  → stays as text1
 * - >4 words → split roughly in half
 * - avoid leaving a single-word second line when possible
 */
export function splitText(input: string): { text1: string; text2: string } {
  if (!input || typeof input !== "string") {
    return { text1: "", text2: "" };
  }

  const words = input.trim().split(/\s+/);
  const total = words.length;

  if (total === 1) {
    return { text1: words[0], text2: "" };
  }

  // Prefer to split right after a word that contains a colon (e.g. "Models:")
  const colonIndex = words.findIndex((w) => w.includes(":"));
  let splitIndex: number;

  if (colonIndex !== -1) {
    splitIndex = colonIndex + 1;
  } else {
    switch (total) {
      case 2:
        splitIndex = 1; // 1:1
        break;
      case 3:
        splitIndex = 1; // 1:2
        break;
      case 4:
        splitIndex = 2; // 2:2
        break;
      default:
        splitIndex = Math.ceil(total / 2); // for >4 words
        break;
    }
  }

  // Avoid leaving a single-word second line if we can (e.g. "... Component" & "Assembly")
  if (total - splitIndex === 1 && splitIndex > 1) {
    splitIndex = splitIndex - 1;
  }

  const text1 = words.slice(0, splitIndex).join(" ");
  const text2 = words.slice(splitIndex).join(" ");

  return { text1, text2 };
}
