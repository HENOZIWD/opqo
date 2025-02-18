'use client';

import styles from './page.module.css';
import { videoGETFetcher } from '@/apis/video';
import VideoCardChannelDataFetcher from '@/components/videoCardChannelDataFetcher/component';
import useSWRImmutable from 'swr/immutable';

export default function MainPage() {
  const { data: recentVideoData } = useSWRImmutable('/videos/recent', videoGETFetcher);

  return (
    <main>
      <h2 className={styles.sectionTitle}>최근 업로드 된 동영상</h2>
      <ul className={styles.videoList}>
        {recentVideoData
          ? recentVideoData.data.map(({
            videoId,
            thumbnailUrl,
            videoDuration,
            videoTitle,
            uploadDate,
            channelId,
          }) => (
            <li
              key={videoId}
              className={styles.videoCard}
            >
              <VideoCardChannelDataFetcher
                videoId={videoId}
                thumbnailUrl={thumbnailUrl}
                videoDuration={videoDuration}
                videoTitle={videoTitle}
                uploadDate={uploadDate}
                channelId={channelId}
              />
            </li>
          ))
          : null}
      </ul>
    </main>
  );
}
