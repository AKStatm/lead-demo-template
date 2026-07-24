import { SiteShell } from "@/components/SiteShell";
import { getSiteModel } from "@/config/site";
import { getNiche, NICHES } from "@/config/niches";
import { FAMILY_THEMES } from "@/config/families";
import { getNicheImages } from "@/config/images";
import { ensureFullPackages } from "@/config/packages";
import type { NicheId } from "@/config/types";
import { NichePreviewBar } from "@/components/NichePreviewBar";

type Props = {
  searchParams?: Promise<{ niche?: string }>;
};

export default async function Home({ searchParams }: Props) {
  const params = (await searchParams) || {};
  const base = getSiteModel();

  const nicheId = (params.niche as NicheId) || base.lead.nicheId;
  const nicheExists = Boolean(NICHES[nicheId]);

  if (!nicheExists || nicheId === base.lead.nicheId) {
    return (
      <>
        <NichePreviewBar current={base.lead.nicheId} />
        <SiteShell site={base} />
      </>
    );
  }

  const nicheDef = getNiche(nicheId);
  const theme = FAMILY_THEMES[nicheDef.family];
  const images = getNicheImages(nicheId, nicheDef.family);

  const site = {
    ...base,
    images,
    theme,
    niche: {
      ...nicheDef,
      packages: ensureFullPackages(nicheDef, base.lead.businessName),
    },
    lead: {
      ...base.lead,
      nicheId,
      category: nicheDef.label,
    },
    display: {
      ...base.display,
      whatsappLink: base.display.whatsappLink.replace(
        /text=[^&]*/,
        `text=${encodeURIComponent(nicheDef.whatsappPreset)}`
      ),
    },
  };

  return (
    <>
      <NichePreviewBar current={nicheId} />
      <SiteShell site={site} />
    </>
  );
}
