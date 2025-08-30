'use client';

import { useForm } from 'react-hook-form';
import { LiveStreamConfig } from '../utils/type';
import Input from '@/components/common/input';
import { formStyle } from '@/styles/common/formStyle.css';
import { buttonStyle } from '@/styles/common/buttonStyle.css';
import { useFetch } from '@/hooks/useFetch';
import { useToast } from '@/hooks/useToast';
import { applyLiveStreamConfig } from '../apis/applyLiveStreamConfig';

const ERR_MSG_LIVE_TITLE_EMPTY = '방송 제목을 입력해주세요.';
const ERR_MSG_LIVE_TITLE_LIMIT_EXCEEDED = '방송 제목 글자 수 제한을 초과했습니다.';

const LIVE_TITLE_LIMIT = 100;

interface LiveStreamConfigFormProps { config: LiveStreamConfig }

export default function LiveStreamConfigForm({ config }: LiveStreamConfigFormProps) {
  const {
    register,
    handleSubmit,
    formState,
  } = useForm<LiveStreamConfig>({
    mode: 'all',
    defaultValues: config,
  });

  const { fetchHandler } = useFetch();
  const { showToast } = useToast();

  const handleApplyConfig = (data: LiveStreamConfig) => {
    const trimmedTitle = data.title.trim();

    if (!trimmedTitle) {
      return;
    }

    fetchHandler(({
      accessToken,
      controller,
    }) => applyLiveStreamConfig({
      title: trimmedTitle,
      accessToken,
      controller,
    }), {
      onSuccess: () => {
        showToast({ message: '라이브 설정이 변경되었습니다.' });
      },
      onError: () => {
        showToast({
          message: '라이브 설정 변경에 실패했습니다.',
          type: 'error',
        });
      },
    });
  };

  return (
    <form
      className={formStyle.container}
      onSubmit={handleSubmit((data) => handleApplyConfig(data))}
    >
      <label htmlFor="방송 제목">방송 제목</label>
      <Input
        id="방송 제목"
        {...register('title', {
          required: {
            value: true,
            message: ERR_MSG_LIVE_TITLE_EMPTY,
          },
          maxLength: {
            value: LIVE_TITLE_LIMIT,
            message: ERR_MSG_LIVE_TITLE_LIMIT_EXCEEDED,
          },
        })}
        error={formState.errors.title !== undefined}
        maxLength={LIVE_TITLE_LIMIT}
        autoTrim
        defaultValueLength={config.title.length}
      />
      {formState.errors.title ? <div className={formStyle.error}>{formState.errors.title.message}</div> : null}
      <div className={formStyle.submit}>
        <button
          type="submit"
          className={buttonStyle.default}
        >
          적용
        </button>
      </div>
    </form>
  );
}
