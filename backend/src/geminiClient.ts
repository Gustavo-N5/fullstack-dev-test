import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function generateSuggestions(
  occasion: string,
  relationship: string
): Promise<string[]> {
  const prompt = `
    Você é um assistente que cria mensagens carinhosas para cartões de vale-presente.
    Gere exatamente 3 mensagens curtas (1 a 2 frases cada) para:
    - Ocasião: ${occasion}
    - Relacionamento: ${relationship}

    Responda APENAS com as 3 mensagens, uma por linha, sem numeração, sem explicações.
  `;

  const result = await model.generateContent(prompt);
  const text = result.response.text();

  const suggestions = text
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .slice(0, 3);

  return suggestions;
}