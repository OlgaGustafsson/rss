"use client";

import React, { useEffect, useState } from "react";
import { RSS, RSSItem } from "../../interface";
import { formatDate } from "@/utils/formatDate";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Image from "next/image";

const RSSReader: React.FC = () => {
  const [feed, setFeed] = useState<RSS | null>(null);
  
  useEffect(() => {
    const fetchDataAndSetFeed = async () => {
      try {
        const res = await fetch("/api/news");
        const rssFeed = await res.json();
        if (rssFeed) {
          setFeed(rssFeed);
        }
      } catch (error) {
        console.error("Error fetching RSS feed:", error);
      }
    };
    fetchDataAndSetFeed();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="">
        {feed ? (
          <div>
            <h2 className="pt-4 pb-2 pl-4 text-2xl">{feed.channel.title}</h2>
            <ul className="overflow-y-auto max-h-screen w-auto pl-4 pr-4">
              {feed.channel.items.map((item: RSSItem) => (
                <li className="pb-6" key={item.guid}>
                  <a
                    className="text-4xl font-bold text-stone-600"
                    href={item.link}
                  >
                    {item.imageUrl && (
                      <Image
                        className="pb-4 pr-4"
                        src={item.imageUrl}
                        alt={"image"}
                        width={1025}
                        height={60}
                        priority={true}
                        layout={"responsive"}
                      />
                    )}
                    {item.title}
                  </a>
                  <p className="text-stone-400 pt-2">{item.description}...</p>
                  <p className="text-xs text-bold text-stone-400 pt-2 pb-4">
                    Publicerad {formatDate(item.pubDate)}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="pt-40 text-5xl">
            <AiOutlineLoading3Quarters />
          </p>
        )}
      </div>
    </main>
  );
};

export default RSSReader;