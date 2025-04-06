import styles from './style.module.css';
import ChannelImage from '../channelImage/component';
import { selectChannel } from '@/apis/channel';
import { useRouter } from 'next/navigation';
import { ERR_MSG_CHANNELSELECT_FAILED, ERR_MSG_INTERNAL_SERVER, ERR_MSG_AUTHORIZATION_FAILED } from '@/utils/message';
import { useFetch } from '@/hooks/useFetch';
import { useToast } from '@/hooks/useToast';
import { parseJwt } from '@/utils/token';
import { setAccessTokenCookie } from '@/serverActions/token';
import { AuthenticationParams } from '@/apis/type';

interface ChannelSelectButtonProps extends AuthenticationParams {
  channelId: string;
  channelName: string;
}

export default function ChannelSelectButton({
  channelId,
  channelName,
  accessToken,
}: ChannelSelectButtonProps) {
  const router = useRouter();

  const { fetchHandler } = useFetch();
  const { showToast } = useToast();

  const handleSelectChannel = () => {
    fetchHandler(
      (controller) => selectChannel({
        channelId,
        controller,
        accessToken,
      }),
      {
        onSuccess: async (response) => {
          const accessToken = response?.data.accessToken;

          if (!accessToken) {
            showToast({
              message: ERR_MSG_CHANNELSELECT_FAILED,
              type: 'error',
            });

            return;
          }

          const userData = parseJwt(accessToken);

          if (!userData) {
            showToast({
              message: ERR_MSG_CHANNELSELECT_FAILED,
              type: 'error',
            });

            return;
          }

          await setAccessTokenCookie({
            accessToken,
            expUnixTimeStamp: userData.exp,
          });

          router.push('/');
        },
        onError: (error) => {
          if (error?.status === 401 || error?.status === 403) {
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
