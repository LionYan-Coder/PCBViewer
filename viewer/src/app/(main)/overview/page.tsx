"use client";

import { useRouter } from "next/navigation";
import { Button } from "~/components/ui";
import { useTab } from "~/hooks/useTab";

export default function Overview() {
  const router = useRouter();
  const { setHomeTab } = useTab();
  function handleOpenHome() {
    router.replace("/");
    setHomeTab();
  }
  return (
    <section className="flex min-h-screen flex-col items-center justify-between p-24">
      <Button onClick={handleOpenHome}>打开主页</Button>
    </section>
  );
}
