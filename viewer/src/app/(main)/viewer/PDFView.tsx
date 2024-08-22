import { Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import { useEffect, useState } from "react";
import { useApp } from "~/hooks/useApp";
import { useTab } from "~/hooks/useTab";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { EmptyIcon } from "~/assets/icons";
import zh_CN from "@react-pdf-viewer/locales/lib/zh_CN.json";
import { useAsset } from "~/hooks/useAsset";
import { LoadingWrapper } from "~/components/ui";

const uploadUrl = process.env.NEXT_PUBLIC_UPLOAD_URL || "";

export function PDFView() {
  const { setError } = useApp();
  const { fetchAsset, currentAsset } = useAsset();
  const [loading, setLoading] = useState(false);
  const { viewTab } = useTab();
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  useEffect(() => {
    if (viewTab && viewTab.key) {
      try {
        setLoading(true);
        fetchAsset(viewTab.key).finally(() => setLoading(false));
      } catch (error) {
        setError({
          label: "获取数据出错！",
          desc: JSON.stringify(error),
        });
      }
    }
  }, [fetchAsset, setError, viewTab]);

  if (!currentAsset || !currentAsset.url) {
    return (
      <div className="mb-2 flex justify-center">
        <EmptyIcon className="w-9 h-9" />
        <p className="text-center">没有上传文档</p>
      </div>
    );
  }
  return (
    <LoadingWrapper loading={loading} loaderClassName="w-10">
      <Viewer
        fileUrl={uploadUrl + currentAsset?.url}
        plugins={[defaultLayoutPluginInstance]}
        localization={zh_CN}
      />
    </LoadingWrapper>
  );
}
