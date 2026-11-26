import {
  PlatzhalterTemplate,
  STANDARD_ABSCHNITTE,
  type TemplateProps,
} from "@/templates/platzhalter";

export function HausdiensteTemplate({
  data,
  vorschauHinweis = true,
}: Omit<TemplateProps, "abschnitteStandard">) {
  return (
    <PlatzhalterTemplate
      data={data}
      abschnitteStandard={STANDARD_ABSCHNITTE}
      vorschauHinweis={vorschauHinweis}
    />
  );
}
