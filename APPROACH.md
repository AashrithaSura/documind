# Approach

DocuMind uses a two-part TypeScript architecture: a Vite/React client and a small Express API. Files are validated in memory, never executed or persisted. PDF.js extracts per-page text; Tesseract performs OCR for JPG and PNG uploads. The API retains the extracted pages for the current server session, avoiding duplicate processing.

`AIService` is an intentionally narrow boundary for summaries and grounded Q&A. The shipped implementation is deterministic and extractive, so it works without credentials and never invents information. It samples salient sentences across the document, derives lightweight insights, and ranks page-aware chunks for Q&A; answers include source-page references. The boundary can be replaced with a hosted AI provider using the optional environment variables without exposing keys to the client.

The frontend provides a responsive landing/upload experience, staged progress, dashboard, summaries, local action completion, suggestions, and accessible controls. Errors return consistent user-safe messages. The deliberately small dependency footprint favors deployability and reliability.
