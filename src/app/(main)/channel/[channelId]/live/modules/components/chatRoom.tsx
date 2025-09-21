'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import { MessageInfo } from '../utils/type';
import { io, Socket } from 'socket.io-client';
import { AccessToken } from '@/utils/type';
import Input from '@/components/common/input';
import { buttonStyle } from '@/styles/common/buttonStyle.css';
import { chatRoomStyle } from '../styles/chatRoomStyle.css';
import { ChatBubbleIcon, ChevronDownIcon, Cross1Icon } from '@radix-ui/react-icons';

interface ChatRoomProps {
  userData: AccessToken | null;
  channelId: string;
}

const MAX_MESSAGE_AMOUNT = 100;

let socket: Socket;

export default function ChatRoom({
  userData,
  channelId,
}: ChatRoomProps) {
  const [messages, setMessages] = useState<MessageInfo[]>([]);
  const [input, setInput] = useState('');
  const [isChatRoomConnected, setIsChatRoomConnected] = useState<boolean>(false);
  const [isChatRoomBottom, setIsChatRoomBottom] = useState<boolean>(true);
  const [isChatRoomExpanded, setIsChatRoomExpanded] = useState<boolean>(true);

  const chatRoomRef = useRef<HTMLUListElement>(null);
  const bottomRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    socket = io(process.env.NEXT_PUBLIC_SERVER_URL);
    socket.emit('join room', channelId, (response: { success: boolean }) => {
      if (response.success) {
        setIsChatRoomConnected(true);
      }
    });

    socket.on('chat message', (msg: MessageInfo) => {
      setMessages((prev) => [...prev, msg].slice(-MAX_MESSAGE_AMOUNT));
    });

    return () => {
      socket.disconnect();
    };
  }, [channelId]);

  useEffect(() => {
    if (!chatRoomRef.current || !bottomRef.current) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        setIsChatRoomBottom(entries[0].isIntersecting);
      },
      {
        root: chatRoomRef.current,
        threshold: 0,
      },
    );

    observer.observe(bottomRef.current);

    return () => {
      observer.disconnect();
    };
  }, [isChatRoomConnected]);

  useEffect(() => {
    if (!isChatRoomBottom || !bottomRef.current) {
      return;
    }

    bottomRef.current.scrollIntoView({ behavior: 'instant' });
  }, [messages, isChatRoomBottom]);

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

  const handleChatRoomScrollToBottom = () => {
    if (!bottomRef.current) {
      return;
    }

    bottomRef.current.scrollIntoView({ behavior: 'instant' });
  };

  const handleToggleChatRoom = () => {
    setIsChatRoomExpanded((prev) => !prev);
  };

  return (
    <>
      {!isChatRoomExpanded
        ? (
          <div className={chatRoomStyle.expandIconWrapper}>
            <button
              type="button"
              title="채팅방 보이기"
              aria-label="채팅방 보이기"
              onClick={handleToggleChatRoom}
            >
              <ChatBubbleIcon className={chatRoomStyle.expandIcon} />
            </button>
          </div>
        )
        : null}
      <div className={`${chatRoomStyle.container} ${!isChatRoomExpanded ? chatRoomStyle.hidden : ''}`}>
        {!isChatRoomConnected
          ? <div className={chatRoomStyle.chatRoomConnecting}>채팅방 연결중...</div>
          : (
            <>
              <div className={chatRoomStyle.titleWrapper}>
                <button
                  type="button"
                  title="채팅방 숨기기"
                  aria-label="채팅방 숨기기"
                  onClick={handleToggleChatRoom}
                >
                  <Cross1Icon className={chatRoomStyle.foldIcon} />
                </button>
                <h2 className={chatRoomStyle.chatRoomTitle}>채팅</h2>
              </div>
              <ul
                ref={chatRoomRef}
                className={chatRoomStyle.chatRoom}
              >
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
                <li
                  key="bottom"
                  ref={bottomRef}
                  className={chatRoomStyle.bottom}
                />
              </ul>
              {!isChatRoomBottom
                ? (
                  <button
                    type="button"
                    onClick={handleChatRoomScrollToBottom}
                    title="채팅창 맨 아래로 스크롤"
                    aria-label="채팅창 맨 아래로 스크롤"
                  >
                    <ChevronDownIcon className={chatRoomStyle.toBottomIcon} />
                  </button>
                )
                : null}
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
    </>
  );
}
