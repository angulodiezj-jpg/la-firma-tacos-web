"use client";

import { usePathname } from "next/navigation";

// Páginas que ya acaban con los botones de pedido de cada ciudad (portada con
// "Locales", Valencia con su propia tarjeta): ahí el cierre rojo sería repetir.
const SIN_CIERRE = ["/", "/valencia"];

export default function ClosingCTAGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return SIN_CIERRE.includes(pathname) ? null : <>{children}</>;
}
