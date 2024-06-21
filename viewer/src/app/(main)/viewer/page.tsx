"use client";
import { useTab } from "~/hooks/useTab";
import { PDFView } from "./PDFView";
import { PCBView } from "./PCBView";
import { Worker } from "@react-pdf-viewer/core";

export default function Viewer() {
  const { viewTab } = useTab();

  return (
    <Worker workerUrl="/pdf.worker.min.js">
      {viewTab?.type === "PDF" ? <PDFView /> : <PCBView />}
    </Worker>
  );
}
