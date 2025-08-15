import { dateTimeFormatAtoms } from '@/app/modules/components/DateTimeFormatProvider';
import { useAtom } from 'jotai';

export function useDateTimeFormat() {
  const [locale, setLocale] = useAtom(dateTimeFormatAtoms.localeAtom);
  const [timeZone, setTimeZone] = useAtom(dateTimeFormatAtoms.timeZoneAtom);

  return {
    locale,
    setLocale,
    timeZone,
    setTimeZone,
  };
}
