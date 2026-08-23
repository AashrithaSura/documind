import type { Analysis, Answer, SummaryLength } from './types';
const request = async <T>(path:string, init?:RequestInit):Promise<T> => { const response=await fetch(path,init); const body=await response.json().catch(()=>({error:'Unexpected server response.'})); if(!response.ok) throw new Error(body.error||'Something went wrong.'); return body as T; };
export const upload=(file:File)=>{const data=new FormData();data.append('file',file);return request<Analysis>('/api/documents/upload',{method:'POST',body:data});};
export const summarize=(id:string,length:SummaryLength)=>request<Analysis>(`/api/documents/${id}/summarize`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({length})});
export const ask=(id:string,question:string)=>request<Answer>(`/api/documents/${id}/questions`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({question})});
