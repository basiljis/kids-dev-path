import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ExternalLink, Download, FileText, X } from "lucide-react";

interface DocViewerProps {
  url: string;
  title: string;
  isOpen: boolean;
  onClose: () => void;
  summary?: string | undefined;
}

export function DocViewer({ url, title, isOpen, onClose, summary }: DocViewerProps) {
  const isPdf = url.toLowerCase().endsWith(".pdf");
  
  // In a real app, we might proxy some URLs or use a PDF library, 
  // but for this MVP, an iframe is standard for PDFs/HTML.
  
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
      <DialogContent className="max-w-4xl w-[95vw] h-[90vh] flex flex-col p-0 overflow-hidden gap-0">
        <DialogHeader className="px-6 py-4 border-b flex flex-row items-center justify-between space-y-0">
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
          {summary && (
            <div className="w-full sm:w-72 border-b sm:border-b-0 sm:border-r bg-background p-6 overflow-y-auto shrink-0">
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
                Краткое резюме
              </h4>
              <p className="text-sm leading-relaxed text-foreground/90 font-medium">
                {summary}
              </p>
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
            className="flex-1 w-full h-full border-none"
            title={title}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
