import { FaWhatsapp } from "react-icons/fa";
import type { SiteModel } from "@/config/site";

export function Footer({ site }: { site: SiteModel }) {
  return (
    <footer className="border-t border-black/5 bg-[var(--ink)] text-white">
      <div className="container-pad grid gap-8 py-10 md:grid-cols-[1.2fr_0.8fr]">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.16em] text-white/60">
            {site.niche.label} · {site.lead.cityArea}
          </div>
          <div className="font-display mt-2 text-2xl font-bold">{site.lead.businessName}</div>
          <p className="mt-3 max-w-lg text-sm text-white/70">{site.niche.tagline}</p>
          <a href={site.display.whatsappLink} className="btn-primary mt-5 !bg-[#25d366] !shadow-none">
            <FaWhatsapp /> Chat now
          </a>
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm text-white/75">
          <a href="#services">Services</a>
          <a href="#packages">Packages</a>
          <a href="#book">Book</a>
          <a href="#contact">Contact</a>
          <a href="#reviews">Reviews</a>
          <a href="#faq">FAQ</a>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-white/50">
        © {new Date().getFullYear()} {site.lead.businessName}. All rights reserved.
      </div>
    </footer>
  );
}
