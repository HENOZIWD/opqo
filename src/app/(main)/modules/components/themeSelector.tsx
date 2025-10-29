'use client';

import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { useEffect } from 'react';
import { themeSelectorStyle } from '../styles/themeSelectorStyle.css';

const themeAtom = atomWithStorage('theme', 'light');

export default function ThemeSelector() {
  const [theme, setTheme] = useAtom(themeAtom);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

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
