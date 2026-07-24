"use client";

import { Rate } from "antd";
import { FaQuoteLeft } from "react-icons/fa";
import type { SiteModel } from "@/config/site";

function buildReviews(site: SiteModel) {
  const city = site.lead.cityArea.split(",")[0];
  return [
    {
      name: "Ahmed R.",
      text: `Quick response on WhatsApp and professional work. Highly recommend ${site.lead.businessName} in ${city}.`,
    },
    {
      name: "Sana K.",
      text: `Clean finishing and honest pricing. Exactly what we needed for our ${site.niche.label.toLowerCase()} job.`,
    },
    {
      name: "Usman M.",
      text: `Booked through this demo flow — communication was clear and the team arrived on time.`,
    },
  ];
}

export function Reviews({ site }: { site: SiteModel }) {
  const reviews = buildReviews(site);

  return (
    <section id="reviews" className="section">
      <div className="container-pad">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--primary)]">
              Social proof
            </div>
            <h2 className="font-display mt-2 text-3xl font-bold sm:text-4xl">Customers trust this business</h2>
          </div>
          <div className="card-surface inline-flex items-center gap-3 px-4 py-3">
            <div>
              <div className="font-display text-2xl font-bold">{site.display.rating.toFixed(1)}</div>
              <Rate disabled allowHalf defaultValue={site.display.rating} className="!text-sm" />
            </div>
            <div className="text-sm text-[var(--muted)]">{site.display.reviewCount}+ reviews</div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {reviews.map((review) => (
            <article key={review.name} className="card-surface p-5">
              <FaQuoteLeft className="text-[var(--primary)] opacity-70" />
              <p className="mt-3 text-sm leading-relaxed text-[var(--ink)]">{review.text}</p>
              <div className="mt-4 text-sm font-semibold">{review.name}</div>
              <div className="text-xs text-[var(--muted)]">Verified local customer</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
