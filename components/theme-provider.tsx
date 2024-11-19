"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider
      attribute="class" // Enables class-based theming
      defaultTheme="system" // Uses the system preference as default
      enableSystem // Enables system-level theme switching
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
