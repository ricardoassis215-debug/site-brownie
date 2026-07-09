import Image from "next/image";
import Link from "next/link";

import {
  Clock,
  Envelope,
  InstagramLogo,
  MapPin,
  Phone,
  WhatsappLogo,
} from "@/components/ui/icons";

import { home } from "@/data/home";
import { Button } from "@/components/ui/button";
import { MagneticButton } from "@/components/ui/magnetic-button";

/** Footer — logo, contact, location, legal (Server Component). */
export const Footer = () => {
  const { footer, contact } = home;
  const year = new Date().getFullYear();

  return (
    <footer className="w-full bg-ink pb-8 pt-16 text-cream md:pb-10 md:pt-20">
      <div className="mx-auto flex max-w-7xl flex-col px-6 md:px-10 lg:px-16">
        {/* Brand and primary action */}
        <div className="flex flex-col gap-8 border-b border-cream/15 pb-10 sm:flex-row sm:items-center sm:justify-between md:pb-12">
          <div className="flex items-center gap-5">
            <Image
              src="/assets/brand/logo.png"
              alt="Brownie da Rô"
              width={320}
              height={312}
              className="h-20 w-20 shrink-0 object-contain md:h-24 md:w-24"
            />
            <p className="max-w-[14rem] text-base leading-relaxed text-cream/70">
              {footer.tagline}
            </p>
          </div>
          <MagneticButton className="w-full sm:w-auto">
            <Button
              variant="primary"
              href={contact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              icon={<WhatsappLogo weight="fill" className="h-5 w-5" />}
              className="w-full justify-center sm:w-auto"
            >
              Pedir brownies
            </Button>
          </MagneticButton>
        </div>

        {/* Contact, location and institutional links */}
        <nav
          aria-label="Rodapé"
          className="mt-10 grid grid-cols-1 gap-10 text-sm leading-relaxed text-cream/70 sm:grid-cols-2 md:mt-12 md:grid-cols-3 md:gap-12"
        >
          <div className="flex flex-col gap-3">
            <span className="font-semibold text-cream">Contato</span>
            <a
              href="tel:+5521969839252"
              className="flex items-center gap-2 hover:text-yellow"
            >
              <Phone weight="regular" className="h-4 w-4 shrink-0" />
              {contact.phone}
            </a>
            <a
              href={`mailto:${contact.email}`}
              className="flex items-center gap-2 hover:text-yellow"
            >
              <Envelope weight="regular" className="h-4 w-4 shrink-0" />
              {contact.email}
            </a>
            <a
              href={contact.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-yellow"
            >
              <InstagramLogo weight="regular" className="h-4 w-4 shrink-0" />
              @browniedaro
            </a>
          </div>

          <div className="flex flex-col gap-3">
            <span className="font-semibold text-cream">Onde estamos</span>
            <span className="flex items-start gap-2">
              <MapPin weight="regular" className="mt-0.5 h-4 w-4 shrink-0" />
              {contact.address}
            </span>
            <span className="flex items-start gap-2">
              <Clock weight="regular" className="mt-0.5 h-4 w-4 shrink-0" />
              {contact.hours}
            </span>
          </div>

          <div className="flex flex-col gap-3">
            <span className="font-semibold text-cream">Institucional</span>
            {footer.links.map((l) => (
              <Link key={l.label} href={l.href} className="hover:text-yellow">
                {l.label}
              </Link>
            ))}
            <span className="text-xs text-cream/50">{footer.cnpj}</span>
          </div>
        </nav>

        {/* Copyright and legal */}
        <div className="mt-10 flex flex-col gap-4 border-t border-cream/15 pt-6 text-xs leading-relaxed text-cream/50 sm:flex-row sm:items-center sm:justify-between md:mt-12 md:pt-8">
          <p>© {year} Brownie da Rô — Todos os direitos reservados.</p>
          <nav aria-label="Legal" className="flex items-center gap-4">
            <Link href="/privacidade" className="hover:text-yellow">
              Privacidade
            </Link>
            <Link href="/devolucao" className="hover:text-yellow">
              Devolução
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
};