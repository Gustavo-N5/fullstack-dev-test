import { Router, Request, Response } from "express";
import { generateSuggestions } from "../geminiClient";
import { getFallbackSuggestions } from "../fallback";

const router = Router();

/**
 * @swagger
 * /api/suggestions:
 *   post:
 *     summary: Gera sugestões de mensagens para vale-presente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - occasion
 *               - relationship
 *             properties:
 *               occasion:
 *                 type: string
 *                 example: aniversário
 *               relationship:
 *                 type: string
 *                 example: amigo
 *     responses:
 *       200:
 *         description: Sugestões geradas com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 suggestions:
 *                   type: array
 *                   items:
 *                     type: string
 *                 source:
 *                   type: string
 *                   enum: [ai, fallback]
 *       400:
 *         description: Campos obrigatórios ausentes
 */
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