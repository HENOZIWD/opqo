import { watchHistoryListStyle } from '../styles/watchHistoryListStyle.css';
import WatchHistoryCard from './watchHistoryCard';

interface WatchHistoryListProps {
  data: {
    watchProgress: number;
    watchedDate: string;
    video: {
      id: string;
      title: string;
      duration: number;
      user: {
        id: string;
        name: string;
        picture: string;
      };
    };
  }[];
};

export default function WatchHistoryList({ data }: WatchHistoryListProps) {
  return (
    <div className={watchHistoryListStyle.container}>
      <ul className={watchHistoryListStyle.list}>
        {data.map(({
          watchProgress,
          video,
        }) => (
          <li key={video.id}>
            <WatchHistoryCard
              watchProgress={watchProgress}
              video={video}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
