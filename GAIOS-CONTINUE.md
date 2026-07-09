# GAIOS — Continuar no Claude Code · Brownie da Rô

> **DIRETRIZ CENTRAL (do lead):** recriar o site **100% no padrão do madie.es**
> (https://www.madie.es) — hero/cabeçalho premium e completo, estudando e
> ADAPTANDO todos os blocos (nunca copiar ativos). Continuar o trabalho **no
> Claude Code**, usando os agentes do workspace (GAIOS → PSquads/Hefaisto).
> Marca: Brownie da Rô · Rio de Janeiro · pt-BR. Handoff: 2026-07-08.

## Onde está / como rodar
- Projeto: `C:\Users\ricar\Desktop\browniedaro-site` (Next.js 16, base `textura-agency/next16-claude-starter`).
- Node 22.13+ · `npm install` → `npm run dev` (http://localhost:3000) · `npm run build` · `npm run start`.
- Pode haver um `npm run start` (produção) rodando na porta 3000 — se precisar, finalize o processo da porta 3000.

## Estudo do madie.es — blocos a recriar (adaptados p/ Brownie da Rô)
1. **Header sticky + nav** — logo wordmark, nav (Cardápio, Eventos, Loja), contato (WhatsApp/IG). *BDR ainda NÃO tem header/nav → CRIAR.*
2. **Hero premium** — imagem/vídeo full-bleed, prova social (nº de avaliações), headline display gigante com ênfase em itálico, subcopy, CTA. *BDR já tem hero com vídeo do corte; falta tratamento editorial (itálico, prova social real) + nav por cima.*
3. **História "tradição reinventada"** — texto editorial com itálico + galeria ARRASTÁVEL ("Arrástrame") + statement forte. *BDR tem história simples; falta a galeria arrastável + ênfase.*
4. **Cardápio "Las estrellas"** — menu por CATEGORIAS com abas; cada item = imagem em painel colorido + nome + descrição + selo "mais vendido". *BDR tem 3 cards; falta o menu completo por categorias (precisa dos sabores/preços reais).*
5. **Eventos/Catering** — bloco de alto impacto. *BDR já tem (vídeo mesa de festa) — elevar ao nível madie.*
6. **Instagram** — headline + contador + grade de 6 posts + "Desliza". *BDR: FALTA (lead manda 6 fotos + 1 vídeo).*
7. **Mapa estilizado** — mapa custom com marcadores + endereço/horário. *BDR tem bloco loja com foto; falta o mapa estilizado.*
8. **Footer** — logo, contato, legal. *BDR já tem.*
Estética: creme quente, acentos, mix serif+sans com itálico, produto em painéis de cor, galerias horizontais arrastáveis, muito movimento no scroll, vídeos, prova social.

## Estado atual (já construído)
- 8 seções em `src/components/sections/`: hero, historia, produtos, eventos, diferenciais, loja, orcamento, footer — montadas em `src/views/home.tsx`.
- 4 páginas: `/sobre` `/faq` `/privacidade` `/devolucao` (view `src/views/content-page.tsx` + `src/data/pages.ts`).
- Conteúdo real em `src/data/home.ts` (100% real da marca; sabores/preços = [PLACEHOLDER]).
- Backend: `src/app/api/contact/route.ts` (zod + handle() + envelope {data}/{error}) — testado 200/400. Form em `orcamento.tsx` via `apiFetch`.
- Assets: `public/assets/` (imagens 69→4 MB) + `public/assets/video/` (hero-cut, hero-drizzle, events-loop, <1 MB).
- Tokens em `src/app/globals.css` (chocolate/cocoa/caramelo + amarelo #FDD80D + creme + ink). Títulos: **Lora** (serif); corpo: Onest.
- Prompts salvos: `design/image-prompts.md`, `design/video-prompts.md`. Handoff enxuto: `HANDOFF.md`.

## Regras TRAVADAS (a vault `obsidian/` é a fonte da verdade — LER antes de codar)
- Animação SÓ spring-based (`@react-spring/web` via `src/components/animation/springs/`); texto SÓ via `spring-text-engine` (TextEngine). PROIBIDO CSS transitions/keyframes/framer-motion/GSAP.
- ⚠️ APRENDIDO: serif com eixo **optical-sizing** (Fraunces) + TextEngine **TRAVA o render** (loop de medição) → por isso usamos **Lora** (sem opsz). Serif novo: sem opsz OU fora do TextEngine.
- ⚠️ APRENDIDO: `SpringTrigger mode="scrub"` no hero prendeu a thread — usar com cuidado e medir perf.
- Tokens p/ estilo, dados p/ conteúdo (sem hardcode). Rotas → `src/views/`. Server Components por padrão; `"use client"` só nas folhas. Sem `any`. `npm run lint` antes de fechar.
- Vídeos: `<video>` mudo/loop/playsInline + `poster` (still).

## Gap p/ chegar no nível madie (fazer no Claude Code, com os agentes)
Header/nav sticky · hero editorial (itálico + prova social real) · galeria arrastável na história · menu por categorias (sabores/preços reais) · seção Instagram (grade) · mapa estilizado · mais motion no scroll (dentro das regras spring).

## Pendências do lead ([PLACEHOLDER])
Sabores/preços reais · região/frete/prazo/pagamento (FAQ) · história/ano (Sobre) · **revisão jurídica** das páginas legais · 6 fotos + 1 vídeo do @browniedaro · foto real da loja de Catumbi.

## Deploy
Build passa (deploy-ready). Vercel: importar repo → preset Next.js → env `NEXT_PUBLIC_SITE_URL`, `CONTACT_ENDPOINT`. **Publicar só com o GO do lead.**
