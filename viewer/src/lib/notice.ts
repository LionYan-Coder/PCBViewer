import { ReactNode } from "react";

export interface NoticeProps {
  title?: string | ReactNode;
  message?: string | ReactNode;
}
export class Notice {
  success({ title, message }: NoticeProps) {
    
  }
}
