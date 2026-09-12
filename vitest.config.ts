import { defineConfig } from "vitest/config"

// Runs the tests that ship inside registry items, so the source of truth is
// verified here before any consumer installs it.
export default defineConfig({
  test: {
    environment: "node",
    include: ["src/registry/**/*.test.ts"],
  },
})
