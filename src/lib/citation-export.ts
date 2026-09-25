import { JOURNALS, type JournalInfo } from "@/lib/journals";

export type CitablePaper = {
  title: string;
  doi: string;
  journal?: string;
  lang?: "ru" | "en";
  product?: string;
};

export type ExportFormat = "bibtex" | "ris" | "gost";

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "")
    .slice(0, 24) || "paper";

function journalOf(p: CitablePaper): { name: string; year?: number; publisher?: string; kind?: string } {
  const j: JournalInfo | undefined = JOURNALS[p.doi];
  return {
    name: j?.name ?? p.journal ?? "—",
    year: j?.year,
    publisher: j?.publisher,
    kind: j?.kind,
  };
}

function toBibTeX(papers: CitablePaper[]): string {
  return papers
    .map((p, i) => {
      const j = journalOf(p);
      const key = `${slugify(j.name)}${j.year ?? ""}${i}`;
      const type = j.kind === "Материалы конференции" ? "inproceedings" : "article";
      const venueField = type === "article" ? "journal" : "booktitle";
      return [
        `@${type}{${key},`,
        `  title = {${p.title}},`,
        `  ${venueField} = {${j.name}},`,
        j.year ? `  year = {${j.year}},` : null,
        j.publisher ? `  publisher = {${j.publisher}},` : null,
        `  doi = {${p.doi}},`,
        `  url = {https://doi.org/${p.doi}},`,
        `}`,
      ]
        .filter(Boolean)
        .join("\n");
    })
    .join("\n\n");
}

function toRIS(papers: CitablePaper[]): string {
  return papers
    .map((p) => {
      const j = journalOf(p);
      const ty = j.kind === "Материалы конференции" ? "CONF" : "JOUR";
      return [
        `TY  - ${ty}`,
        `TI  - ${p.title}`,
        `JO  - ${j.name}`,
        j.year ? `PY  - ${j.year}` : null,
        j.publisher ? `PB  - ${j.publisher}` : null,
        `DO  - ${p.doi}`,
        `UR  - https://doi.org/${p.doi}`,
        `ER  -`,
      ]
        .filter(Boolean)
        .join("\n");
    })
    .join("\n\n");
}

function toGOST(papers: CitablePaper[]): string {
  return papers
    .map((p, i) => {
      const j = journalOf(p);
      const venue = j.kind === "Материалы конференции" ? `Материалы: ${j.name}` : j.name;
      const year = j.year ? `. – ${j.year}` : "";
      const publisher = j.publisher ? ` (${j.publisher})` : "";
      return `${i + 1}. ${p.title} // ${venue}${publisher}${year}. – DOI: ${p.doi}. – URL: https://doi.org/${p.doi} (дата обращения: ${new Date().toLocaleDateString("ru-RU")}).`;
    })
    .join("\n");
}

export function buildCitation(papers: CitablePaper[], format: ExportFormat): { content: string; filename: string; mime: string } {
  const stamp = new Date().toISOString().slice(0, 10);
  if (format === "bibtex") return { content: toBibTeX(papers), filename: `universum-citations-${stamp}.bib`, mime: "application/x-bibtex" };
  if (format === "ris") return { content: toRIS(papers), filename: `universum-citations-${stamp}.ris`, mime: "application/x-research-info-systems" };
  return { content: toGOST(papers), filename: `universum-citations-gost-${stamp}.txt`, mime: "text/plain;charset=utf-8" };
}

export function downloadCitation(papers: CitablePaper[], format: ExportFormat) {
  const { content, filename, mime } = buildCitation(papers, format);
  const blob = new Blob(["\uFEFF" + content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
