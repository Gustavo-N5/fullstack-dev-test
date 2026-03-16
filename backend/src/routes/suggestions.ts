import { Router, Request, Response } from "express";
import { generateSuggestions } from "../geminiClient";
import { getFallbackSuggestions } from "../fallback";

const router = Router();

router.post("/suggestions", async (req: Request, res: Response) => {
  const { occasion, relationship } = req.body;

  if (!occasion || !relationship) {
    res.status(400).json({
      error: "Os campos 'occasion' e 'relationship' são obrigatórios.",
    });
    return;
  }

  try {
    const suggestions = await generateSuggestions(occasion, relationship);
    res.json({ suggestions, source: "ai" });
  } catch (error) {
    console.error("Gemini falhou, usando fallback:", error);

    const suggestions = getFallbackSuggestions(occasion, relationship);
    res.json({ suggestions, source: "fallback" });
  }
});

export default router;