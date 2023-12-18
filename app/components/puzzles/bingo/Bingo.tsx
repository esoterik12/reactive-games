import * as React from "react";
import jsPDF from "jspdf";
import { BingoInput } from "./BingoInput";

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

  };

  async function handleGeneratePDF() {
    await generateObjectPDF();
  }

  return (
    <div ref={bingoRef}>
      {/* <p>Bingo Pagess</p>
      <button onClick={() => handleGeneratePDF()}>Download sObject PDF</button> */}
      <BingoInput />
    </div>
  );
}
