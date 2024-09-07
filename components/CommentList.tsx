import React from 'react';
import Comment from './Comment';
import { Comment as CommentType } from '../lib/localDb';

interface CommentListProps {
  comments: CommentType[];
  currentUserId: string;
  upvotedComments: string[]; // Add this line to include upvotedComments
}

export default function CommentList({ comments, currentUserId, upvotedComments }: CommentListProps) {
  const topLevelComments = comments.filter(comment => !comment.parentId);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-white">Comments</h2>
        <span className="text-gray-400 text-sm">
          {comments.length} {comments.length === 1 ? 'comment' : 'comments'}
        </span>
      </div>
      <div className="space-y-6">
        {topLevelComments.map(comment => (
          <Comment 
            key={comment.id} 
            comment={comment} 
            allComments={comments} 
            currentUserId={currentUserId} 
            upvotedComments={upvotedComments} // Pass the upvotedComments prop to Comment
          />
        ))}
      </div>
    </div>
  );
}