"use client";
import { useEffect } from "react";
import { LoadingPage } from "~/components/ui";
import { AppContext, useAppContext } from "~/hooks/useApp";
import Error from "~/app/error";

export function AppProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const context = useAppContext();
  const { initdb, close, db, connecting, error } = context;

  useEffect(() => {
    initdb();

    return () => {
      close();
    };
  }, []);

  if (error) {
    return <Error error={error} />;
  }

  if (connecting) {
    return (
      <LoadingPage
        className="w-screen h-screen"
        loaderClassName="w-10"
        loader="infinity"
        loading={connecting}
      />
    );
  }

  if (db.current) {
    return (
      <AppContext.Provider value={context}>{children}</AppContext.Provider>
    );
  }
}
