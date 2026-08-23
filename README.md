# DocuMind — AI Document Summary Assistant

DocuMind turns PDFs, JPGs, and PNGs into grounded summaries, key points, insights, action items, editorial suggestions, and page-referenced Q&A.

## Features

- Drag-and-drop/file-picker uploads with MIME and 10 MB validation
- Per-page PDF extraction and OCR for image documents
- Short, medium, and long summaries without re-uploading
- Topics, dates, entities, reading time, action items, suggestions
- Source-grounded Q&A with page references
- Responsive light/dark interface, loading pipeline, and safe error states

## Architecture

`React/Vite client → Express API → PDF.js or Tesseract → AIService → session document cache`

The shipped `AIService` uses transparent extractive analysis and lexical retrieval. It works without an API key and keeps answers grounded; it is the single boundary for substituting a hosted provider.

## Setup

Requires Node.js 20+.

```bash
cp .env.example .env
npm install
npm run dev
```

Open `http://localhost:5173`. API health: `http://localhost:5000/api/health`.

```bash
npm run test
npm run build
```

## API

| Method | Endpoint | Purpose |
| --- | --- | --- |
| GET | `/api/health` | Health check |
| POST | `/api/documents/upload` | Upload and analyze document |
| GET | `/api/documents/:id` | Read current-session analysis |
| POST | `/api/documents/:id/summarize` | Change summary length |
| POST | `/api/documents/:id/questions` | Ask grounded question |

## Environment and deployment

Copy `.env.example`. `PORT`, `CLIENT_URL`, and `MAX_FILE_SIZE_MB` configure the API. The optional AI variables are never exposed to the client. Deploy `frontend` to Vercel/Netlify and `backend` to any Node host; set `CLIENT_URL` to the deployed frontend origin. Do not deploy `node_modules`, `.env`, or build output.

## Limitations

Images receive OCR. Scanned PDFs without embedded text are rejected with guidance to upload page images. Documents live only for the server session; encrypted persistent storage and a hosted AI provider are deliberate future extensions.
