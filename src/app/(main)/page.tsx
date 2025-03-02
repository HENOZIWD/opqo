'use client';

import VideoCard from '@/components/videoCard/component';
import styles from './page.module.css';
import { videoGETFetcher } from '@/apis/video';
import { VideoCardResponse } from '@/utils/type';
import useSWRImmutable from 'swr/immutable';

export default function MainPage() {
  const { data: recentVideoData } = useSWRImmutable<VideoCardResponse[]>('/videos/recent', videoGETFetcher);

  return (
    <main>
      <h2 className={styles.sectionTitle}>최근 업로드 된 동영상</h2>
      <ul className={styles.videoList}>
        {recentVideoData
          ? recentVideoData.map(({
            id,
            title,
            duration,
            uploadDate,
            channelId,
            channelName,
          }) => (
            <li
              key={id}
              className={styles.videoCard}
            >
              <VideoCard
                videoId={id}
                videoTitle={title}
                videoDuration={duration}
                uploadDate={uploadDate}
                channelInfo={{
                  channelId,
                  channelName,
                }}
              />
            </li>
          ))
          : null}
      </ul>
    </main>
  );
}
