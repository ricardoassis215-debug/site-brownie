"use client";

import { type ReactNode, useState } from "react";
import {
  CheckCircle,
  CircleNotch,
  Warning,
} from "@/components/ui/icons";

import { Inview } from "@/components/animation/springs/in-view";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { apiFetch, ApiClientError } from "@/lib/api-client";
import { home } from "@/data/home";

type Status = "idle" | "submitting" | "success" | "error";

/** Shared field surface — instant focus state (no CSS transition). */
const fieldSurface =
  "w-full rounded-card border border-chocolate/15 bg-cream px-5 py-4 text-ink outline-none focus:outline-none focus:ring-2 focus:ring-caramel/40 focus:border-caramel placeholder:text-cocoa/40";

/** Label sits above the input; required mark in caramel. */
function FieldLabel({
  htmlFor,
  required,
  children,
}: {
  htmlFor: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="text-sm font-medium text-chocolate"
    >
      {children}
      {required ? (
        <span className="text-caramel" aria-hidden="true">
          {" "}
          *
        </span>
      ) : null}
    </label>
  );
}

export const Orcamento = () => {
  const { orcamento, contact } = home;
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus("submitting");
    setError("");
    try {
      await apiFetch("/api/contact", {
        method: "POST",
        body: JSON.stringify({
          nome: String(data.get("nome") ?? ""),
          whatsapp: String(data.get("whatsapp") ?? ""),
          email: String(data.get("email") ?? "") || undefined,
          tipo: String(data.get("tipo") ?? "pedido"),
          mensagem: String(data.get("mensagem") ?? ""),
        }),
      });
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(
        err instanceof ApiClientError ? err.message : "Tente novamente.",
      );
    }
  }

  return (
    <section
      id="orcamento"
      className="w-full bg-cream-warm py-[var(--section-pad-y-mobile)] md:py-[var(--section-pad-y)]"
    >
      <div className="mx-auto max-w-2xl px-6 lg:px-8">
        <SectionHeading as="h2" italicWord="evento">
          {orcamento.title}
        </SectionHeading>
        <p id="orcamento-subtitle" className="mt-4 max-w-xl text-lg text-cocoa">
          {orcamento.subtitle}
        </p>

        {status === "success" ? (
          <Inview
            tag="div"
            mode="once"
            from={{ opacity: 0, y: 16 }}
            to={{ opacity: 1, y: 0 }}
            className="mt-10 flex flex-col items-center gap-4 rounded-panel border border-chocolate/10 bg-cream px-8 py-10 text-center"
          >
            <CheckCircle
              weight="fill"
              aria-hidden="true"
              className="text-2xl text-yellow"
            />
            <div>
              <p className="text-2xl font-semibold text-ink">
                Recebido! Já te respondo.
              </p>
              <p className="mt-2 text-cocoa">
                A gente te responde rapidinho. Se preferir, fale agora no
                WhatsApp.
              </p>
            </div>
            <Button
              variant="outline"
              size="lg"
              href={contact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
            >
              Continuar no WhatsApp
            </Button>
          </Inview>
        ) : (
          <Inview
            tag="div"
            mode="once"
            from={{ opacity: 0, y: 16 }}
            to={{ opacity: 1, y: 0 }}
            className="mt-10"
          >
            <form
              onSubmit={onSubmit}
              aria-describedby="orcamento-subtitle"
              className="flex flex-col gap-5"
              noValidate
            >
              {/* Row 1 — nome + whatsapp */}
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <FieldLabel htmlFor="orc-nome" required>
                    Nome
                  </FieldLabel>
                  <input
                    id="orc-nome"
                    name="nome"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="Como podemos te chamar?"
                    className={fieldSurface}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <FieldLabel htmlFor="orc-whatsapp" required>
                    WhatsApp
                  </FieldLabel>
                  <input
                    id="orc-whatsapp"
                    name="whatsapp"
                    type="tel"
                    required
                    autoComplete="tel"
                    placeholder="(21) 9xxxx-xxxx"
                    className={fieldSurface}
                  />
                </div>
              </div>

              {/* Row 2 — email (optional) + tipo */}
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <FieldLabel htmlFor="orc-email">E-mail</FieldLabel>
                  <input
                    id="orc-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="Opcional — só se quiser"
                    className={fieldSurface}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <FieldLabel htmlFor="orc-tipo" required>
                    Tipo de pedido
                  </FieldLabel>
                  <select
                    id="orc-tipo"
                    name="tipo"
                    defaultValue="pedido"
                    required
                    className={fieldSurface}
                  >
                    <option value="pedido">Pedido / delivery</option>
                    <option value="evento">Festa / evento</option>
                  </select>
                </div>
              </div>

              {/* Row 3 — mensagem (full width) */}
              <div className="flex flex-col gap-2">
                <FieldLabel htmlFor="orc-mensagem" required>
                  Mensagem
                </FieldLabel>
                <textarea
                  id="orc-mensagem"
                  name="mensagem"
                  rows={4}
                  required
                  placeholder="Conta pra gente: quantidade, data, ideia da embalagem…"
                  className={fieldSurface}
                />
              </div>

              {status === "error" ? (
                <div
                  role="alert"
                  className="flex items-center gap-3 rounded-card border border-caramel/40 bg-cream px-5 py-4 text-sm text-chocolate"
                >
                  <Warning
                    weight="fill"
                    aria-hidden="true"
                    className="text-lg text-caramel"
                  />
                  <span>{error || "Não foi possível enviar. Tente de novo."}</span>
                </div>
              ) : null}

              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={status === "submitting"}
                icon={
                  status === "submitting" ? (
                    <CircleNotch
                      weight="bold"
                      aria-hidden="true"
                      className="text-lg"
                    />
                  ) : null
                }
                className="self-start"
              >
                {status === "submitting"
                  ? "Enviando…"
                  : "Enviar pedido de orçamento"}
              </Button>
            </form>
          </Inview>
        )}
      </div>
    </section>
  );
};