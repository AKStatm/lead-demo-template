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

/** Client demos: hide niche switcher. Local/dev can show with NEXT_PUBLIC_SHOW_NICHE_PREVIEW=true */
function showNichePreview() {
  if (process.env.NEXT_PUBLIC_SHOW_NICHE_PREVIEW === "true") return true;
  if (process.env.NEXT_PUBLIC_SHOW_NICHE_PREVIEW === "false") return false;
  return process.env.NODE_ENV !== "production";
}

export default async function Home({ searchParams }: Props) {
  const params = (await searchParams) || {};
  const base = getSiteModel();
  const preview = showNichePreview();

  // Production client sites: ONLY lead.json niche — ignore ?niche=
  if (!preview) {
    return <SiteShell site={base} />;
  }

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
