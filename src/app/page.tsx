/* eslint-disable react/no-children-prop */
"use client";
import {
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";
import { BotIcon, User2Icon } from "lucide-react";
import classNames from "classnames";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";

type Message = {
  index: number;
  role: "human" | "ai";
  message: string;
};

export default function Home() {
  const [, startTransition] = useTransition();
  const [userMessage, setUserMessage] = useState("");
  const [aiMessage, setAIMessage] = useState<Message | undefined>(undefined);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const readerRef = useRef<ReadableStreamDefaultReader>();

  const lastMessageRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    if (aiMessage) {
      const aiIndex = messages.findIndex(
        (msg) => msg.index === aiMessage.index
      );
      if (aiIndex > -1) {
        const updatedMessages = [...messages].map((msg) => {
          if (msg.index === aiMessage.index) {
            return {
              ...msg,
              message: msg.message + aiMessage.message,
            };
          }
          return msg;
        });
        // console.log("updatedMessages:", updatedMessages);
        setMessages(updatedMessages);
      } else {
        setMessages([...messages, aiMessage]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [aiMessage]);

  const handleSubmit = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter") {
      startTransition(() => {
        setMessages([
          ...messages,
          { index: messages.length + 1, role: "human", message: userMessage },
        ]);
        setUserMessage("");
        setIsGenerating(true);
      });

      const res = await fetch("/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: userMessage,
        }),
      });

      const reader = res.body!.getReader();
      readerRef.current = reader;
      const decoder = new TextDecoder("utf-8");

      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          setIsGenerating(false);
          setAIMessage(undefined);
          break;
        }
        const decodedValue = decoder.decode(value);

        let newAIMessage = undefined;

        if (aiMessage) {
          newAIMessage = {
            ...aiMessage,
            message: aiMessage.message + decodedValue,
          };
        } else {
          newAIMessage = {
            index: messages.length + 2,
            role: "ai",
            message: decodedValue,
          };
        }
        console.log("aiMessage:", newAIMessage);
        setAIMessage(newAIMessage as Message);
      }
    }
  };

  const handleAbort = () => {
    setIsGenerating(false);
    readerRef.current?.cancel();
  };

  return (
    <div className="flex flex-col gap-6 w-full overflow-hidden">
      <div>
        <h3 className="font-bold text-neutral-700">Conversation</h3>
      </div>
      <ul className="flex flex-col gap-4 overflow-y-auto pb-28 -z-1 flex-wrap overflow-x-hidden">
        {messages?.map((msg, index) => {
          return (
            <Message
              key={`${msg.role}:${index}`}
              message={msg.message}
              role={msg.role}
            />
          );
        })}
        <div ref={lastMessageRef}></div>
      </ul>
      <div className="fixed bottom-0 py-10 bg-white h-[150px] w-full right-0 left-0 z-20 flex justify-center items-end">
        {isGenerating ? (
          <button
            type="button"
            className="absolute right-0 left-0 -top-4 bg-neutral-700 text-white w-[220px] mx-auto rounded text-sm py-2 px-3 hover:bg-neutral-800"
            onClick={handleAbort}
          >
            Stop Generating
          </button>
        ) : null}
        <input
          className="form-input rounded shadow w-[1100px] h-14 px-3"
          placeholder="Send a message"
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          //@ts-ignore
          onKeyDown={handleSubmit}
        />
      </div>
    </div>
  );
}

type MessageProps = {
  message: string;
  role: "human" | "ai";
};

function Message({ message, role }: MessageProps) {
  return (
    <li
      className={classNames(
        "font-mono text-black p-4 w-full flex items-center gap-4 rounded relative odd:bg-gray even:bg-white"
      )}
    >
      <div className="w-8">{role === "ai" ? <BotIcon /> : <User2Icon />}</div>
      <p className="flex flex-wrap">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          className="flex flex-col gap-2"
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              return !inline && match ? (
                <SyntaxHighlighter
                  {...props}
                  children={String(children).replace(/\n$/, "")}
                  style={dark}
                  language={match[1]}
                  PreTag="section"
                />
              ) : (
                <code {...props} className={className}>
                  {children}
                </code>
              );
            },
          }}
        >
          {message}
        </ReactMarkdown>
      </p>
    </li>
  );
}
