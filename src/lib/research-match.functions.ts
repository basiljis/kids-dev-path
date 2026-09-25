import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const findResearch = createServerFn({ method: "POST" })
  .inputValidator((data) => z.object({ deficit: z.string().trim().min(10).max(3000) }).parse(data))
  .handler(async ({ data }) => {
    const apiKey = process.env["LOVABLE_API_KEY"];
    if (!apiKey) throw new Error("ИИ-помощник не настроен.");
    const { matchResearch } = await import("./research-match.server");
    try {
      return await matchResearch(data.deficit, apiKey);
    } catch (e: unknown) {
      const status = (e as { statusCode?: number })?.statusCode;
      if (status === 429) throw new Error("Слишком много запросов. Подождите минуту и попробуйте снова.");
      if (status === 402) throw new Error("Закончились кредиты ИИ. Пополните баланс в настройках рабочего пространства.");
      throw new Error(e instanceof Error ? e.message : "Ошибка ИИ-помощника");
    }
  });
