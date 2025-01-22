import styles from './style.module.css';
import ChannelImage from '../channelImage/component';
import { fetchHandler } from '@/utils/fetchHandler';
import { selectChannel } from '@/apis/channel';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction } from 'react';
import { ERR_MSG_INTERNAL_SERVER, ERR_MSG_WRONG_CHANNEL } from '@/utils/message';

interface ChannelSelectButtonProps {
  channelId: string;
  channelImageUrl: string;
  channelName: string;
  setErrorMessage: Dispatch<SetStateAction<string>>;
}

export default function ChannelSelectButton({
  channelId,
  channelImageUrl,
  channelName,
  setErrorMessage,
}: ChannelSelectButtonProps) {
  const router = useRouter();

  const handleSelectChannel = () => {
    setErrorMessage('');
    fetchHandler(
      () => selectChannel(channelId),
      {
        onSuccess: (response) => {
          localStorage.setItem('channelToken', response?.data.channelToken);
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
          src={channelImageUrl}
          channelName={channelName}
        />
      </button>
      <div className={styles.channelName}>{channelName}</div>
    </div>
  );
}
