/**
 * Home content — real brand data sourced from browniedaro.com.br.
 * Flavors / prices are not published publicly → generic, honest copy;
 * enrich real SKUs from pedidos.browniedaro.com.br / Instagram later.
 */
export const home = {
  contact: {
    whatsapp:
      "https://wa.me/5521969839252?text=Ol%C3%A1!%20Quero%20fazer%20um%20pedido%20de%20brownies.",
    whatsappEvents:
      "https://wa.me/5521969839252?text=Ol%C3%A1!%20Quero%20um%20or%C3%A7amento%20de%20brownies%20para%20o%20meu%20evento.",
    menu: "https://pedidos.browniedaro.com.br",
    phone: "+55 21 96983-9252",
    email: "contato@browniedaro.com.br",
    instagram: "https://www.instagram.com/browniedaro",
    address: "R. André Cavalcanti, 30 — Lj A · Centro, Rio de Janeiro",
    hours: "Segunda a Sábado · 9h às 19h",
    maps:
      "https://www.google.com/maps/place/Brownie+da+R%C3%B4/@-22.9144513,-43.1868944,17z/data=!3m1!4b1!4m6!3m5!1s0x997f0b59136645:0xfe88540d50845069!8m2!3d-22.9144513!4d-43.1868944!16s%2Fg%2F11ggvwr20b?entry=ttu",
  },
  hero: {
    eyebrow: "Brownies artesanais · Rio de Janeiro",
    title: "Deixe o seu dia mais doce",
    subtitle:
      "Brownies recheados, feitos na hora e personalizados para as suas festas e eventos. Sem corantes, sem conservantes.",
    trust: ["Feito na hora", "Sem conservantes", "Delivery no Rio"],
    socialProof: {
      rating: 5.0,
      reviewCount: 72,
      reviewLabel: "avaliações",
      platform: "Google",
    },
    navItems: [
      { label: "História", href: "#historia" },
      { label: "Cardápio", href: "#cardapio" },
      { label: "Avaliações", href: "#avaliacoes" },
      { label: "Eventos", href: "#eventos" },
      { label: "Instagram", href: "#instagram" },
      { label: "Loja", href: "#loja" },
    ],
  },
  historia: {
    eyebrow: "Quem faz",
    title: "Brownie de verdade feito na hora",
    paragraphs: [
      "Na nossa cozinha no Rio de Janeiro, cada brownie sai na hora — com ingredientes de verdade, sem corantes e sem conservantes.",
      "Do delivery à loja, a ideia é simples: um brownie que deixa o seu dia — e o dos seus convidados — mais doce.",
    ],
    gallery: {
      dragHint: "Arraste",
      images: [
        {
          src: "/assets/story/story-kitchen.jpg",
          alt: "Cozinha da Brownie da Rô em funcionamento",
          aspect: "3/4" as const,
        },
        {
          src: "/assets/story/story-texture.jpg",
          alt: "Textura de um brownie recém-cortado",
          aspect: "4/3" as const,
        },
        {
          src: "/assets/hero/hero-brownie-34.png",
          alt: "Brownie visto em ângulo",
          aspect: "1/1" as const,
        },
        {
          src: "/assets/events/events-box.jpg",
          alt: "Caixa de brownies para evento",
          aspect: "3/4" as const,
        },
      ],
    },
    statement:
      "Porque a Brownie da Rô não é só uma brownieria. É um lugar onde a tradição se reinventa.",
  },
  cardapio: {
    eyebrow: "Cardápio",
    title: "As estrelas",
    intro:
      "Assados cada manhã, sem corantes e sem conservantes — escolha por sabor, por recheio ou pela caixa que vai pra festa.",
    categories: [
      {
        id: "classicos",
        label: "Clássicos",
        count: 3,
        items: [
          {
            id: "tradicional",
            name: "Tradicional",
            description:
              "O clássico: casquinha que estala, interior molhadinho de chocolate.",
            image: "/assets/products/tradicional.png",
            alt: "Brownie tradicional da Brownie da Rô",
            panel: "chocolate",
            bestSeller: false,
            price: null, // [PLACEHOLDER: preço real]
          },
          {
            id: "chocolate",
            name: "Chocolate",
            description:
              "Dose dupla de chocolate: massa densa com pedaços que derretem na boca.",
            image: "/assets/products/tradicional.png",
            alt: "Brownie de chocolate duplo",
            panel: "caramel",
            bestSeller: true,
            price: null, // [PLACEHOLDER: preço real]
          },
          {
            id: "marmoreado",
            name: "Marmoreado",
            description:
              "Massa de chocolate mesclada com massa branca, macia e equilibrada.",
            image: "/assets/products/recheado.png",
            alt: "Brownie marmoreado de chocolate e massa branca",
            panel: "blush",
            bestSeller: false,
            price: null, // [PLACEHOLDER: preço real]
          },
        ],
      },
      {
        id: "especiais",
        label: "Especiais",
        count: 6,
        items: [
          {
            id: "pistache",
            name: "Pistache",
            description:
              "Massa de chocolate com pistache crocante por cima, doce na medida.",
            image: "/assets/products/tradicional.png",
            alt: "Brownie de pistache",
            panel: "sage",
            bestSeller: false,
            price: null, // [PLACEHOLDER: preço real]
          },
          {
            id: "doce-de-leite",
            name: "Doce de Leite",
            description:
              "Recheio cremoso de doce de leite escorrendo no meio do brownie.",
            image: "/assets/products/recheado.png",
            alt: "Brownie recheado de doce de leite",
            panel: "caramel",
            bestSeller: true,
            price: null, // [PLACEHOLDER: preço real]
          },
          {
            id: "cafe",
            name: "Café",
            description:
              "Toque de café na massa, para quem gosta de um sabor marcante.",
            image: "/assets/products/personalizado.png",
            alt: "Brownie de café",
            panel: "rose",
            bestSeller: false,
            price: null, // [PLACEHOLDER: preço real]
          },
          {
            id: "limao",
            name: "Limão",
            description:
              "Toque cítrico suave que corta o doce do chocolate.",
            image: "/assets/products/tradicional.png",
            alt: "Brownie de limão",
            panel: "yellow",
            bestSeller: false,
            price: null, // [PLACEHOLDER: preço real]
          },
          {
            id: "coco",
            name: "Coco",
            description:
              "Coco fresco na massa e por cima, textura macia e aromática.",
            image: "/assets/products/recheado.png",
            alt: "Brownie de coco",
            panel: "cream-warm",
            bestSeller: false,
            price: null, // [PLACEHOLDER: preço real]
          },
          {
            id: "nutella",
            name: "Nutella",
            description:
              "Recheio de Nutella cremoso no centro, pedaço a pedaço.",
            image: "/assets/products/personalizado.png",
            alt: "Brownie recheado de Nutella",
            panel: "chocolate",
            bestSeller: false,
            price: null, // [PLACEHOLDER: preço real]
          },
        ],
      },
      {
        id: "combos",
        label: "Combos & Caixas",
        count: 3,
        items: [
          {
            id: "caixa-presente-6",
            name: "Caixa Presente 6un",
            description:
              "Caixa montada pra presente: seis brownies na embalagem que você escolher.",
            image: "/assets/events/events-box.jpg",
            alt: "Caixa presente com seis brownies",
            panel: "blush",
            bestSeller: false,
            price: null, // [PLACEHOLDER: preço real]
          },
          {
            id: "caixa-presente-12",
            name: "Caixa Presente 12un",
            description:
              "Versão maior da caixa presente, com doze brownies para comemorar.",
            image: "/assets/events/events-box.jpg",
            alt: "Caixa presente com doze brownies",
            panel: "cream-warm",
            bestSeller: false,
            price: null, // [PLACEHOLDER: preço real]
          },
          {
            id: "combo-degustacao",
            name: "Combo Degustação",
            description:
              "Seleção de sabores variados para provar tudo de uma vez.",
            image: "/assets/products/tradicional.png",
            alt: "Combo de degustação com sabores variados",
            panel: "caramel",
            bestSeller: false,
            price: null, // [PLACEHOLDER: preço real]
          },
        ],
      },
    ],
    ctaLabel: "Ver cardápio completo",
    ctaHref: "https://pedidos.browniedaro.com.br",
  },
  instagram: {
    eyebrow: "Instagram",
    title: "Olha o que está saindo do forno antes de todo mundo.",
    body: "Mais de milhares seguidores nunca perdem uma fornada — cada criação estreia primeiro no nosso Instagram.",
    handle: "@browniedaro",
    handleHref: "https://www.instagram.com/browniedaro",
    followerCount: 6867,
    posts: [
      {
        src: "/assets/instagram/ig-1.jpg",
        alt: "Ambiente da Brownie da Rô — brownies e loja",
      },
      {
        src: "/assets/instagram/ig-2.jpg",
        alt: "Caixa presente e sacola com brownies artesanais",
      },
      {
        src: "/assets/instagram/ig-3.jpg",
        alt: "Brownies decorados em embalagem para presente",
      },
      {
        src: "/assets/instagram/ig-4.jpg",
        alt: "Detalhe da textura do brownie tradicional",
      },
      {
        src: "/assets/instagram/ig-5.jpg",
        alt: "Brownies personalizados para festa",
      },
      {
        src: "/assets/instagram/ig-6.jpg",
        alt: "Produção de brownies na cozinha",
      },
    ],
    videoSrc: null,
    dragHint: "Desliza",
  },
  eventos: {
    eyebrow: "Festas & eventos",
    title: "O brownie que vira o destaque da festa",
    text: "Escolha a cor, o desenho e a mensagem da embalagem. Seus convidados levam pra casa uma lembrancinha deliciosa — e inesquecível.",
    bullets: [
      "Embalagem personalizada",
      "Para festas e corporativo",
      "Orçamento rápido no WhatsApp",
    ],
    img: "/assets/events/events-table.jpg",
    imgDetail: "/assets/events/events-box.jpg",
  },
  diferenciais: {
    eyebrow: "Por que a Rô",
    title: "Brownie de verdade, sem atalho",
    img: "/assets/diferenciais/ingredients.jpg",
    items: [
      { title: "Feito na hora", desc: "Fornadas fresquinhas, todo dia." },
      { title: "Sem corantes nem conservantes", desc: "Só ingrediente de verdade." },
      { title: "Delivery no Rio", desc: "Receba em casa ou no trabalho." },
      { title: "Personalização", desc: "Do seu jeito, pra cada ocasião." },
    ],
  },
  reviews: {
    eyebrow: "Avaliações",
    title: "Quem provou, voltou",
    intro:
      "Nota máxima no Google — clientes de verdade elogiando sabor, atendimento e qualidade.",
    rating: 5.0,
    count: 72,
    mapsHref:
      "https://www.google.com/maps/place/Brownie+da+R%C3%B4/@-22.9144513,-43.1868944,17z/data=!3m1!4b1!4m6!3m5!1s0x997f0b59136645:0xfe88540d50845069!8m2!3d-22.9144513!4d-43.1868944!16s%2Fg%2F11ggvwr20b?entry=ttu",
    highlights: [
      "E os brownies são uma delícia, eu e meu filho somos fã do de Nutella.",
      "Variedade boa de sabores.",
      "Produtos de excelente qualidade com ótimo preço.",
    ],
    items: [
      {
        author: "Thaiz Rodrigues",
        text: "Equipe está de parabéns! Sou cliente desde eram lá no Catumbi. Atendimento excelente. E os brownies são uma delícia, eu e meu filho somos fã do de Nutella.",
        when: "5 meses atrás",
      },
      {
        author: "Jhonnata Oliveira",
        text: "Brownie delicioso a um preço justo. Vale a pena conhecer esse estabelecimento que já está há uns 6 anos oferecendo o melhor brownie da região!",
        when: "2 anos atrás",
      },
      {
        author: "Caroline Lopes",
        text: "Comprei 3x e os brownies são sensacionais. Sempre fresquinhos e de excelente qualidade. Os de doce de leite e ninho são maravilhosos!!!",
        when: "4 meses atrás",
      },
    ],
    ctaLabel: "Ver todas no Google Maps",
  },
  loja: {
    eyebrow: "Venha nos visitar",
    title: "Nossa loja no Centro",
    text: "Café expresso, atendimento no local e um cantinho pra adoçar o seu dia.",
    img: "/assets/loja/store.jpg",
    map: {
      streets: [
        { name: "R. André Cavalcanti", path: "" },
        { name: "Av. Mem de Sá", path: "" },
        { name: "R. Riachuelo", path: "" },
      ],
      markerLabel: "Brownie da Rô",
      metroStations: [
        { name: "Cinelândia", distance: "8 min" },
        { name: "Uruguai", distance: "10 min" },
      ],
      ctaLabel: "Abrir no Google Maps",
      mapsHref:
        "https://www.google.com/maps/place/Brownie+da+R%C3%B4/@-22.9144513,-43.1868944,17z/data=!3m1!4b1!4m6!3m5!1s0x997f0b59136645:0xfe88540d50845069!8m2!3d-22.9144513!4d-43.1868944!16s%2Fg%2F11ggvwr20b?entry=ttu",
    },
  },
  footer: {
    tagline: "Deixe o seu dia mais doce.",
    legalName:
      "Brownie da Rô Fabricação de Produtos Alimentícios e Comércio Varejista LTDA",
    cnpj: "CNPJ 18.682.677/0001-12",
    links: [
      { label: "Sobre", href: "/sobre" },
      { label: "Perguntas frequentes", href: "/faq" },
      { label: "Privacidade", href: "/privacidade" },
      { label: "Devolução", href: "/devolucao" },
    ],
  },
  orcamento: {
    eyebrow: "Peça já",
    title: "Vamos adoçar seu evento",
    subtitle:
      "Conta pra gente o que você precisa — a gente responde rapidinho no WhatsApp.",
  },
  sectionAnchors: {
    historia: "#historia",
    cardapio: "#cardapio",
    eventos: "#eventos",
    instagram: "#instagram",
    diferenciais: "#diferenciais",
    loja: "#loja",
    reviews: "#avaliacoes",
    orcamento: "#orcamento",
  },
} as const;