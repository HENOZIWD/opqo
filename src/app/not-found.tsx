import CustomLink from '@/components/common/customLink';
import { pageStyle } from '@/styles/common.css';

export default function NotFound() {
  return (
    <div className={pageStyle.errorPage}>
      <h1>페이지가 존재하지 않습니다.</h1>
      <CustomLink href="/">메인 페이지로</CustomLink>
    </div>
  );
}
