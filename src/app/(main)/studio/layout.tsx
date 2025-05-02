'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { studioLayoutContentStyle, studioLayoutMenuListStyle, studioLayoutMenuStyle, studioLayoutNavigationBarStyle, studioLayoutTitleStyle, studioLayoutCurrentStyle } from './style.css';

const PATH_INFO = '/studio/info';
const PATH_CONTENTS = '/studio/contents';

type CurrentPath = typeof PATH_INFO | typeof PATH_CONTENTS | null;

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  const [currentPath, setCurrentPath] = useState<CurrentPath>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.startsWith(PATH_INFO)) {
      setCurrentPath(PATH_INFO);
    }
    else if (pathname.startsWith(PATH_CONTENTS)) {
      setCurrentPath(PATH_CONTENTS);
    }
  }, [pathname]);

  return (
    <>
      <nav className={studioLayoutNavigationBarStyle}>
        <h3 className={studioLayoutTitleStyle}>내 스튜디오</h3>
        <ul className={studioLayoutMenuListStyle}>
          <li>
            <Link
              className={`${studioLayoutMenuStyle}${currentPath === PATH_INFO ? ` ${studioLayoutCurrentStyle}` : ''}`}
              href={PATH_INFO}
              aria-current={currentPath === PATH_INFO ? 'page' : undefined}
            >
              정보
            </Link>
          </li>
          <li>
            <Link
              className={`${studioLayoutMenuStyle}${currentPath === PATH_CONTENTS ? ` ${studioLayoutCurrentStyle}` : ''}`}
              href={PATH_CONTENTS}
              aria-current={currentPath === PATH_CONTENTS ? 'page' : undefined}
            >
              콘텐츠
            </Link>
          </li>
        </ul>
      </nav>
      <div className={studioLayoutContentStyle}>
        {children}
      </div>
    </>
  );
}
