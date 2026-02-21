export default {
  build: {
    rollupOptions: {
      input: {
        content: "src/dev-tools/content.tsx"
      },
      output: {
        entryFileNames: "content.js"
      }
    }
  }
}