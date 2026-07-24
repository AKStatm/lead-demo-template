import Link from "next/link";
import { notFound } from "next/navigation";
import { listNiches } from "@/config/niches";
import { FAMILY_THEMES } from "@/config/families";

export const metadata = {
  title: "All niche templates",
};

function showNichePreview() {
  if (process.env.NEXT_PUBLIC_SHOW_NICHE_PREVIEW === "true") return true;
  if (process.env.NEXT_PUBLIC_SHOW_NICHE_PREVIEW === "false") return false;
  return process.env.NODE_ENV !== "production";
}

export default function NichesPage() {
  // Hide niche catalog on client production demos
  if (!showNichePreview()) notFound();

  const niches = listNiches();
  const byFamily = niches.reduce<Record<string, typeof niches>>((acc, niche) => {
    acc[niche.family] = acc[niche.family] || [];
    acc[niche.family].push(niche);
    return acc;
  }, {});

  return (
    <main className="min-h-screen bg-[#f7f8fa] px-4 py-10">
      <div className="mx-auto max-w-5xl">
        <Link href="/" className="text-sm font-semibold text-teal-700">
          ← Back to demo
        </Link>
        <h1 className="mt-4 font-display text-4xl font-bold">All niche templates</h1>
        <p className="mt-2 max-w-2xl text-slate-600">
          {niches.length} niches with family-based themes, services, packages, FAQs and special
          sections. Open any niche to preview the live demo UI.
        </p>

        <div className="mt-10 space-y-10">
          {Object.entries(byFamily).map(([family, items]) => (
            <section key={family}>
              <h2 className="text-sm font-bold uppercase tracking-[0.16em] text-slate-500">
                {family}
              </h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((niche) => {
                  const theme = FAMILY_THEMES[niche.family];
                  return (
                    <Link
                      key={niche.id}
                      href={`/?niche=${niche.id}`}
                      className="rounded-2xl border border-black/5 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                    >
                      <div
                        className="mb-3 h-2 rounded-full"
                        style={{ background: theme.gradient }}
                      />
                      <div className="font-semibold">{niche.label}</div>
                      <div className="mt-1 text-sm text-slate-500">{niche.tagline}</div>
                    </Link>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
