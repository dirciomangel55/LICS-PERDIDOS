
export interface Culture {
  id: string;
  name: string;
  autonym: string;
  meaning: string;
  region: string;
  description: string;
  languageInfo: string;
  traditions: string[];
  imageUrl: string;
  color: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
