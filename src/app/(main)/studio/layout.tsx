'use client';

import { studioLayoutStyle } from '@/styles/layout.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

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
      <nav className={studioLayoutStyle.navigationBar}>
        <h3 className={studioLayoutStyle.title}>내 스튜디오</h3>
        <ul className={studioLayoutStyle.menuList}>
          <li>
            <Link
              className={`${studioLayoutStyle.menu}${currentPath === PATH_INFO ? ` ${studioLayoutStyle.currentMenu}` : ''}`}
              href={PATH_INFO}
              aria-current={currentPath === PATH_INFO ? 'page' : undefined}
            >
              정보
            </Link>
          </li>
          <li>
            <Link
              className={`${studioLayoutStyle.menu}${currentPath === PATH_CONTENTS ? ` ${studioLayoutStyle.currentMenu}` : ''}`}
              href={PATH_CONTENTS}
              aria-current={currentPath === PATH_CONTENTS ? 'page' : undefined}
            >
              콘텐츠
            </Link>
          </li>
        </ul>
      </nav>
      <div className={studioLayoutStyle.content}>
        {children}
      </div>
    </>
  );
}
