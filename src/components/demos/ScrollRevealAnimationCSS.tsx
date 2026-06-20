import { useEffect, useRef, useState } from 'react';

function StarFilledIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M7.5 0.5L9.67376 4.9048L14.5306 5.6103L11.0153 9.0352L11.8451 13.8897L7.5 11.6L3.15494 13.8897L3.98471 9.0352L0.469424 5.6103L5.32624 4.9048L7.5 0.5Z" />
    </svg>
  );
}

const MOCK_FOLLOWERS = [
  { id: 1, name: "dingyi", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop", randomStar: 71 },
  { id: 2, name: "joshbowen", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop", randomStar: 49 },
  { id: 3, name: "LewisW", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop", randomStar: 60 },
  { id: 4, name: "dlo", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop", randomStar: 71 },
  { id: 5, name: "zholmquist", avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop", randomStar: 11 },
  { id: 6, name: "esin", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop", randomStar: 60 },
  { id: 7, name: "mikefey", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop", randomStar: 50 },
  { id: 8, name: "ichik", avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&auto=format&fit=crop", randomStar: 16 },
  { id: 9, name: "gijigae", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop", randomStar: 21 },
  { id: 10, name: "nvie", avatar: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=100&auto=format&fit=crop", randomStar: 90 },
];

export default function ScrollRevealAnimationCSS() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [githubFollower, setGithubFollower] = useState<
    {
      id: number;
      name: string;
      avatar: string;
      randomStar: number;
    }[]
  >(MOCK_FOLLOWERS);

  useEffect(() => {
    const fetchLast20GithubFollowers = async () => {
      try {
        const response = await fetch(
          'https://api.github.com/users/ibelick/followers'
        );
        if (!response.ok) return;
        const data = await response.json();

        const newGithubFollowers = data
          .map((follower: any) => {
            return {
              id: follower.id,
              name: follower.login,
              avatar: follower.avatar_url,
              randomStar: Math.floor(Math.random() * 90) + 10,
            };
          })
          .slice(0, 20);

        if (newGithubFollowers && newGithubFollowers.length > 0) {
          setGithubFollower(newGithubFollowers);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchLast20GithubFollowers();
  }, []);

  return (
    <>
      <div
        className="h-[280px] w-full overflow-y-scroll p-4 rounded-xl border border-neutral-200/50 dark:border-white/5 bg-neutral-50 dark:bg-zinc-900/10 no-scrollbar select-none"
        ref={containerRef}
      >
        <span className="text-[10px] font-mono text-neutral-400 dark:text-neutral-500 block text-center mb-3">
          Scroll down to see reveal animation
        </span>
        <ul className="flex w-full flex-col space-y-2 pb-[10%]">
          {githubFollower?.map((item) => {
            return (
              <li
                key={item.id}
                className="scroll-reveal-item flex items-center justify-between rounded-xl bg-white dark:bg-zinc-900 px-3 py-2.5 border border-neutral-100 dark:border-white/5 shadow-xs"
              >
                <div className="flex items-center">
                  <img
                    src={item.avatar}
                    alt="Avatar"
                    className="h-8 w-8 rounded-full object-cover border border-neutral-200 dark:border-neutral-800"
                  />
                  <span className="ml-3.5 text-sm font-semibold text-neutral-800 dark:text-neutral-200">
                    {item.name}
                  </span>
                </div>
                <div className="flex items-center text-yellow-500">
                  <StarFilledIcon className="h-4 w-4 mr-1" />
                  <span className="text-xs font-mono font-bold text-neutral-500 dark:text-neutral-450">
                    {item.randomStar}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <style>{`
        @keyframes appear {
          from {
            filter: blur(2px);
            opacity: 0.2;
            transform: scale(0.95) translateY(10px);
          }
          to {
            opacity: 1;
            filter: blur(0);
            transform: scale(1) translateY(0);
          }
        }

        .scroll-reveal-item {
          animation: appear linear both;
          animation-timeline: view();
          animation-range: entry cover 20%;
        }
      `}</style>
    </>
  );
}
