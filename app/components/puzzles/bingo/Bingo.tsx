import * as React from "react";
import jsPDF from "jspdf";


export function BingoPage() {
  const bingoRef = React.useRef<any>(null);

  const generateObjectPDF = async () => {
    const doc = new jsPDF();

    doc.html(bingoRef.current, {
      html2canvas: {
        scale: 0.2,
      },
      async callback(doc) {
        doc.save("output");
      },
    });

    // const pdfBlob: Blob = doc.output("blob");
    // const pdfUrl: string = URL.createObjectURL(pdfBlob);
    // return pdfUrl;
  };

  async function handleGeneratePDF() {
    await generateObjectPDF();
    // window.open(pdfUrl, "_blank");
  }

  return (
    <div ref={bingoRef}>
      <p>Bingo Pagess</p>
      <button onClick={() => handleGeneratePDF()}>Download sObject PDF</button>
    </div>
  );
}
