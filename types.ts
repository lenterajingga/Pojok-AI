
export enum Role {
  USER = 'user',
  MODEL = 'model',
  SYSTEM = 'system'
}

export interface Message {
  id: string;
  role: Role;
  text: string;
  timestamp: number;
}

export interface ChatConfig {
  assistantName: string;
  welcomeMessage: string;
  systemInstruction: string;
}
