const FALLBACKS: Record<string, string[]> = {
  default: [
    "Que este presente traga muita alegria!",
    "Com carinho, pensando em você.",
    "Espero que goste deste presente especial.",
  ],
};

export function getFallbackSuggestions(
  occasion: string,
  relationship: string
): string[] {
  
  return FALLBACKS["default"];
}