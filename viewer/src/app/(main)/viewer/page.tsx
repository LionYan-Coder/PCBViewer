"use client";
import { useTab } from "~/hooks/useTab";
import { PDFView } from "./PDFView";
import { PCBView } from "./PCBView";

export default function Viewer() {
  const { viewTab } = useTab();

  if (viewTab?.type === "PDF") {
    return <PDFView />;
  }
  return <PCBView />;
}
