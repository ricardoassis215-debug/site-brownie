import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { pages } from "@/data/pages";

type Slug = keyof typeof pages;

/** Shared institutional / legal page view (Server Component). */
export const ContentPage = ({ slug }: { slug: Slug }) => {
  const page = pages[slug];

  return (
    <>
      <Header />
      <main className="min-h-lvh bg-cream">
        <article className="mx-auto max-w-3xl px-8 pb-24 pt-32">
          <h1 className="text-5xl font-semibold tracking-tight text-ink sm:text-6xl">
            {page.title}
          </h1>
          {page.notice ? (
            <p className="mt-6 rounded-card border border-caramel/40 bg-yellow/10 px-5 py-4 text-sm text-cocoa">
              {page.notice}
            </p>
          ) : null}
          <div className="mt-10 flex flex-col gap-8">
            {page.sections.map((s) => (
              <section key={s.heading} className="flex flex-col gap-2">
                <h2 className="text-2xl font-semibold text-ink">{s.heading}</h2>
                <p className="leading-relaxed text-cocoa">{s.body}</p>
              </section>
            ))}
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
};