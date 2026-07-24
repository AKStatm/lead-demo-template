import type { CSSProperties, ReactNode } from "react";
import { Header } from "./Header";
import { Hero } from "./Hero";
import { TrustBar } from "./TrustBar";
import { EmergencyBand } from "./EmergencyBand";
import { Services } from "./Services";
import { Features } from "./Features";
import { MenuHighlights, ClassesBand } from "./SpecialSections";
import { Gallery } from "./Gallery";
import { Packages } from "./Packages";
import { Reviews } from "./Reviews";
import { BookingForm } from "./BookingForm";
import { FAQ } from "./FAQ";
import { Contact } from "./Contact";
import { Footer } from "./Footer";
import { FloatingWhatsApp } from "./FloatingWhatsApp";
import type { SiteModel } from "@/config/site";
import type { NicheFamily } from "@/config/types";

export function SiteShell({ site }: { site: SiteModel }) {
  const cssVars = {
    "--primary": site.theme.primary,
    "--primary-dark": site.theme.primaryDark,
    "--secondary": site.theme.secondary,
    "--accent": site.theme.accent,
    "--soft": site.theme.soft,
    "--surface": site.theme.surface,
    "--ink": site.theme.ink,
    "--muted": site.theme.muted,
    "--gradient": site.theme.gradient,
  } as CSSProperties;

  return (
    <div style={cssVars}>
      <Header site={site} />
      <main>
        <Hero site={site} />
        {renderFamilySections(site)}
      </main>
      <Footer site={site} />
      <FloatingWhatsApp site={site} />
    </div>
  );
}

/** Different section order + emphasis per niche family */
function renderFamilySections(site: SiteModel): ReactNode {
  const family: NicheFamily = site.niche.family;

  const commonEnd = (
    <>
      <Reviews site={site} />
      <BookingForm site={site} />
      <FAQ site={site} />
      <Contact site={site} />
    </>
  );

  if (family === "food") {
    return (
      <>
        <MenuHighlights site={site} />
        <Packages site={site} />
        <Gallery site={site} />
        <Features site={site} />
        <TrustBar site={site} />
        {commonEnd}
      </>
    );
  }

  if (family === "beauty") {
    return (
      <>
        <Services site={site} />
        <Gallery site={site} />
        <Packages site={site} />
        <Features site={site} />
        <TrustBar site={site} />
        {commonEnd}
      </>
    );
  }

  if (family === "health") {
    return (
      <>
        <TrustBar site={site} />
        <Services site={site} />
        <Features site={site} />
        <Packages site={site} />
        <Gallery site={site} />
        {commonEnd}
      </>
    );
  }

  if (family === "auto") {
    return (
      <>
        <EmergencyBand site={site} />
        <Services site={site} />
        <Packages site={site} />
        <Gallery site={site} />
        <Features site={site} />
        <TrustBar site={site} />
        {commonEnd}
      </>
    );
  }

  if (family === "education") {
    return (
      <>
        <ClassesBand site={site} />
        <Packages site={site} />
        <Services site={site} />
        <Features site={site} />
        <Gallery site={site} />
        {commonEnd}
      </>
    );
  }

  if (family === "professional") {
    return (
      <>
        <TrustBar site={site} />
        <Features site={site} />
        <Services site={site} />
        <Packages site={site} />
        <Gallery site={site} />
        {commonEnd}
      </>
    );
  }

  if (family === "retail") {
    return (
      <>
        <Services site={site} />
        <Packages site={site} />
        <Gallery site={site} />
        <Features site={site} />
        <TrustBar site={site} />
        {commonEnd}
      </>
    );
  }

  // home-services default
  return (
    <>
      <TrustBar site={site} />
      <EmergencyBand site={site} />
      <Services site={site} />
      <Features site={site} />
      <Gallery site={site} />
      <Packages site={site} />
      {commonEnd}
    </>
  );
}
