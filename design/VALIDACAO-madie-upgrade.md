# Validação — Upgrade estilo Madie (NÃO APLICADO)

> Status: **AGUARDANDO SEU OK**  
> Nada foi alterado no código nem no deploy.  
> Referência: [madie.es](https://www.madie.es/?ref=onepagelove)  
> Preview atual: https://browniedaro-site.vercel.app

---

## 1) Header — colocar “Menu” ao lado do ícone?

**Sim — recomendado.**

Hoje o pill mobile tem só o hamburger (ícone). No Madie o botão fala **“Abrir menú”** — a affordance fica óbvia.

| Estado | Texto proposto |
|---|---|
| Fechado | **Menu** + ícone ☰ |
| Aberto | **Fechar** + ícone ✕ |

Alternativa mais “Madie”: `Navegar` — mas em PT-BR **Menu** é mais claro pra cliente de brownieria.

Mock mental do pill:
```
[ logo ]                    [ Menu ☰ ]
```

---

## 2) Animações estilo Madie — o que copiar (sem Framer/GSAP)

Restrição do projeto: só springs (`@react-spring/web`). Dá pra chegar bem perto sem tocar no vendor.

### P0 — impacto alto (fazer primeiro)

| # | Mudança | Onde | Efeito Madie |
|---|---|---|---|
| A | Label **Menu / Fechar** no header | `header.tsx` | Affordance clara |
| B | Galeria História vira **card stack** (cartas empilhadas + arraste) | `historia.tsx` | “Arrástrame” |
| C | Contador `01 / 04` + hint **Arraste** sobre o deck | `historia.tsx` | Contador Madie |
| D | Instagram vira faixa arrastável + hint **Deslize** | `instagram.tsx` | “Desliza” |

### P1 — polish

| # | Mudança | Onde |
|---|---|---|
| E | Pill deslizante na aba ativa do cardápio | `produtos.tsx` |
| F | Parallax leve no hero (SpringTrigger scrub, medir perf) | `hero.tsx` |
| G | Usar imagem de detalhe de eventos (já existe no data) | `eventos.tsx` |
| H | Mapa estilizado na loja (ruas do `home.ts`) | `loja.tsx` |

### P2 — depois

- Eyebrow do hero (já existe no data, não renderiza)
- BlurReveal no título de Eventos
- Preços reais no cardápio

---

## 3) Imagens — gaps e o que gerar

**Atenção:** neste clone, `public/assets/` está quase vazio (só `.gitkeep`). No Vercel o deploy anterior pode ter subido assets; localmente precisam ser recolocados.

### Prioridade de geração / substituição

| Prioridade | Slot | Aspect | Brief |
|---|---|---|---|
| P0 | 9–12 brownies únicos (1 por sabor) | 1:1 | Hoje 3 PNGs servem 12 itens |
| P0 | Foto real da loja Centro | 4:3 | Substituir placeholder AI |
| P0 | 6 posts Instagram reais | 1:1 | Feed @browniedaro |
| P1 | Cozinha / textura / caixa (história) | 3:4 e 4:3 | Card stack editorial |
| P1 | Detalhe embalagem eventos | 3:2 | Camada editorial eventos |
| P2 | Flat-lay ingredientes | 16:9 | Diferenciais |

### Prompts prontos (Nano Banana 2 / Genspark) — lote P0 produtos

**MASTER de produto (cole antes de cada sabor):**
```
Product photo of an artisan Brazilian brownie, square 1:1, soft cream backdrop #FAF4EA, warm chocolate tones, natural window light from camera-left, shallow depth of field, food editorial style like a premium bakery lookbook. Brownie centered on a small ceramic plate, crumbs subtle, no text, no logo, no watermark, no hands.
```

**Variações (uma por geração):**
1. Classic crackly-top chocolate brownie, moist center  
2. Double chocolate brownie with melted chunks  
3. Marbled chocolate and vanilla brownie  
4. Brownie topped with pistachio crumbs  
5. Brownie filled with dulce de leche oozing slightly  
6. Brownie with Nutella swirl on top  
7. Coconut-topped brownie  
8. Lemon-zest glazed brownie  
9. Gift box of brownies with ribbon (caramel/cream)  
10. Assorted brownie combo on a wooden board  

**Loja (P0):**
```
Exterior/interior photo of a small warm Brazilian brownie shop in Rio Centro, cream and chocolate palette, glass display with brownies, soft afternoon light, inviting, no readable fake signage text, editorial travel-food photography.
```

---

## 4) Como validar comigo (escolha)

Responda com as letras que quer aplicar, por exemplo:

- `APLICAR: A B C D` → só P0 motion/header  
- `APLICAR: A B C D E` → P0 + pill do cardápio  
- `GERAR IMAGENS: produtos + loja` → gero lote (com seu OK)  
- `TUDO P0` → header + stack + IG drag + prompts de imagem  

**Nada sobe pro Vercel até você mandar aplicar.**

---

## 5) Resumo em 1 frase

Sim ao **Menu** no header; dá pra chegar bem perto do Madie com **card stack + Arraste + Deslize + pill de abas**, sem Framer; imagens de produto/loja/IG são o maior ganho visual — tudo parado esperando seu GO.
