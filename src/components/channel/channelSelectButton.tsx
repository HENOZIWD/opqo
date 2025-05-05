'use client';

import { selectChannel } from '@/apis/channel';
import { ERR_MSG_CHANNELSELECT_FAILED, ERR_MSG_INTERNAL_SERVER, ERR_MSG_AUTHORIZATION_FAILED } from '@/utils/message';
import { useFetch } from '@/hooks/useFetch';
import { useToast } from '@/hooks/useToast';
import { parseJwt } from '@/utils/token';
import { setAccessTokenCookie } from '@/serverActions/token';
import { AuthenticationParams } from '@/apis/type';
import ChannelImage from './channelImage';
import { channelSelectButtonStyle } from '@/styles/channel.css';

interface ChannelSelectButtonProps extends AuthenticationParams {
  channelId: string;
  channelName: string;
}

export default function ChannelSelectButton({
  channelId,
  channelName,
  accessToken,
}: ChannelSelectButtonProps) {
  const { fetchHandler } = useFetch();
  const { showToast } = useToast();

  const handleSelectChannel = () => {
    fetchHandler(({ controller }) => selectChannel({
      channelId,
      controller,
      accessToken,
    }), {
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

        window.location.href = '/';
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
    });
  };

  return (
    <div className={channelSelectButtonStyle.container}>
      <button
        type="button"
        className={channelSelectButtonStyle.button}
        onClick={handleSelectChannel}
      >
        <ChannelImage
          channelId={channelId}
          channelName={channelName}
        />
      </button>
      <div className={channelSelectButtonStyle.name}>{channelName}</div>
    </div>
  );
}
