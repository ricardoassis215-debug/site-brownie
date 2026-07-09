/**
 * Institutional & legal page content.
 * Legal pages (privacidade, devolucao) are DRAFTS with [PLACEHOLDERS] and a
 * notice — they require legal review before publishing. Never invent legal terms.
 */
export const pages = {
  sobre: {
    title: "Sobre a Brownie da Rô",
    notice: "",
    sections: [
      {
        heading: "Brownie de verdade",
        body: "A Brownie da Rô faz brownies artesanais no Rio de Janeiro — feitos na hora, com ingredientes de verdade, sem corantes e sem conservantes.",
      },
      {
        heading: "Do delivery à loja",
        body: "Você pede pelo delivery ou passa na nossa loja em Catumbi para um café e um brownie fresquinho.",
      },
      {
        heading: "Festas e eventos",
        body: "Personalizamos as embalagens com a cor, o desenho e a mensagem da sua festa — o brownie vira o destaque da mesa de doces.",
      },
      {
        heading: "Nossa história",
        body: "[PLACEHOLDER: ano de fundação e a história de origem da marca — nos envie para incluirmos aqui.]",
      },
    ],
  },
  faq: {
    title: "Perguntas frequentes",
    notice: "",
    sections: [
      {
        heading: "Vocês entregam em qual região?",
        body: "Fazemos delivery no Rio de Janeiro. [PLACEHOLDER: bairros/raio de entrega e valor do frete.]",
      },
      {
        heading: "Dá para personalizar a embalagem?",
        body: "Sim! Escolha a cor, o desenho e a mensagem para a sua festa ou evento.",
      },
      {
        heading: "Tem conservantes?",
        body: "Não. Os brownies são feitos na hora, sem corantes e sem conservantes.",
      },
      {
        heading: "Qual o prazo para encomendas de eventos?",
        body: "[PLACEHOLDER: prazo mínimo de antecedência para festas e eventos.]",
      },
      {
        heading: "Formas de pagamento?",
        body: "[PLACEHOLDER: formas de pagamento aceitas.]",
      },
      {
        heading: "Onde fica a loja?",
        body: "Rua Doutor Lagden, 162 — Loja B, Catumbi, Rio de Janeiro. Segunda a sábado, das 9h às 17h.",
      },
    ],
  },
  privacidade: {
    title: "Política de Privacidade",
    notice:
      "Rascunho — precisa de revisão jurídica antes de publicar. Os campos [PLACEHOLDER] devem ser preenchidos com apoio jurídico.",
    sections: [
      {
        heading: "Quais dados coletamos",
        body: "Coletamos os dados que você nos envia no formulário de orçamento: nome, WhatsApp, e-mail (opcional) e a sua mensagem.",
      },
      {
        heading: "Como usamos",
        body: "Usamos seus dados apenas para atender, orçar e entregar o seu pedido. Não vendemos seus dados a terceiros.",
      },
      {
        heading: "Seus direitos (LGPD)",
        body: "Você pode pedir acesso, correção ou exclusão dos seus dados pelo e-mail contato@browniedaro.com.br.",
      },
      {
        heading: "Responsável e retenção",
        body: "[PLACEHOLDER: controlador dos dados, encarregado (DPO), base legal e prazo de retenção — preencher com apoio jurídico.]",
      },
    ],
  },
  devolucao: {
    title: "Política de Devolução",
    notice:
      "Rascunho — precisa de revisão jurídica antes de publicar. Os campos [PLACEHOLDER] devem ser preenchidos com apoio jurídico.",
    sections: [
      {
        heading: "Produto perecível",
        body: "Por serem alimentos feitos na hora, os brownies seguem regras específicas de troca e devolução.",
      },
      {
        heading: "Problema no pedido",
        body: "Se algo vier errado ou danificado, fale com a gente pelo WhatsApp (21) 96983-9252 com uma foto — resolvemos rapidinho. [PLACEHOLDER: prazo para reclamação.]",
      },
      {
        heading: "Cancelamento de encomendas",
        body: "[PLACEHOLDER: regras e prazos de cancelamento para encomendas de festas e eventos.]",
      },
      {
        heading: "Direito de arrependimento",
        body: "[PLACEHOLDER: aplicação do CDC (art. 49) para compras online de alimentos — revisar com jurídico.]",
      },
    ],
  },
} as const;
