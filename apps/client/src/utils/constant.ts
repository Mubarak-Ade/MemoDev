export const codeLines = [
  { num: 1, tokens: [
    { text: "import", color: "#c792ea" },
    { text: " { ", color: "#cdd6f4" },
    { text: "Vault", color: "#89dceb" },
    { text: " } ", color: "#cdd6f4" },
    { text: "from", color: "#c792ea" },
    { text: " '@memory-vault/sdk'", color: "#a6e3a1" },
    { text: ";", color: "#cdd6f4" },
  ]},
  { num: 2, tokens: [] },
  { num: 3, tokens: [
    { text: "export", color: "#c792ea" },
    { text: " const ", color: "#cdd6f4" },
    { text: "syncKnowledge", color: "#89b4fa" },
    { text: " = ", color: "#cdd6f4" },
    { text: "async", color: "#c792ea" },
    { text: " () => {", color: "#cdd6f4" },
  ]},
  { num: 4, tokens: [
    { text: "  const ", color: "#cdd6f4" },
    { text: "instance", color: "#89b4fa" },
    { text: " = ", color: "#cdd6f4" },
    { text: "new ", color: "#c792ea" },
    { text: "Vault", color: "#89dceb" },
    { text: "({ apiKey:", color: "#cdd6f4" },
  ]},
  { num: null, tokens: [
    { text: "    'mv_live_...'", color: "#a6e3a1" },
    { text: " });", color: "#cdd6f4" },
  ]},
  { num: 5, tokens: [
    { text: "  // Initialize lightning-fast retrieval", color: "#6c7086" },
  ]},
  { num: 6, tokens: [
    { text: "  ", color: "#cdd6f4" },
    { text: "await", color: "#c792ea" },
    { text: " instance.", color: "#cdd6f4" },
    { text: "connect", color: "#89b4fa" },
    { text: "();", color: "#cdd6f4" },
  ]},
  { num: 7, tokens: [
    { text: "  ", color: "#cdd6f4" },
    { text: "return", color: "#c792ea" },
    { text: " instance.", color: "#cdd6f4" },
    { text: "optimize", color: "#89b4fa" },
    { text: "();", color: "#cdd6f4" },
  ]},
  { num: 8, tokens: [
    { text: "};", color: "#cdd6f4" },
  ]},
];