import React, { useState } from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import Header from '../../components/Header';
import { useLocalDb, Comment, getCommentsByUser } from '../../lib/localDb'; // Ensure getCommentsByUser is imported
import Link from 'next/link';
import { useAuth } from '../../lib/useAuth';

interface UserCommentsPageProps {
  initialComments: Comment[];
  userId: string;
}

export default function UserCommentsPage({ initialComments, userId }: UserCommentsPageProps) {
  const { upvoteComment, downvoteComment, upvotedCommentsByUser } = useLocalDb();
  const { user } = useAuth();
  const currentUserId = user ? user.id : '';
  const [comments, setComments] = useState<Comment[]>(initialComments);

  // Get upvoted comment IDs from global state for the current user
  const upvotedCommentIds = upvotedCommentsByUser[currentUserId] || [];

  const handleVoteToggle = async (commentId: string) => {
    const hasUpvoted = upvotedCommentIds.includes(commentId);

    if (hasUpvoted) {
      await downvoteComment(commentId, currentUserId);
    } else {
      await upvoteComment(commentId, currentUserId);
    }

    // Refetch comments to reflect updated vote counts
    const updatedComments = await getCommentsByUser(userId);
    setComments(updatedComments);
  };

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-white">User Comments</h1>
          <span className="text-gray-400 text-lg">{comments.length} comments</span>
        </div>
        <div className="space-y-4">
          {comments.map((comment) => {
            const hasUpvoted = upvotedCommentIds.includes(comment.id);

            return (
              <div key={comment.id} className="bg-gray-800 rounded-lg p-4 flex space-x-4">
                {/* Upvote button and count */}
                <div className="flex flex-col items-center justify-start">
                  <button
                    onClick={() => handleVoteToggle(comment.id)}
                    className={`flex flex-col items-center hover:text-yellow-400 ${
                      hasUpvoted ? 'text-yellow-400' : 'text-blue-400'
                    }`}
                  >
                    <svg
                      className={`w-6 h-6 ${hasUpvoted ? 'text-yellow-400' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                    <span className={`text-sm ${hasUpvoted ? 'text-yellow-400' : 'text-white'}`}>
                      {comment.upvotes || 0}
                    </span>
                  </button>
                </div>
                <div className="flex-grow">
                  <Link href={`/plates/${comment.plateNumber}`} className="text-blue-400 hover:underline">
                    License Plate: {comment.plateNumber}
                  </Link>
                  <p className="text-white mt-2">{comment.content}</p>
                  <p className="text-gray-400 text-sm mt-1">Posted on: {new Date(comment.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}

// Define static paths for users at build time
export const getStaticPaths: GetStaticPaths = async () => {
  const paths: { params: { userId: string } }[] = [];

  return {
    paths,
    fallback: 'blocking',
  };
};

// Fetch user-specific comments during build
export const getStaticProps: GetStaticProps = async (context) => {
  const { userId } = context.params!;

  const comments = await getCommentsByUser(userId as string);

  // Convert `createdAt` field to string for JSON serialization
  const initialComments = comments.map((comment: Comment) => ({
    ...comment,
    createdAt: comment.createdAt.toString(),
  }));

  return {
    props: {
      initialComments,
      userId,
    },
    revalidate: 10, // Revalidate the data every 10 seconds
  };
};