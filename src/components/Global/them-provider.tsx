"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({
  children,
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark" // <-- sets default theme
      enableSystem={false} // <-- respect system preference
      disableTransitionOnChange={true} // <-- optional
    >
      {children}
    </NextThemesProvider>
  );
}
