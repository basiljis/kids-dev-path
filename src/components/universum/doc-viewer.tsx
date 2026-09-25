import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogPortal,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FileText, Download, ExternalLink } from "lucide-react";
import { JOURNALS } from "@/lib/journals";

interface DocViewerProps {
  url: string;
  title: string;
  isOpen: boolean;
  onClose: () => void;
  summary?: string | undefined;
  findings?: string[] | undefined;
}

export function DocViewer({ url, title, isOpen, onClose, summary, findings }: DocViewerProps) {
  const isExternalSource = url.includes("doi.org/");
  const doi = isExternalSource ? url.split("doi.org/")[1] ?? "" : "";
  const journal = doi ? JOURNALS[doi] : undefined;
  const isPdf = isExternalSource || url.toLowerCase().endsWith(".pdf");
  
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = url;
    link.download = title || "document";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogPortal>
        <DialogContent className="max-w-4xl w-[95vw] h-[90vh] flex flex-col p-0 overflow-hidden gap-0 z-[100]">
          <DialogHeader className="px-6 py-4 border-b flex flex-row items-center justify-between space-y-0 shrink-0">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <FileText className="size-5 text-primary" />
              </div>
              <DialogTitle className="text-lg font-bold leading-none truncate max-w-[400px]">
                {title}
              </DialogTitle>
            </div>
            <div className="flex items-center gap-2 pr-8">
              <Button variant="outline" size="sm" onClick={handleDownload} className="gap-2">
                <Download className="size-4" />
                <span className="hidden sm:inline">Скачать</span>
              </Button>
              <Button variant="outline" size="sm" asChild className="gap-2">
                <a href={url} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="size-4" />
                  <span className="hidden sm:inline">В новой вкладке</span>
                </a>
              </Button>
            </div>
          </DialogHeader>
          
          <div className="flex-1 bg-muted/20 relative flex flex-col sm:flex-row overflow-hidden">
            {isExternalSource ? (
              <div className="flex-1 overflow-y-auto bg-background p-6 sm:p-8">
                <div className="mx-auto max-w-2xl space-y-6">
                  {journal && (
                    <div className="rounded-xl border border-primary/15 bg-primary/5 p-4">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">{journal.kind}</p>
                      <p className="mt-1 text-base font-bold italic">{journal.name}</p>
                      {journal.ru && <p className="text-sm text-foreground/80">{journal.ru}</p>}
                      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[13px] text-foreground/80">
                        <span>Год: <b>{journal.year}</b></span>
                        <span>Издатель: <b>{journal.publisher}</b></span>
                        <a href={url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">DOI: {doi}</a>
                      </div>
                    </div>
                  )}
                  {summary && (
                    <section>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Краткое содержание</h4>
                      <p className="text-[15px] leading-relaxed text-foreground/90">{summary}</p>
                    </section>
                  )}
                  {findings && findings.length > 0 && (
                    <section>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Выводы и доказательная база</h4>
                      <ul className="space-y-2 text-[15px] leading-relaxed text-foreground/90">
                        {findings.map((f) => <li key={f} className="rounded-lg bg-muted/40 px-3 py-2">• {f}</li>)}
                      </ul>
                    </section>
                  )}
                  <div className="flex flex-wrap items-center gap-3 border-t pt-4">
                    <Button asChild className="gap-2">
                      <a href={url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="size-4" /> Открыть оригинал
                      </a>
                    </Button>
                    <span className="text-xs text-muted-foreground">Статус: подтверждено UNIVERSUM</span>
                  </div>
                </div>
              </div>
            ) : (
              <>
            {summary && (
              <div className="w-full sm:w-72 border-b sm:border-b-0 sm:border-r bg-background p-6 overflow-y-auto shrink-0">
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
                  Краткое резюме
                </h4>
                <p className="text-sm leading-relaxed text-foreground/90 font-medium">
                  {summary}
                </p>
                {findings && findings.length > 0 && (
                  <>
                    <h4 className="mt-6 text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Выводы</h4>
                    <ul className="space-y-2 text-sm leading-relaxed text-foreground/90">
                      {findings.map((f) => <li key={f}>• {f}</li>)}
                    </ul>
                  </>
                )}
                <div className="mt-8 space-y-4">
                  <div className="p-3 rounded-lg bg-primary/5 border border-primary/10">
                    <p className="text-[11px] text-muted-foreground uppercase font-bold">Статус</p>
                    <p className="text-xs font-semibold mt-1">Подтверждено UNIVERSUM</p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/50 border border-border/50">
                    <p className="text-[11px] text-muted-foreground uppercase font-bold">Тип документа</p>
                    <p className="text-xs font-semibold mt-1">{isPdf ? "PDF Исследование" : "Нормативный акт"}</p>
                  </div>
                </div>
              </div>
            )}
              <iframe
                src={url}
                className="flex-1 w-full h-full border-none bg-white"
                title={title}
              />
              </>
            )}
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
