import Link, { LinkProps } from 'next/link';
import styles from './style.module.css';
import { AnchorHTMLAttributes } from 'react';

interface CustomLinkProps extends LinkProps, Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> { size?: 'default' | 'small' }

export default function CustomLink({
  size = 'default',
  ...props
}: CustomLinkProps) {
  return (
    <Link
      className={`${styles.link}${size === 'small' ? ` ${styles.small}` : ''}`}
      {...props}
    />
  );
}
