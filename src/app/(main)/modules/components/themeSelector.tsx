'use client';

import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { useEffect, useState } from 'react';
import { themeSelectorStyle } from '../styles/themeSelectorStyle.css';
import { useTheme } from 'next-themes';

export default function ThemeSelector() {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const {
    theme,
    setTheme,
  } = useTheme();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme ?? 'light');
  }, [theme]);

  if (!isMounted) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={() => setTheme((prev) => prev === 'light' ? 'dark' : 'light')}
      title={theme === 'light' ? '다크 모드로 전환' : '라이트 모드로 전환'}
      aria-label={theme === 'light' ? '다크 모드로 전환' : '라이트 모드로 전환'}
    >
      {theme === 'light'
        ? <SunIcon className={themeSelectorStyle.button} />
        : <MoonIcon className={themeSelectorStyle.button} />}
    </button>
  );
}
