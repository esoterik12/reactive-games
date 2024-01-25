import jsPDF from "jspdf";

export default async function generatePDF(
  ref: any,
  saveName: string,
  x: number = 0,
  y: number = 0,
  scale: number = 1
) {
  const pixelWidth = 595; // A4 width in pixels
  const pixelHeight = 842; // A4 height in pixels

  const doc = new jsPDF({
    orientation: "p",
    unit: "mm",
    format: [pixelWidth, pixelHeight],
  });

  doc.html(ref, {
    x: x,
    y: y,
    html2canvas: {
      scale: scale,
    },
    async callback(doc) {
      doc.save(`${saveName}`);
    },
  });
}
