import { Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import { useEffect, useState } from "react";
import { useApp } from "~/hooks/useApp";
import { useTab } from "~/hooks/useTab";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { EmptyIcon } from "~/assets/icons";

const uploadUrl = process.env.NEXT_PUBLIC_UPLOAD_URL || "";

export function PDFView() {
  const { select, setError } = useApp();
  const [asset, setAsset] = useState<Asset | null>(null);
  const [loading, setLoading] = useState(false);
  const { viewTab } = useTab();
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  useEffect(() => {
    async function fetchAsset() {
      try {
        console.log("fetchAsset");
        setLoading(true);
        const id = viewTab?.key as string;
        const result = await select<Asset[]>(
          "SELECT * FROM tb_asset WHERE asset_id = ?",
          [parseInt(id)]
        ).finally(() => setLoading(false));
        console.log("result", result);
        if (result && result.length === 1) {
          setAsset(result[0]);
        }
      } catch (error) {
        setError({
          label: "程序崩溃了！",
          desc: JSON.stringify(error),
        });
        setAsset(null);
      }
    }

    if (viewTab && viewTab.type === "PDF") {
      fetchAsset();
    }
  }, [viewTab]);

  console.log("view");

  if (!asset || !asset.url) {
    return (
      <div className="mb-2 flex justify-center">
        <EmptyIcon className="w-9 h-9" />
        <p className="text-center">没有上传文档</p>
      </div>
    );
  }
  return (
    <div>
      {asset && asset.url && (
        <Viewer
          fileUrl={uploadUrl + asset?.url}
          plugins={[defaultLayoutPluginInstance]}
        />
      )}
    </div>
  );
}
