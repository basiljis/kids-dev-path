// Сведения об изданиях (по данным Crossref)
export type JournalInfo = { name: string; ru?: string; year: number; publisher: string; kind: "Журнал" | "Материалы конференции" };

export const JOURNALS: Record<string, JournalInfo> = {
  "10.1007/s10484-013-9217-6": { name: "Applied Psychophysiology and Biofeedback", ru: "Прикладная психофизиология и биологическая обратная связь", year: 2013, publisher: "Springer", kind: "Журнал" },
  "10.1007/s10803-015-2497-3": { name: "Journal of Autism and Developmental Disorders", ru: "Журнал аутизма и нарушений развития", year: 2015, publisher: "Springer", kind: "Журнал" },
  "10.1016/j.chb.2018.06.014": { name: "Computers in Human Behavior", ru: "Компьютеры в поведении человека", year: 2018, publisher: "Elsevier", kind: "Журнал" },
  "10.1016/j.ridd.2005.03.003": { name: "Research in Developmental Disabilities", ru: "Исследования нарушений развития", year: 2006, publisher: "Elsevier", kind: "Журнал" },
  "10.1016/j.tics.2010.05.002": { name: "Trends in Cognitive Sciences", ru: "Тенденции когнитивных наук", year: 2010, publisher: "Elsevier (Cell Press)", kind: "Журнал" },
  "10.1017/S0954579406060305": { name: "Development and Psychopathology", ru: "Развитие и психопатология", year: 2006, publisher: "Cambridge University Press", kind: "Журнал" },
  "10.1044/1092-4388(2012/11-0076)": { name: "Journal of Speech, Language, and Hearing Research", ru: "Журнал исследований речи, языка и слуха", year: 2013, publisher: "ASHA", kind: "Журнал" },
  "10.1109/EMBC.2012.6346663": { name: "IEEE EMBC 2012", ru: "Междунар. конференция IEEE по инженерии в медицине и биологии", year: 2012, publisher: "IEEE", kind: "Материалы конференции" },
  "10.1109/asru46091.2019.9003933": { name: "IEEE ASRU 2019", ru: "Семинар IEEE по распознаванию и пониманию речи", year: 2019, publisher: "IEEE", kind: "Материалы конференции" },
  "10.1111/1460-6984.70209": { name: "International Journal of Language & Communication Disorders", ru: "Междунар. журнал нарушений языка и коммуникации", year: 2026, publisher: "Wiley", kind: "Журнал" },
  "10.1111/j.1469-7610.2008.02033.x": { name: "Journal of Child Psychology and Psychiatry", ru: "Журнал детской психологии и психиатрии", year: 2009, publisher: "Wiley", kind: "Журнал" },
  "10.1111/j.1469-7610.2010.02289.x": { name: "Journal of Child Psychology and Psychiatry", ru: "Журнал детской психологии и психиатрии", year: 2010, publisher: "Wiley", kind: "Журнал" },
  "10.1177/1087054712460087": { name: "Journal of Attention Disorders", ru: "Журнал расстройств внимания", year: 2012, publisher: "SAGE", kind: "Журнал" },
  "10.17759/autdd.2017150304": { name: "Аутизм и нарушения развития", year: 2017, publisher: "МГППУ", kind: "Журнал" },
  "10.17759/autdd.2020180108": { name: "Аутизм и нарушения развития", year: 2020, publisher: "МГППУ", kind: "Журнал" },
  "10.17759/cpse.2018070315": { name: "Клиническая и специальная психология", year: 2018, publisher: "МГППУ", kind: "Журнал" },
  "10.17759/pse.2019240307": { name: "Психологическая наука и образование", year: 2019, publisher: "МГППУ", kind: "Журнал" },
  "10.3389/fpsyg.2018.02350": { name: "Frontiers in Psychology", ru: "Границы психологии", year: 2018, publisher: "Frontiers", kind: "Журнал" },
  "10.5014/ajot.2015.018051": { name: "American Journal of Occupational Therapy", ru: "Американский журнал эрготерапии", year: 2015, publisher: "AOTA", kind: "Журнал" },
};
