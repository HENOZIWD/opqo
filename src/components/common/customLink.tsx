import Link, { LinkProps } from 'next/link';
import { AnchorHTMLAttributes } from 'react';
import { buttonStyle } from '@/styles/common.css';

interface CustomLinkProps extends LinkProps, Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> { size?: 'default' | 'small' }

export default function CustomLink({
  size = 'default',
  ...props
}: CustomLinkProps) {
  return (
    <Link
      className={`${buttonStyle.container}${size === 'small' ? ` ${buttonStyle.small}` : ''}`}
      {...props}
    />
  );
}
