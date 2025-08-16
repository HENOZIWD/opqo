'use client';

import { useDateTimeFormat } from '@/hooks/useDateTimeFormat';
import { formatDateString, formatDateTimeString } from '@/utils/dateFormat';
import { useEffect, useState } from 'react';

interface DateProps {
  dateStr: string;
  type: 'date' | 'time';
}

export default function Date({
  dateStr,
  type,
}: DateProps) {
  const {
    locale,
    timeZone,
  } = useDateTimeFormat();

  const [formattedStr, setFormattedStr] = useState(dateStr);

  useEffect(() => {
    if (type === 'date') {
      setFormattedStr(formatDateString(dateStr, {
        locale,
        timeZone,
      }));
    }
    else {
      setFormattedStr(formatDateTimeString(dateStr, {
        locale,
        timeZone,
      }));
    }
  }, [dateStr, locale, timeZone, type]);

  return (
    <>
      {formattedStr}
    </>
  );
}
