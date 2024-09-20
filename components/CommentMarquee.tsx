import { cn } from "lib/utils";
import Marquee from "@/components/magicui/marquee";
import { useLocalDb, Comment as CommentType } from "../lib/localDb";
import React, { useEffect, useState } from "react";

// Component to display individual comments
export const CommentCard = ({
  plateNumber,
  username,
  body,
}: {
  plateNumber: string;
  username: string;
  body: string;
}) => {
  return (
    <figure
      className={cn(
        "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "white-200/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img
          className="rounded-full"
          width="32"
          height="32"
          alt=""
          src={`https://avatar.vercel.sh/${username}`} // Placeholder image
        />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {plateNumber} {/* Display plate number as the "name" */}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  );
};

export function LatestCommentsMarquee() {
  const { getLatestComments } = useLocalDb(); // Function to get the latest comments
  const [comments, setComments] = useState<CommentType[]>([]);

  useEffect(() => {
    const fetchComments = async () => {
      const fetchedComments = await getLatestComments(); // Fetch latest comments
      setComments(fetchedComments);
    };
    fetchComments();
  }, []);

  const firstRow = comments.length > 1 ? comments.slice(0, comments.length / 2) : comments;
  const secondRow = comments.length > 1 ? comments.slice(comments.length / 2) : comments;

  return (
    <div className="relative flex h-[400px] w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-background md:shadow-xl">
      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((comment) => (
          <CommentCard
            key={comment.id}
            plateNumber={comment.plateNumber}  // Pass plateNumber as "name"
            username={comment.userName}
            body={comment.content}
          />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:20s]">
        {secondRow.map((comment) => (
          <CommentCard
            key={comment.id}
            plateNumber={comment.plateNumber}  // Pass plateNumber as "name"
            username={comment.userName}
            body={comment.content}
          />
        ))}
      </Marquee>
    </div>
  );
}