"use client";

import Image from "next/image";
import type { SiteModel } from "@/config/site";
import { imageAt } from "@/config/images";

export function MenuHighlights({ site }: { site: SiteModel }) {
  const show =
    site.niche.specialSections.includes("menu") ||
    site.niche.specialSections.includes("menu-cards");
  if (!show) return null;

  return (
    <section className="section">
      <div className="container-pad">
        <div className="mb-8 text-center">
          <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--primary)]">
            Highlights
          </div>
          <h2 className="font-display mt-2 text-3xl font-bold sm:text-4xl">Customer favourites</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {site.niche.services.map((item, index) => (
            <div key={item.title} className="card-surface overflow-hidden">
              <div className="relative h-36 w-full">
                <Image
                  src={imageAt(site.images, index)}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="(max-width:640px) 100vw, 25vw"
                />
              </div>
              <div className="p-4">
                <h3 className="font-display text-lg font-bold">{item.title}</h3>
                <p className="mt-1 text-sm text-[var(--muted)]">{item.description}</p>
                <div className="mt-3 font-semibold text-[var(--primary)]">{item.priceFrom || "Ask"}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ClassesBand({ site }: { site: SiteModel }) {
  if (!site.niche.specialSections.includes("classes")) return null;

  return (
    <section className="container-pad pb-2 pt-6">
      <div className="card-surface relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image src={imageAt(site.images, 2)} alt="" fill className="object-cover" sizes="100vw" />
        </div>
        <div className="relative grid gap-4 p-6 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--primary)]">
              Batches & classes
            </div>
            <h3 className="font-display mt-1 text-2xl font-bold">Upcoming seats open — reserve your spot</h3>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Message preferred timing. {site.lead.businessName} will confirm batch availability.
            </p>
          </div>
          <a href="#book" className="btn-primary whitespace-nowrap">
            Reserve a seat
          </a>
        </div>
      </div>
    </section>
  );
}
