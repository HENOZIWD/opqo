import styles from './style.module.css';
import ChannelImage from '../channelImage/component';
import { selectChannel } from '@/apis/channel';
import { useRouter } from 'next/navigation';
import { ERR_MSG_CHANNELSELECT_FAILED, ERR_MSG_INTERNAL_SERVER, ERR_MSG_AUTHORIZATION_FAILED } from '@/utils/message';
import { useFetch } from '@/hooks/useFetch';
import { useToast } from '@/hooks/useToast';
import { setAccessToken } from '@/utils/storage';
import { isValidToken } from '@/utils/token';

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
          const token = response?.data.accessToken;

          if (!token || !isValidToken(token)) {
            showToast({
              message: ERR_MSG_CHANNELSELECT_FAILED,
              type: 'error',
            });

            return;
          }

          setAccessToken(response.data.accessToken);

          router.push('/');
        },
        onError: (error) => {
          if (error?.status === 401) {
            showToast({
              message: ERR_MSG_AUTHORIZATION_FAILED,
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
