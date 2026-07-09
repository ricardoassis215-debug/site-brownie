# Brownie da Rô — Handoff

Site institucional/conversão em Next.js 16 (base: next16-claude-starter). 100% local, pronto para deploy. Nada publicado sem o seu GO.

## Rodar local
- Node 22.13+ (aqui: 24). `npm install` → `npm run dev` → http://localhost:3000
- Build de produção: `npm run build` · servir: `npm run start`

## Variáveis de ambiente (.env)
- `NEXT_PUBLIC_SITE_URL` — origem pública (ex.: https://browniedaro.com.br). Alimenta canônica, OG e sitemap.
- `CONTACT_ENDPOINT` — (opcional) webhook/CRM/e-mail que recebe os orçamentos do formulário. Sem ele, os envios são apenas logados no servidor.

## Deploy (Vercel)
1. Suba o projeto num repositório GitHub.
2. vercel.com/new → importe o repo → preset Next.js (defaults).
3. Configure as env vars acima em Project Settings → Environment Variables.
4. Deploy. Publicar somente com o seu GO explícito.

## Pendências / [PLACEHOLDERS] (você me passa → eu preencho)
- Sabores e preços reais dos brownies (hoje a copy é genérica e honesta).
- Região/bairros de entrega, frete, prazo de encomenda, formas de pagamento (FAQ).
- História / ano de fundação (página Sobre).
- Páginas legais (Privacidade, Devolução): RASCUNHO — exigem revisão jurídica antes de publicar.
- Instagram: 6 fotos + 1 vídeo se quiser o feed real embutido.
- Foto real da loja de Catumbi (a atual é gerada — placeholder).

## Notas técnicas
- Imagens comprimidas 69 MB → 4 MB; vídeos web < 1 MB cada (mudos, loop, com poster still).
- Animações spring-based + Lenis (regras da vault obsidian respeitadas). Build, TypeScript e lint limpos.
