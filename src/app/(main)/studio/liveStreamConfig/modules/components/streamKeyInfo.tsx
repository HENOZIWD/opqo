'use client';

import { buttonStyle } from '@/styles/common/buttonStyle.css';
import { generateStreamKey } from '../apis/generateStreamKey';
import { useFetch } from '@/hooks/useFetch';
import { useState } from 'react';
import { streamKeyInfoStyle } from '../styles/streamKeyInfoStyle.css';

export default function StreamKeyInfo() {
  const {
    fetchHandler,
    isFetching,
  } = useFetch();
  const [generatedStreamKey, setGeneratedStreamKey] = useState<string>('');

  const handleGenerateStreamKey = () => {
    fetchHandler(({
      controller,
      accessToken,
    }) => generateStreamKey({
      controller,
      accessToken,
    }), {
      onSuccess: async (response) => {
        const { streamKey } = await response.json();

        setGeneratedStreamKey(streamKey);
      },
      onError: () => {
        setGeneratedStreamKey('스트림 키를 발급하지 못했습니다.');
      },
    });
  };

  return (
    <div className={streamKeyInfoStyle.container}>
      <button
        type="button"
        className={buttonStyle.small}
        onClick={handleGenerateStreamKey}
        disabled={isFetching}
      >
        스트림 키 발급
      </button>
      {generatedStreamKey
        ? (
          <>
            <div className={streamKeyInfoStyle.warning}>
              <div>스트림 키를 다른 사람에게 공유하지 마세요! 스트림 키가 유출되면 다른 사람이 임의로 방송을 송출할 수 있습니다.</div>
              <div>발급한 스트림 키는 페이지를 벗어나면 다시 볼 수 없습니다. 자신만 볼 수 있는 곳에 저장하세요.</div>
            </div>
            <div>
              스트림 키:
              {' '}
              {generatedStreamKey}
            </div>
          </>
        )
        : null}
    </div>
  );
}
