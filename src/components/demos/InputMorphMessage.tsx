import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

const transitionDebug = {
  type: 'easeOut',
  duration: 0.2,
};

function PlusIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" />
    </svg>
  );
}

export default function InputMorphMessage() {
  const [messages, setMessages] = useState<
    {
      id: number;
      text: string;
    }[]
  >([]);
  const [newMessage, setNewMessage] = useState<string>('');

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (newMessage.trim()) {
      const timestamp = new Date().getTime();
      setMessages([...messages, { id: timestamp, text: newMessage }]);
      setNewMessage('');
    }
  };

  return (
    <div className="flex h-[300px] w-full max-w-[320px] flex-col items-end justify-end pb-4 font-sans select-none">
      <div className="flex-grow w-full overflow-y-auto no-scrollbar flex flex-col justify-end">
        <AnimatePresence mode="wait">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              layout="position"
              className="z-10 mt-2 max-w-[250px] rounded-2xl bg-gray-200 dark:bg-[#1c1c1e] self-end break-all"
              layoutId={`container-[${messages.length - 1}]`}
              transition={transitionDebug}
            >
              <div className="px-3.5 py-2 text-[14px] leading-tight text-gray-900 dark:text-gray-100">
                {message.text}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <div className="mt-4 flex w-full relative">
        <form onSubmit={handleSubmit} className="flex w-full items-center relative">
          <input
            type="text"
            onChange={(e) => setNewMessage(e.target.value)}
            value={newMessage}
            className="relative h-9 grow rounded-full border border-gray-200 bg-white px-4.5 text-[14px] outline-none placeholder:text-gray-400 focus-visible:ring-0 focus-visible:ring-blue-500/20 dark:border-white/10 dark:bg-[#1c1c1e] dark:text-gray-50 dark:placeholder-gray-500 dark:focus-visible:ring-blue-500/20"
            placeholder="Type your message"
          />
          <motion.div
            key={messages.length}
            layout="position"
            className="pointer-events-none absolute left-0 top-0 z-10 flex h-9 w-[calc(100%-44px)] items-center overflow-hidden rounded-full bg-gray-200 dark:bg-[#1c1c1e] break-all"
            layoutId={`container-[${messages.length}]`}
            transition={transitionDebug}
            initial={{ opacity: 0.6, zIndex: -1 }}
            animate={{ opacity: 0.6, zIndex: -1 }}
            exit={{ opacity: 1, zIndex: 1 }}
          >
            <div className="px-4.5 py-2 text-[14px] leading-tight text-gray-900 dark:text-gray-50">
              {newMessage}
            </div>
          </motion.div>
          <button
            type="submit"
            className="ml-2 flex h-9 w-9 items-center justify-center rounded-full bg-gray-200 dark:bg-[#1c1c1e] text-neutral-800 dark:text-white transition-transform active:scale-90 shrink-0 cursor-pointer"
          >
            <PlusIcon className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
