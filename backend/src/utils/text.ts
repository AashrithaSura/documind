import type { PageText } from '../types.js';
const stop=new Set('the a an and or but to of in for on with is are was were be by from this that it as at'.split(' '));
export const sentences=(text:string)=>text.match(/[^.!?]+[.!?]+|[^.!?]+$/g)?.map(s=>s.replace(/\s+/g,' ').trim()).filter(s=>s.length>24)||[];
export const keywords=(text:string,limit=8)=>Object.entries((text.toLowerCase().match(/[a-z]{4,}/g)||[]).filter(w=>!stop.has(w)).reduce<Record<string,number>>((a,w)=>(a[w]=(a[w]||0)+1,a),{})).sort((a,b)=>b[1]-a[1]).slice(0,limit).map(([word])=>word[0].toUpperCase()+word.slice(1));
export const chunkPages=(pages:PageText[],size=1100)=>pages.flatMap(({page,text})=>{const list:string[]=[];for(let i=0;i<text.length;i+=size)list.push(text.slice(i,i+size));return list.map(text=>({page,text}));});
export const relevant=(pages:PageText[],question:string)=>{const terms=new Set((question.toLowerCase().match(/[a-z]{3,}/g)||[]));return chunkPages(pages).map(x=>({...x,score:(x.text.toLowerCase().match(/[a-z]{3,}/g)||[]).filter(w=>terms.has(w)).length})).sort((a,b)=>b.score-a.score).slice(0,3);};
