import styles from './style.module.css';
import ChannelImage from '../channelImage/component';
import { fetchHandler } from '@/utils/fetchHandler';
import { selectChannel } from '@/apis/channel';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction } from 'react';
import { ERR_MSG_INTERNAL_SERVER, ERR_MSG_WRONG_CHANNEL } from '@/utils/message';
import { setAuthSession } from '@/utils/storage';
import { useAbortController } from '@/hooks/useAbortController';

interface ChannelSelectButtonProps {
  channelId: string;
  channelName: string;
  setErrorMessage: Dispatch<SetStateAction<string>>;
}

export default function ChannelSelectButton({
  channelId,
  channelName,
  setErrorMessage,
}: ChannelSelectButtonProps) {
  const router = useRouter();
  const { createAbortController } = useAbortController();

  const handleSelectChannel = () => {
    setErrorMessage('');

    const controller = createAbortController();

    fetchHandler(
      () => selectChannel({
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
            setErrorMessage(ERR_MSG_WRONG_CHANNEL);
          }
          else {
            setErrorMessage(ERR_MSG_INTERNAL_SERVER);
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
