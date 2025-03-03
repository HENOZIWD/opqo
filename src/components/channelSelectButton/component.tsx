import styles from './style.module.css';
import ChannelImage from '../channelImage/component';
import { selectChannel } from '@/apis/channel';
import { useRouter } from 'next/navigation';
import { ERR_MSG_INTERNAL_SERVER, ERR_MSG_WRONG_CHANNEL } from '@/utils/message';
import { setAuthSession } from '@/utils/storage';
import { useFetch } from '@/hooks/useFetch';
import { useToast } from '@/hooks/useToast';

interface ChannelSelectButtonProps {
  channelId: string;
  channelName: string;
}

export default function ChannelSelectButton({
  channelId,
  channelName,
}: ChannelSelectButtonProps) {
  const router = useRouter();

  const { fetchHandler } = useFetch();
  const { showToast } = useToast();

  const handleSelectChannel = () => {
    fetchHandler(
      (controller) => selectChannel({
        channelId,
        controller,
      }),
      {
        onSuccess: (response) => {
          setAuthSession({
            channelToken: response?.data.accessToken || null,
            channelId,
            channelName,
          });

          router.push('/');
        },
        onError: (error) => {
          if (error?.status === 401) {
            showToast({
              message: ERR_MSG_WRONG_CHANNEL,
              type: 'error',
            });
          }
          else {
            showToast({
              message: ERR_MSG_INTERNAL_SERVER,
              type: 'error',
            });
          }
        },
      },
    );
  };

  return (
    <div className={styles.container}>
      <button
        type="button"
        className={styles.button}
        onClick={handleSelectChannel}
      >
        <ChannelImage
          channelId={channelId}
          channelName={channelName}
        />
      </button>
      <div className={styles.channelName}>{channelName}</div>
    </div>
  );
}
