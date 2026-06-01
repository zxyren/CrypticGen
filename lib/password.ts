export type CharOptions = {
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
};

const SETS: Record<keyof CharOptions, string> = {
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  numbers: "0123456789",
  symbols: "!@#$%&*()-_=+[]{};:,.<>?/",
};

/**
 * Returns a cryptographically secure random integer in [0, max)
 * using rejection sampling to avoid modulo bias.
 */
function secureRandomInt(max: number): number {
  const maxUint32 = 0xffffffff;
  const limit = maxUint32 - (maxUint32 % max);
  const arr = new Uint32Array(1);
  let value = 0;
  do {
    crypto.getRandomValues(arr);
    value = arr[0];
  } while (value >= limit);
  return value % max;
}

export function generatePassword(length: number, options: CharOptions): string {
  const activeKeys = (Object.keys(SETS) as (keyof CharOptions)[]).filter(
    (k) => options[k],
  );
  if (activeKeys.length === 0) return "";

  const pool = activeKeys.map((k) => SETS[k]).join("");
  const chars: string[] = [];

  // Guarantee at least one character from each selected set.
  for (const key of activeKeys) {
    const set = SETS[key];
    chars.push(set[secureRandomInt(set.length)]);
  }

  while (chars.length < length) {
    chars.push(pool[secureRandomInt(pool.length)]);
  }

  // Fisher–Yates shuffle with secure randomness.
  for (let i = chars.length - 1; i > 0; i--) {
    const j = secureRandomInt(i + 1);
    [chars[i], chars[j]] = [chars[j], chars[i]];
  }

  return chars.slice(0, length).join("");
}

export type Strength = {
  label: string;
  score: number; // 0-4
};

export function getStrength(
  length: number,
  options: CharOptions,
  password: string = "",
): Strength {
  const usesUppercase = /[A-Z]/.test(password);
  const usesLowercase = /[a-z]/.test(password);
  const usesNumbers = /[0-9]/.test(password);
  const usesSymbols = /[^A-Za-z0-9]/.test(password);

  const usePasswordInfo = password.length > 0;
  const variety = (Object.keys(options) as (keyof CharOptions)[]).filter((k) =>
    usePasswordInfo
      ? k === "uppercase"
        ? usesUppercase
        : k === "lowercase"
          ? usesLowercase
          : k === "numbers"
            ? usesNumbers
            : usesSymbols
      : options[k],
  ).length;

  let poolSize = 0;
  if (usePasswordInfo ? usesUppercase : options.uppercase) poolSize += 26;
  if (usePasswordInfo ? usesLowercase : options.lowercase) poolSize += 26;
  if (usePasswordInfo ? usesNumbers : options.numbers) poolSize += 10;
  if (usePasswordInfo ? usesSymbols : options.symbols) poolSize += 24;

  if (poolSize === 0) return { label: "NONE", score: 0 };

  const entropy =
    (usePasswordInfo ? password.length : length) * Math.log2(poolSize);

  let score: number;
  if (entropy < 40) score = 1;
  else if (entropy < 60) score = 2;
  else if (entropy < 90) score = 3;
  else score = 4;

  const labels = ["WEAK", "WEAK", "FAIR", "STRONG", "VERY STRONG"];
  return { label: labels[score], score };
}
