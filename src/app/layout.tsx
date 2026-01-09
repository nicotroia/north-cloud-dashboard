import { Montserrat, Oxygen } from "next/font/google";
import "focus-visible";

import { Providers } from "@/components/Providers";
import { cx } from "@/helpers";
import "@/styles/globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const oxygen = Oxygen({ subsets: ["latin"], weight: ["300", "400", "700"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={cx(montserrat.variable, oxygen.className, "antialiased")}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
