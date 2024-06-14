import { cn } from "~/lib/utils";
import "~/assets/style/loading.scss";
import { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingProps {
  className?: string;
  loader?: "spinner" | "dots" | "ring" | "ball" | "bars" | "infinity";
}
export function Loading({ className, loader = "spinner" }: LoadingProps) {
  return (
    <motion.span
      animate={{ opacity: 1, scale: 1 }}
      initial={{ opacity: 0, scale: 0.96 }}
      className={cn("loading w-6", `loading-${loader}`, className)}
    />
  );
}

interface LoadingPageProps {
  children?: ReactNode;
  loading: boolean;
  loaderClassName?: string;
}

export function LoadingPage({
  className,
  loaderClassName,
  loader = "spinner",
  loading,
  children,
}: LoadingProps & LoadingPageProps) {
  return (
    <div
      className={cn(
        "relative w-full h-full pointer-events-none select-none",
        className
      )}
    >
      <AnimatePresence>
        {loading && (
          <motion.div
            key="loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-zinc-800/10 absolute size-full inset-0 z-10 backdrop-blur flex items-center justify-center"
          >
            <Loading className={loaderClassName} loader={loader} />
          </motion.div>
        )}

        {children}
      </AnimatePresence>
    </div>
  );
}
