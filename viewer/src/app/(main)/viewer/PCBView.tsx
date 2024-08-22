import { invoke } from "@tauri-apps/api/core";
import { useEffect, useState } from "react";
import { LoadingWrapper } from "~/components/ui";
import { useApp } from "~/hooks/useApp";
import { useAsset } from "~/hooks/useAsset";
import { useTab } from "~/hooks/useTab";

export function PCBView() {
  const { setError } = useApp();
  const { currentAsset, fetchAsset } = useAsset();
  const { viewTab } = useTab();
  const [loading, setLoading] = useState(false);
  const [pcbdata, setPcbData] = useState("");

  useEffect(() => {
    if (viewTab && viewTab.key) {
      try {
        setLoading(true);
        fetchAsset(viewTab.key);
      } catch (error) {
        setError({
          label: "获取数据出错！",
          desc: JSON.stringify(error),
        });
      }
    }
  }, [fetchAsset, setError, viewTab]);

  useEffect(() => {
    async function getAscByFilePath(path: string) {
      try {
        const value = await invoke<string>("get_asc_by_file_path", {
          path,
        }).finally(() => setLoading(false));
        console.log("value", value);

        // setPcbData(value);
      } catch (error) {
        setLoading(false);
        console.log("error", error);
        throw error;
      }
    }
    if (currentAsset && currentAsset.url) {
      getAscByFilePath(currentAsset.url);
    }
  }, [currentAsset]);

  return (
    <LoadingWrapper loading={loading} loaderClassName="w-10">
      {pcbdata}
    </LoadingWrapper>
  );
}
