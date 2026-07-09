/**
 * Home view — Server Component. Assembles the section leaves.
 * Section order modeled on madie.es.
 */
import { Header } from "@/components/sections/header";
import { Hero } from "@/components/sections/hero";
import { Historia } from "@/components/sections/historia";
import { Diferenciais } from "@/components/sections/diferenciais";
import { Reviews } from "@/components/sections/reviews";
import { Produtos } from "@/components/sections/produtos";
import { Eventos } from "@/components/sections/eventos";
import { Instagram } from "@/components/sections/instagram";
import { Loja } from "@/components/sections/loja";
import { Orcamento } from "@/components/sections/orcamento";
import { Footer } from "@/components/sections/footer";

export const HomeView = () => {
  return (
    <>
      <Header />
      <main className="min-h-lvh">
        <Hero />
        <Historia />
        <Diferenciais />
        <Reviews />
        <Produtos />
        <Eventos />
        <Instagram />
        <Loja />
        <Orcamento />
      </main>
      <Footer />
    </>
  );
};