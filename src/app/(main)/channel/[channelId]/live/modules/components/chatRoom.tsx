'use client';

import { FormEvent, useEffect, useState } from 'react';
import { MessageInfo } from '../utils/type';
import { io, Socket } from 'socket.io-client';
import { AccessToken } from '@/utils/type';
import Input from '@/components/common/input';
import { buttonStyle } from '@/styles/common/buttonStyle.css';
import { chatRoomStyle } from '../styles/chatRoomStyle.css';

interface ChatRoomProps {
  userData: AccessToken | null;
  channelId: string;
}

let socket: Socket;

export default function ChatRoom({
  userData,
  channelId,
}: ChatRoomProps) {
  const [messages, setMessages] = useState<MessageInfo[]>([]);
  const [input, setInput] = useState('');
  const [isChatRoomConnected, setIsChatRoomConnected] = useState<boolean>(false);

  useEffect(() => {
    socket = io(process.env.NEXT_PUBLIC_SERVER_URL);
    socket.emit('join room', channelId, (response: { success: boolean }) => {
      if (response.success) {
        setIsChatRoomConnected(true);
      }
    });

    socket.on('chat message', (msg: MessageInfo) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.disconnect();
    };
  }, [channelId]);

  const handleSendMessage = (e: FormEvent<HTMLFormElement>) => {
    if (!userData || !socket.connected || !socket.id) {
      return;
    }

    e.preventDefault();

    if (input.trim() !== '') {
      const message: MessageInfo = {
        roomId: channelId,
        id: userData.id,
        name: userData.name,
        message: input,
      };

      socket.emit('chat message', message);
      setInput('');
    }
  };

  return (
    <div className={chatRoomStyle.container}>
      {!isChatRoomConnected
        ? <div className={chatRoomStyle.chatRoomConnecting}>채팅방 연결중...</div>
        : (
          <>
            <h2 className={chatRoomStyle.chatRoomTitle}>채팅</h2>
            <ul className={chatRoomStyle.chatRoom}>
              {messages.map(({
                id,
                name,
                message,
              }) => (
                <li
                  key={id}
                  className={chatRoomStyle.message}
                >
                  <div className={chatRoomStyle.name}>{name}</div>
                  <div>{message}</div>
                </li>
              ))}
            </ul>
            <form
              onSubmit={handleSendMessage}
              className={chatRoomStyle.inputWrapper}
            >
              <div className={chatRoomStyle.input}>
                <label
                  htmlFor="chat"
                  className={chatRoomStyle.inputLabel}
                >
                  채팅 메시지 전송하기
                </label>
                <Input
                  id="chat"
                  value={input}
                  onChange={(e) => setInput(e.currentTarget.value)}
                  placeholder={userData ? '메시지를 입력하세요.' : '로그인이 필요합니다.'}
                  disabled={userData === null}
                  autoTrim
                />
              </div>
              {userData
                ? (
                  <button
                    type="submit"
                    className={buttonStyle.default}
                  >
                    전송
                  </button>
                )
                : null}
            </form>
          </>
        )}
    </div>
  );
}
