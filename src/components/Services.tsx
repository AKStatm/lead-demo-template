"use client";

import { Tag } from "antd";
import { FiArrowUpRight } from "react-icons/fi";
import type { SiteModel } from "@/config/site";
import { imageAt } from "@/config/images";
import { SafeImage } from "./SafeImage";

export function Services({ site }: { site: SiteModel }) {
  return (
    <section id="services" className="section">
      <div className="container-pad">
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--primary)]">
              What we offer
            </div>
            <h2 className="font-display mt-2 text-3xl font-bold sm:text-4xl">
              {site.niche.servicesTitle}
            </h2>
            <p className="mt-2 text-[var(--muted)]">
              Clear options for customers in {site.lead.cityArea}. Every card has a real photo and
              WhatsApp booking.
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {site.niche.services.map((service, index) => (
            <article
              key={service.title}
              className="card-surface group flex h-full flex-col overflow-hidden transition hover:-translate-y-1 hover:shadow-[var(--shadow)]"
            >
              <div className="relative h-40 w-full bg-[var(--soft)]">
                <SafeImage
                  src={imageAt(site.images, index + 1)}
                  alt={service.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(max-width:640px) 100vw, (max-width:1280px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
                {service.popular ? (
                  <Tag
                    color="gold"
                    className="!absolute !left-3 !top-3 !m-0 !rounded-full !border-0 !px-2.5 !text-[11px] !font-semibold"
                  >
                    Popular
                  </Tag>
                ) : null}
              </div>

              <div className="flex flex-1 flex-col p-4 sm:p-5">
                <h3 className="font-display text-lg font-bold leading-snug">{service.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--muted)]">
                  {service.description}
                </p>
                <div className="mt-4 flex items-center justify-between border-t border-black/5 pt-4">
                  <div>
                    <div className="text-[11px] uppercase tracking-wide text-[var(--muted)]">From</div>
                    <div className="font-semibold text-[var(--primary)]">
                      {service.priceFrom || "Ask quote"}
                    </div>
                  </div>
                  <a
                    href={site.display.whatsappLink}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[var(--soft)] text-[var(--primary)] transition group-hover:bg-[var(--primary)] group-hover:text-white"
                    aria-label={`Book ${service.title}`}
                  >
                    <FiArrowUpRight />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
