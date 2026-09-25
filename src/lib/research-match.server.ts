import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";
import { PRODUCTS } from "@/lib/universum-data";
import { JOURNALS } from "@/lib/journals";

export type ResearchMatch = { doi: string; title: string; journal: string; product: string; relevance: number; explanation: string };
export type ResearchMatchResult = { overview: string; matches: ResearchMatch[] };

export async function matchResearch(deficit: string, apiKey: string): Promise<ResearchMatchResult> {
  const catalog = PRODUCTS.flatMap((p) =>
    p.papers.map((paper) => ({
      doi: paper.doi,
      title: paper.title,
      product: p.name,
      summary: paper.summary ?? "",
      findings: paper.findings ?? [],
      journal: JOURNALS[paper.doi]?.name ?? paper.journal ?? "",
    })),
  );
  const byDoi = new Map(catalog.map((c) => [c.doi, c]));

  const provider = createOpenAI({
    baseURL: "https://ai.gateway.lovable.dev/v1",
    apiKey,
    headers: { "Lovable-API-Key": apiKey, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
  });

  const result = streamText({
    model: provider.responses("openai/gpt-6-astra"),
    system:
      "Ты — научный консультант психолого-педагогического консилиума (ППк). По описанию дефицита развития ребёнка выбери из КАТАЛОГА только действительно релевантные исследования (от 1 до 5) и объясни на русском языке, как их выводы применимы к этому ребёнку и с какими ограничениями. Не выдумывай исследования и DOI — используй только каталог. Не ставь диагнозов. Ответь строго JSON без markdown: {\"overview\": string (2-3 предложения), \"matches\": [{\"doi\": string, \"relevance\": number 0-100, \"explanation\": string (2-4 предложения)}]}",
    prompt: `ОПИСАНИЕ ДЕФИЦИТА:\n${deficit}\n\nКАТАЛОГ:\n${JSON.stringify(catalog)}`,
    providerOptions: {
      openai: {
        forceReasoning: true,
        reasoningEffort: "low",
        reasoningSummary: "auto",
        store: false,
        include: ["reasoning.encrypted_content"],
      },
    },
  });

  const text = await result.text;
  const json = text.slice(text.indexOf("{"), text.lastIndexOf("}") + 1);
  let parsed: { overview?: string; matches?: { doi: string; relevance: number; explanation: string }[] } = {};
  try {
    parsed = JSON.parse(json);
  } catch {
    throw new Error("Не удалось разобрать ответ модели. Попробуйте ещё раз.");
  }
  const matches = (parsed.matches ?? [])
    .filter((m) => byDoi.has(m.doi))
    .slice(0, 5)
    .map((m) => {
      const c = byDoi.get(m.doi)!;
      return {
        doi: m.doi,
        title: c.title,
        journal: c.journal,
        product: c.product,
        relevance: Math.max(0, Math.min(100, Math.round(Number(m.relevance) || 0))),
        explanation: String(m.explanation ?? ""),
      };
    })
    .sort((a, b) => b.relevance - a.relevance);
  return { overview: String(parsed.overview ?? ""), matches };
}
