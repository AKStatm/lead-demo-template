import leadJson from "./lead.json";
import { getNiche } from "./niches";
import { getNicheTheme } from "./niche-themes";
import { getNicheImages } from "./images";
import { ensureFullPackages } from "./packages";
import type { LeadData, NicheDefinition, NicheTheme } from "./types";

export const lead = leadJson as LeadData;

export function getSiteModel() {
  const nicheBase: NicheDefinition = getNiche(lead.nicheId);
  const theme: NicheTheme = getNicheTheme(lead.nicheId, nicheBase.family);
  const images = getNicheImages(lead.nicheId, nicheBase.family);

  const services =
    lead.topServices && lead.topServices.length > 0
      ? nicheBase.services.map((s, i) =>
          lead.topServices![i] ? { ...s, title: lead.topServices![i] } : s
        )
      : nicheBase.services;

  const niche: NicheDefinition = {
    ...nicheBase,
    services,
    tagline: lead.taglineOverride || nicheBase.tagline,
    packages: ensureFullPackages(nicheBase, lead.businessName),
  };

  return {
    lead,
    niche,
    theme,
    images,
    display: {
      phoneDisplay: formatPkPhone(lead.phone || lead.whatsapp),
      whatsappLink: buildWhatsAppLink(lead.whatsapp || lead.phone, niche.whatsappPreset),
      mapsLink:
        lead.googleMapsLink ||
        `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          `${lead.businessName} ${lead.address}`
        )}`,
      rating: lead.rating ?? 4.8,
      reviewCount: lead.reviewCount ?? 50,
      hours: lead.workingHours || "Open today · Reply on WhatsApp fast",
      about:
        lead.about ||
        `${lead.businessName} provides trusted ${niche.label.toLowerCase()} services in ${lead.cityArea}. Book on WhatsApp for a fast response.`,
    },
  };
}

export type SiteModel = ReturnType<typeof getSiteModel>;

function formatPkPhone(raw: string) {
  const digits = raw.replace(/\D/g, "");
  if (digits.length === 10) return `0${digits.slice(0, 3)} ${digits.slice(3, 10)}`;
  if (digits.length === 11 && digits.startsWith("0"))
    return `${digits.slice(0, 4)} ${digits.slice(4)}`;
  if (digits.length === 12 && digits.startsWith("92"))
    return `0${digits.slice(2, 5)} ${digits.slice(5)}`;
  return raw;
}

function buildWhatsAppLink(raw: string, preset: string) {
  let digits = raw.replace(/\D/g, "");
  if (digits.startsWith("0")) digits = `92${digits.slice(1)}`;
  if (digits.length === 10) digits = `92${digits}`;
  return `https://wa.me/${digits}?text=${encodeURIComponent(preset)}`;
}
