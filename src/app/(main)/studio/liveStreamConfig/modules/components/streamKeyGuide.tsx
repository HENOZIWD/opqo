import Image from 'next/image';
import { streamKeyGuideStyle } from '../styles/streamKeyGuideStyle.css';

export default function StreamKeyGuide() {
  return (
    <div className={streamKeyGuideStyle.container}>
      <details>
        <summary className={streamKeyGuideStyle.summary}>스트림 키 적용 방법</summary>
        <div>
          <div className={streamKeyGuideStyle.imageWrapper}>
            <Image
              className={streamKeyGuideStyle.image}
              src="/assets/streamKeyGuide1.png"
              alt="스트림 키 적용 방법 스크린샷 1"
              fill
            />
          </div>
          <div className={streamKeyGuideStyle.imageWrapper}>
            <Image
              className={streamKeyGuideStyle.image}
              src="/assets/streamKeyGuide2.png"
              alt="스트림 키 적용 방법 스크린샷 2"
              fill
            />
          </div>
          <ol className={streamKeyGuideStyle.guideList}>
            <li>OBS Studio를 실행한 뒤 파일 - 설정 메뉴를 선택합니다.</li>
            <li>
              방송 탭을 선택한 뒤 우측 서버 항목에
              {' '}
              <strong>rtmp://api.opqo.kr/live</strong>
              를 입력합니다.
            </li>
            <li>스트림 키 항목에 발급받은 스트림 키를 복사하여 붙여넣습니다.</li>
            <li>적용 버튼을 누르면 스트림 키 적용이 완료됩니다.</li>
          </ol>
        </div>
      </details>
    </div>
  );
}
