'use client';

import { ReactNode, useEffect } from 'react';
import { getLocale, getTimeZone } from '../utils/format';
import { atom } from 'jotai';
import { useDateTimeFormat } from '@/hooks/useDateTimeFormat';

const localeAtom = atom<string | undefined>(undefined);
const timeZoneAtom = atom<string | undefined>(undefined);

export const dateTimeFormatAtoms = {
  localeAtom,
  timeZoneAtom,
};

interface DateTimeFormatProviderProps { children: ReactNode }

export default function DateTimeFormatProvider({ children }: DateTimeFormatProviderProps) {
  const {
    locale,
    setLocale,
    timeZone,
    setTimeZone,
  } = useDateTimeFormat();

  useEffect(() => {
    if (!locale) {
      setLocale(getLocale());
    }
    if (!timeZone) {
      setTimeZone(getTimeZone);
    }
  }, [locale, timeZone, setLocale, setTimeZone]);

  return (
    <html lang={locale}>
      {children}
    </html>
  );
}
