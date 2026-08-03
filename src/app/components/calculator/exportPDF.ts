import jsPDF from "jspdf";
import { formatNumber } from "./pricing";
import type { CalculatorState } from "../calculator3d/CalculatorContext";

export function generateQuotePDF(state: CalculatorState) {
  const doc = new jsPDF();

  // Cores
  const teal = "#0A9396";
  const gray = "#333333";

  // Cabeçalho
  doc.setFontSize(22);
  doc.setTextColor(teal);
  doc.text("Orçamento de Design", 20, 30);

  doc.setFontSize(12);
  doc.setTextColor(gray);
  const data = new Date().toLocaleDateString("pt-BR");
  doc.text(`Data: ${data}`, 20, 40);

  // Serviços
  doc.setFontSize(16);
  doc.setTextColor(0, 0, 0);
  doc.text("Serviços Selecionados", 20, 60);

  doc.setFontSize(12);
  let y = 70;
  if (state.isActive("id")) {
    doc.text("- Identidade Visual", 25, y);
    y += 8;
  }
  if (state.isActive("lp")) {
    doc.text("- Landing Page", 25, y);
    y += 8;
  }
  if (state.isActive("pitchdeck")) {
    doc.text("- Pitch Deck", 25, y);
    y += 8;
  }

  // Parâmetros do Projeto
  y += 10;
  doc.setFontSize(16);
  doc.text("Parâmetros do Projeto", 20, y);

  doc.setFontSize(12);
  y += 10;
  doc.text(`Tamanho do Cliente: ${state.clientLabel}`, 25, y);
  y += 8;
  doc.text(`Nível de Experiência: ${state.experienceLabel}`, 25, y);
  y += 8;
  doc.text(`Oportunidade (Valor Estratégico): ${state.opportunityLabel}`, 25, y);

  // Preço Final
  y += 20;
  doc.setFontSize(18);
  doc.setTextColor(teal);
  doc.text(`Investimento Total: R$ ${formatNumber(state.projectPrice)}`, 20, y);

  // Rodapé
  y += 20;
  doc.setFontSize(10);
  doc.setTextColor(150, 150, 150);
  doc.text("Este orçamento é uma estimativa baseada nas configurações selecionadas.", 20, y);
  doc.text("Gerado por Calculadora 3D de Freelance (robsonmarcolino.github.io/Calculadora3D)", 20, y + 6);

  // Salvar
  doc.save("orcamento-design.pdf");
}
