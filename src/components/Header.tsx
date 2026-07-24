"use client";

import { useEffect, useState } from "react";
import { FiMenu, FiPhone, FiX } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import type { SiteModel } from "@/config/site";
import { Drawer } from "antd";

const links = [
  { href: "#services", label: "Services" },
  { href: "#features", label: "Why us" },
  { href: "#packages", label: "Packages" },
  { href: "#reviews", label: "Reviews" },
  { href: "#book", label: "Book" },
  { href: "#contact", label: "Contact" },
];

export function Header({ site }: { site: SiteModel }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-50 border-b border-black/5 bg-white/95 backdrop-blur-md transition-shadow ${
          scrolled ? "shadow-sm" : ""
        }`}
      >
        <div className="container-pad flex items-center justify-between gap-3 py-3 sm:gap-4 sm:py-3.5">
          <a href="#top" className="min-w-0 flex-1">
            <div className="truncate text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--muted)] sm:text-[11px]">
              {site.niche.label} · {site.lead.cityArea.split(",")[0]}
            </div>
            <div className="font-display truncate text-base font-bold text-[var(--ink)] sm:text-xl">
              {site.lead.businessName}
            </div>
          </a>

          <nav className="hidden items-center gap-5 xl:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-[var(--muted)] transition hover:text-[var(--primary)]"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <a
              href={`tel:${site.lead.phone || site.lead.whatsapp}`}
              className="hidden items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-2 text-sm font-semibold text-[var(--ink)] md:inline-flex"
            >
              <FiPhone /> {site.display.phoneDisplay}
            </a>
            <a
              href={site.display.whatsappLink}
              className="inline-flex min-h-10 items-center gap-2 rounded-full bg-[#25d366] px-3.5 py-2 text-sm font-bold text-white"
            >
              <FaWhatsapp className="text-base" />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white text-[var(--ink)] xl:hidden"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
            >
              <FiMenu />
            </button>
          </div>
        </div>
      </header>

      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        placement="right"
        title={site.lead.businessName}
        width={300}
      >
        <div className="flex flex-col gap-4">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="rounded-xl px-3 py-3 text-base font-medium hover:bg-[var(--soft)]"
            >
              {l.label}
            </a>
          ))}
          <a href={site.display.whatsappLink} className="btn-primary mt-2">
            <FaWhatsapp /> Chat on WhatsApp
          </a>
          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 text-sm text-[var(--muted)]"
            onClick={() => setOpen(false)}
          >
            <FiX /> Close
          </button>
        </div>
      </Drawer>
    </>
  );
}
