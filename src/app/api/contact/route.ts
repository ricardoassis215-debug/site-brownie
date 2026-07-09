import { z } from "zod";

import { getServerEnv } from "@/env";
import { ApiError, handle } from "@/lib/api";

/**
 * Orçamento / lead submission for Brownie da Rô.
 * Validates input, then forwards to CONTACT_ENDPOINT when configured
 * (CRM / webhook / e-mail service); otherwise logs server-side so the
 * form works out of the box in dev.
 */
const orcamentoSchema = z.object({
  nome: z.string().min(1).max(100),
  whatsapp: z.string().min(8).max(30),
  email: z.email().optional(),
  tipo: z.enum(["pedido", "evento"]),
  mensagem: z.string().min(1).max(2000),
});

export const POST = handle(async (req) => {
  const input = orcamentoSchema.parse(await req.json());

  const { CONTACT_ENDPOINT } = getServerEnv();

  if (CONTACT_ENDPOINT) {
    const upstream = await fetch(CONTACT_ENDPOINT, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(input),
    });
    if (!upstream.ok) {
      throw new ApiError(502, "upstream_error", "Falha ao enviar. Tente pelo WhatsApp.");
    }
  } else {
    console.log("[api/contact] orçamento:", input);
  }

  return { received: true };
});
