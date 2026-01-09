"use client";

import { Navbar } from "@/components/Navbar";
import { Text } from "@/components/Text";

export default function NotFound() {
  return (
    <div className="min-h-[500px]">
      <Navbar />
      <main className="flex flex-col min-h-[500px] items-center justify-center">
        <Text as="h1" size="6xl" variant="primary" leading="tight">
          Oops!
        </Text>

        <a href="/" className="mt-12 inline-block">
          <Text>← Back</Text>
        </a>
      </main>
    </div>
  );
}
