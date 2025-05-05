import { studioInfoSectionStyle } from '@/styles/studio.css';
import { ReactNode } from 'react';

interface StudioInfoSectionProps {
  title: string;
  children: ReactNode;
}

export default function StudioInfoSection({
  title,
  children,
}: StudioInfoSectionProps) {
  return (
    <section className={studioInfoSectionStyle.container}>
      <h2 className={studioInfoSectionStyle.title}>{title}</h2>
      <p className={studioInfoSectionStyle.content}>{children}</p>
    </section>
  );
}
