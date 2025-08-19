export type ToastType = 'normal' | 'error';

export interface AccessToken {
  id: string;
  email: string;
  name: string;
  picture: string;
  exp: number;
}

export interface TextareaHandle { update: () => void }
