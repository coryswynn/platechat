import React, { useState } from 'react';
import Link from 'next/link';
import { useLocalDb, Comment as CommentType } from '../lib/localDb';
import CommentForm from './CommentForm';

interface CommentProps {
  comment: CommentType;
  allComments: CommentType[];
  currentUserId: string;
  upvotedComments: string[]; // Includes upvotedComments for determining the upvote state
}

export default function Comment({ comment, allComments, currentUserId, upvotedComments }: CommentProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const { updateComment, deleteComment, upvoteComment, downvoteComment } = useLocalDb();

  // Determine if the user has upvoted the comment
  const hasUpvoted = upvotedComments.includes(comment.id);

  const handleEdit = async () => {
    updateComment(comment.id, editedContent);
    setIsEditing(false);
  };

  const handleDelete = async () => {
    deleteComment(comment.id);
  };

  const handleReplySubmit = () => {
    setShowReplyForm(false);
  };

  const handleVote = () => {
    if (!hasUpvoted) {
      upvoteComment(comment.id, currentUserId);
    } else {
      downvoteComment(comment.id, currentUserId);
    }
  };

  const childComments = allComments.filter(c => c.parentId === comment.id);
  const isOwnComment = currentUserId !== '' && comment.userId === currentUserId;

  return (
    <div className="flex space-x-4">
      <div className="flex flex-col items-center">
        <button 
          onClick={handleVote} 
          className={`hover:text-yellow-400 flex flex-col items-center ${hasUpvoted ? 'text-yellow-400' : 'text-blue-400'}`}
        >
          <svg className={`w-6 h-6 ${hasUpvoted ? 'text-yellow-400' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
          <span className={`text-sm ${hasUpvoted ? 'text-yellow-400' : 'text-blue-400'}`}>{comment.upvotes || 0}</span>
        </button>
      </div>
      <div className="flex-grow bg-gray-800 rounded-lg p-4">
        <div className="flex items-start gap-4 mb-4">
          <Link href={comment.userId ? `/user/${comment.userId}` : '/anonymous-comments'} className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
            {comment.userName ? comment.userName[0].toUpperCase() : 'A'}
          </Link>
          <div className="flex-grow">
            <div className="flex justify-between items-center mb-2">
              <div>
                <Link href={comment.userId ? `/user/${comment.userId}` : '/anonymous-comments'} className="font-medium text-white hover:underline">
                  {comment.userName || 'Anonymous'}
                </Link>
                <span className="text-sm text-gray-400 ml-2">{new Date(comment.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
            {isEditing ? (
              <textarea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-2 text-white"
              />
            ) : (
              <p className="text-gray-200 mb-4">{comment.content}</p>
            )}
            <div className="flex space-x-4 text-sm">
              <button onClick={() => setShowReplyForm(!showReplyForm)} className="text-blue-400 hover:text-blue-300">Reply</button>
              {isOwnComment && (
                <>
                  {isEditing ? (
                    <>
                      <button onClick={handleEdit} className="text-green-400 hover:text-green-300">Save</button>
                      <button onClick={() => setIsEditing(false)} className="text-gray-400 hover:text-gray-300">Cancel</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => setIsEditing(true)} className="text-yellow-400 hover:text-yellow-300">Edit</button>
                      <button onClick={handleDelete} className="text-red-400 hover:text-red-300">Delete</button>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
        {showReplyForm && (
          <div className="mt-4">
            <CommentForm plateNumber={comment.plateNumber} parentId={comment.id} onSubmit={handleReplySubmit} currentUserId={currentUserId} />
          </div>
        )}
        {childComments.length > 0 && (
          <div className="mt-4 space-y-4">
            {childComments.map(childComment => (
              <Comment key={childComment.id} comment={childComment} allComments={allComments} currentUserId={currentUserId} upvotedComments={upvotedComments} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}