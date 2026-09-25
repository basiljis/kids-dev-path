import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Sparkles, Loader2, BookOpen } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { findResearch } from "@/lib/research-match.functions";

type Result = Awaited<ReturnType<typeof findResearch>>;

const EXAMPLE = "Ребёнок 6 лет, ЗПР. Истощаемость внимания через 5–7 минут, импульсивность, трудности звукопроизношения (свистящие), неловкость в мелкой моторике.";

export function ResearchAssistant() {
  const run = useServerFn(findResearch);
  const [deficit, setDeficit] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Result | null>(null);

  const submit = async () => {
    setLoading(true); setError(null); setResult(null);
    try {
      setResult(await run({ data: { deficit } }));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Ошибка");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="mt-12 p-6 border-primary/20">
      <div className="flex items-center gap-2">
        <Sparkles className="size-5 text-primary" />
        <h2 className="text-xl font-bold">ИИ-подбор исследований по дефициту</h2>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">
        Для специалистов ППк: опишите дефициты развития ребёнка — ИИ подберёт исследования из научной базы UNIVERSUM и объяснит их применимость. Не является диагнозом.
      </p>
      <Textarea
        className="mt-4 min-h-28"
        placeholder={EXAMPLE}
        value={deficit}
        onChange={(e) => setDeficit(e.target.value)}
        maxLength={3000}
      />
      <div className="mt-3 flex flex-wrap gap-2">
        <Button onClick={submit} disabled={loading || deficit.trim().length < 10} className="gap-2">
          {loading ? <Loader2 className="size-4 animate-spin" /> : <Sparkles className="size-4" />}
          {loading ? "Анализируем…" : "Подобрать исследования"}
        </Button>
        <Button variant="ghost" onClick={() => setDeficit(EXAMPLE)} disabled={loading}>Пример</Button>
      </div>
      {error && <p className="mt-4 text-sm text-destructive">{error}</p>}
      {result && (
        <div className="mt-6 space-y-4">
          {result.overview && <p className="rounded-lg bg-primary/5 p-4 text-sm leading-relaxed">{result.overview}</p>}
          {result.matches.length === 0 && <p className="text-sm text-muted-foreground">Релевантных исследований в базе не найдено.</p>}
          {result.matches.map((m) => (
            <div key={m.doi} className="rounded-xl border p-4">
              <div className="flex items-start justify-between gap-3">
                <p className="font-bold leading-tight">{m.title}</p>
                <Badge variant="secondary" className="shrink-0">{m.relevance}%</Badge>
              </div>
              <p className="mt-1 text-xs text-muted-foreground"><i>{m.journal}</i> · {m.product}</p>
              <p className="mt-2 text-sm leading-relaxed text-foreground/85">{m.explanation}</p>
              <a href={`https://doi.org/${m.doi}`} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1 text-sm text-primary hover:underline">
                <BookOpen className="size-3" /> DOI: {m.doi}
              </a>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
