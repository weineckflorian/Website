import { getTranslations } from "next-intl/server";

type Block = { type: "h2" | "h3" | "p"; text: string };

type Props = {
  locale: string;
  namespace: "ImpressumPage" | "PrivacyPage";
};

export async function LegalPageContent({ locale, namespace }: Props) {
  const t = await getTranslations({ locale, namespace });
  const blocks = t.raw("content") as Block[];

  return (
    <div className="max-w-none">
      {blocks.map((block, i) => {
        if (block.type === "h2") {
          return (
            <h2
              key={i}
              className="mt-10 scroll-mt-24 text-2xl font-semibold text-slate-900 first:mt-0"
            >
              {block.text}
            </h2>
          );
        }
        if (block.type === "h3") {
          return (
            <h3 key={i} className="mt-6 text-xl font-semibold text-slate-900">
              {block.text}
            </h3>
          );
        }
        return (
          <p
            key={i}
            className="mt-4 whitespace-pre-line leading-relaxed text-slate-600"
          >
            {block.text}
          </p>
        );
      })}
    </div>
  );
}
