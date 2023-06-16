/* eslint-disable react/no-children-prop */
"use client";
import { useChat, Message } from "ai/react";
import { BotIcon, User2Icon } from "lucide-react";
import classNames from "classnames";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useRef } from "react";

export default function Home() {
  const { messages, input, handleInputChange, handleSubmit, stop, isLoading } =
    useChat();
  const lastMessageRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex flex-col gap-6 w-full overflow-hidden">
      <ul className="flex flex-col gap-4 overflow-y-auto pb-28 -z-1 flex-wrap overflow-x-scroll md:max-w-screen-lg">
        {messages?.map((msg, index) => {
          return (
            <Message
              key={`${msg.role}:${index}`}
              content={msg.content}
              role={msg.role}
            />
          );
        })}
        <div ref={lastMessageRef}></div>
      </ul>
      <div className="fixed bottom-0 py-10 bg-white h-[150px] w-full right-0 left-0 z-20 flex justify-center items-end">
        {isLoading ? (
          <button
            type="button"
            className="absolute right-0 left-0 -top-4 bg-neutral-700 text-white w-[220px] mx-auto rounded text-sm py-2 px-3 hover:bg-neutral-800"
            onClick={stop}
          >
            Stop Generating
          </button>
        ) : null}
        <form onSubmit={handleSubmit}>
          <input
            className="form-input rounded shadow w-[1100px] h-14 px-3"
            placeholder="Send a message"
            value={input}
            onChange={handleInputChange}
          />
        </form>
      </div>
    </div>
  );
}

type MessageProps = Omit<Message, "id">;

function Message({ content, role }: MessageProps) {
  return (
    <li
      className={classNames(
        "font-mono text-black p-4 w-full flex items-start gap-4 rounded relative odd:bg-gray even:bg-white"
      )}
    >
      <div className="w-8">
        {role === "assistant" ? <BotIcon /> : <User2Icon />}
      </div>
      <p className="flex flex-wrap">
        {role === "assistant" ? (
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
            {content}
          </ReactMarkdown>
        ) : (
          content
        )}
      </p>
    </li>
  );
}
