# ONDE PARAMOS — Brownie da Rô
> Atualizado: **2026-07-09** · Salvar/ler isto em qualquer LLM antes de continuar.

---

## Links oficiais

| O quê | URL / path |
|---|---|
| Preview cliente (Vercel prod) | https://browniedaro-site.vercel.app |
| GitHub | https://github.com/ricardoassis215-debug/site-brownie |
| Código produção (NÃO quebrar) | `C:\Users\ricar\Desktop\browniedaro-site` |
| Lab paralelo Madie (experimento) | `C:\Users\ricar\Desktop\browniedaro-site-madie-lab` |
| Referência visual | https://www.madie.es/ |

---

## Estado atual (verdade)

1. **Site no ar** em Vercel, versão **boa restaurada** (antes do upgrade Madie que piorou).
2. **GitHub commitado** em `ricardoassis215-debug/site-brownie` (`main`).
3. Tentativa de “copiar Madie” (Menu label, card stack, IG drag, mapa fake, parallax) **foi revertida** — lead pediu e tinha razão: ficou pior.
4. Experimento Madie ficou **só no lab** (`browniedaro-site-madie-lab`). **Nunca aplicar na produção sem OK explícito do lead.**
5. Proposta comercial (tráfego R$ 3.570/mês + loja grátis + Google/Meta + reunião semanal) tem prompts prontos em `design/sistema-prompts-proposta-browniedaro.md` e `design/prompt-proposta-trafego-nanobanana2.md`.

---

## Oferta comercial (contexto lead → cliente)

- Investimento: **R$ 3.570 / mês**
- Canais: **Google Ads + Meta Ads**
- **Loja/site digital incluso de graça** no start (fase preview)
- Ritmo: **1 reunião/semana** (melhorias, estrutura, concorrência, pontos de cliente, comportamento de público)
- Preview pra mandar: https://browniedaro-site.vercel.app
- Frase de fechamento: *“Você entra com o tráfego. A loja a gente entrega. Toda semana a gente afia o alvo juntos.”*

---

## Regras travadas do projeto

- Motion **só** `@react-spring/web` via `src/components/animation/springs/` — **proibido** Framer / GSAP / CSS transitions de animação.
- **Não editar** `src/components/animation/springs/` nem `src/hooks/animation/` sem sign-off.
- Não mexer em `pedidos.browniedaro.com.br`.
- Hero = vídeo. Tokens em `globals.css`. Conteúdo em `src/data/home.ts`.
- Cuidado: `SpringTrigger mode="scrub"` já deu problema de perf no hero.

---

## O que NÃO fazer de novo

- Aplicar “upgrade Madie” direto na pasta de produção / Vercel sem validar no lab.
- Card stack / mapa CSS fake / pill de abas / parallax scrub sem o lead aprovar visualmente primeiro.
- Prometer merge do lab → prod sem GO.

---

## Próximos passos sugeridos (quando o lead pedir)

1. No **lab**, estudar Madie com browser e reimplementar **1 bloco por vez**, validar local.
2. Só depois do OK: copiar pra `browniedaro-site` + redeploy Vercel.
3. Conteúdo pendente do lead: preços reais, foto real da loja, 6 fotos IG, história/ano, revisão jurídica das páginas legais.
4. Opcional: domínio custom no Vercel; env `NEXT_PUBLIC_SITE_URL` / `CONTACT_ENDPOINT`.

---

## Conta / deploy

- Vercel user: `ricardoassis215-3505`
- Projeto Vercel: `browniedaro-site`
- GitHub user: `ricardoassis215-debug`
- Repo: `site-brownie`

---

## Arquivos de apoio neste repo

- `HANDOFF.md` — handoff técnico curto
- `GAIOS-CONTINUE.md` — briefing Madie (desatualizado em partes; priorizar ESTE arquivo)
- `design/VALIDACAO-madie-upgrade.md` — proposta que foi rejeitada na prática
- `design/sistema-prompts-proposta-browniedaro.md` — deck Genspark/GPT Image
