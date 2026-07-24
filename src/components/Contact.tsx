import { FiMail, FiMapPin, FiNavigation, FiPhone } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import type { SiteModel } from "@/config/site";

export function Contact({ site }: { site: SiteModel }) {
  return (
    <section id="contact" className="section bg-white">
      <div className="container-pad grid gap-6 lg:grid-cols-2">
        <div className="card-surface p-6">
          <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--primary)]">Contact</div>
          <h2 className="font-display mt-2 text-3xl font-bold">Visit or message us</h2>
          <div className="mt-6 space-y-4">
            <div className="flex gap-3">
              <FiMapPin className="mt-1 text-[var(--primary)]" />
              <div>
                <div className="font-semibold">Address</div>
                <div className="text-sm text-[var(--muted)]">{site.lead.address}</div>
              </div>
            </div>
            <div className="flex gap-3">
              <FiPhone className="mt-1 text-[var(--primary)]" />
              <div>
                <div className="font-semibold">Phone</div>
                <a className="text-sm text-[var(--primary)]" href={`tel:${site.lead.phone || site.lead.whatsapp}`}>
                  {site.display.phoneDisplay}
                </a>
              </div>
            </div>
            {site.lead.email ? (
              <div className="flex gap-3">
                <FiMail className="mt-1 text-[var(--primary)]" />
                <div>
                  <div className="font-semibold">Email</div>
                  <a className="text-sm text-[var(--primary)]" href={`mailto:${site.lead.email}`}>
                    {site.lead.email}
                  </a>
                </div>
              </div>
            ) : null}
            <div className="flex flex-wrap gap-3 pt-2">
              <a href={site.display.whatsappLink} className="btn-primary">
                <FaWhatsapp /> WhatsApp
              </a>
              <a href={site.display.mapsLink} target="_blank" rel="noreferrer" className="btn-secondary">
                <FiNavigation /> Open in Maps
              </a>
            </div>
          </div>
        </div>

        <div
          className="card-surface relative min-h-[280px] overflow-hidden p-6 text-white"
          style={{ background: "var(--gradient)" }}
        >
          <div className="absolute inset-0 bg-black/25" />
          <div className="relative z-10 flex h-full flex-col justify-between">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.16em] text-white/80">Service area</div>
              <h3 className="font-display mt-2 text-3xl font-bold">{site.lead.cityArea}</h3>
              <p className="mt-3 max-w-md text-sm text-white/90">
                {site.lead.urduSupport
                  ? "Urdu & English support available on WhatsApp."
                  : "Fast replies on WhatsApp during working hours."}
              </p>
            </div>
            <div className="mt-8 rounded-2xl bg-white/15 p-4 backdrop-blur">
              <div className="text-sm font-semibold">Hours</div>
              <div className="mt-1 text-sm text-white/90">{site.display.hours}</div>
              {site.lead.ownerName ? (
                <div className="mt-3 text-sm text-white/90">Owner: {site.lead.ownerName}</div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
