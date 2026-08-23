export type SummaryLength = 'short' | 'medium' | 'long';
export interface Insight { pages:number; words:number; readingMinutes:number; documentType:string; ocrUsed:boolean; topics:string[]; dates:string[]; people:string[]; organizations:string[]; numbers:string[]; }
export interface Analysis { id:string; filename:string; status:string; summary:string; keyPoints:string[]; insights:Insight; actionItems:string[]; suggestions:{category:string;text:string}[]; }
export interface Answer { answer:string; sources:{page:number;excerpt:string}[]; }
