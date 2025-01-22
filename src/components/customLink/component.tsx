import Link, { LinkProps } from 'next/link';
import styles from './style.module.css';
import { AnchorHTMLAttributes } from 'react';

export default function CustomLink({ ...props }: LinkProps & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <Link
      className={styles.link}
      {...props}
    />
  );
}
