import { Request, Response } from "express";
import { getSuggestions } from "../services/suggestions.service";

export async function suggestionsController(
  req: Request,
  res: Response
): Promise<void> {
  const { occasion, relationship } = req.body;

  if (!occasion || !relationship) {
    res.status(400).json({
      error: "Os campos 'occasion' e 'relationship' são obrigatórios.",
    });
    return;
  }

  const result = await getSuggestions(occasion, relationship);
  res.json(result);
}