import React, { useState } from 'react';
import { useLocalDb, Comment } from '../lib/localDb';
import { auth } from '../lib/firebaseConfig'; // Import Firebase Auth to get current user info

interface CommentFormProps {
  plateNumber: string;
  parentId?: string;
  onSubmit?: () => void;
  currentUserId: string;
}

export default function CommentForm({ plateNumber, parentId, onSubmit, currentUserId }: CommentFormProps) {
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAnonymous, setIsAnonymous] = useState(false); // State to handle anonymous toggle
  const { addComment } = useLocalDb();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim() && !isSubmitting) {
      setIsSubmitting(true);

      // Get user displayName from Firebase Auth if not posting anonymously
      const currentUser = auth.currentUser;
      const userId = isAnonymous ? 'anonymous' : currentUserId;
      const userName = isAnonymous ? 'Anonymous' : currentUser?.displayName || 'User'; // Get user's displayName or fall back to 'User'

      // Add createdAt field with the current timestamp as a Date object
      const createdAt = new Date(); // Ensure createdAt is a Date object

      await addComment({
        plateNumber,
        content: comment,
        parentId: parentId || null,
        userId,
        userName,
        upvotes: 0,
        upvotedBy: [],
      });

      setComment('');
      setIsSubmitting(false);
      if (onSubmit) {
        onSubmit();
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
        placeholder="Add a comment..."
        disabled={isSubmitting}
      />
      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="anonymous-toggle"
            checked={isAnonymous}
            onChange={() => setIsAnonymous(!isAnonymous)}
            className="form-checkbox h-4 w-4 text-blue-600 transition duration-300"
          />
          <label htmlFor="anonymous-toggle" className="ml-2 text-white">
            Post as Anonymous
          </label>
        </div>
        <button 
          type="submit" 
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 disabled:opacity-50"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </div>
    </form>
  );
}