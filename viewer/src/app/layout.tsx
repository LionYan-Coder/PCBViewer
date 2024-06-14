import "./globals.css";
import { cn } from "~/lib/utils";
import { AppProvider } from "~/providers/AppProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("min-h-screen bg-background font-sans antialiased")}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
