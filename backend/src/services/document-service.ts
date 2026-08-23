import { randomUUID } from 'node:crypto';
import { getDocument } from 'pdfjs-dist/legacy/build/pdf.mjs';
import { createWorker } from 'tesseract.js';
import type { PageText, StoredDocument } from '../types.js';

const documents=new Map<string,StoredDocument>();
const imageTypes=new Set(['image/jpeg','image/png']);
export const allowedTypes=new Set(['application/pdf',...imageTypes]);
export const extract=async(file:Express.Multer.File):Promise<StoredDocument>=>{
  let pages:PageText[]=[]; let ocrUsed=false;
  if(file.mimetype==='application/pdf'){
    const pdf=await getDocument({data:new Uint8Array(file.buffer)}).promise;
    for(let page=1;page<=pdf.numPages;page++){const content=await (await pdf.getPage(page)).getTextContent(); pages.push({page,text:content.items.map((i:any)=>i.str).join(' ').replace(/\s+/g,' ').trim()});}
    if(pages.join('').trim().length<30) throw new Error('This scanned PDF has no readable text. Please upload each page as a PNG or JPG for OCR.');
  } else if(imageTypes.has(file.mimetype)) {
    ocrUsed=true; const worker=await createWorker('eng'); try { const result=await worker.recognize(file.buffer); pages=[{page:1,text:result.data.text.trim()}]; } finally { await worker.terminate(); }
  } else throw new Error('Unsupported file type.');
  if(pages.join('').trim().length<30) throw new Error('We could not extract enough readable text from this document.');
  const doc={id:randomUUID(),filename:file.originalname.replace(/[^a-zA-Z0-9._ -]/g,'_'),mimeType:file.mimetype,pages,ocrUsed,createdAt:Date.now()}; documents.set(doc.id,doc); return doc;
};
export const findDocument=(id:string)=>documents.get(id);
