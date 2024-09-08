import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Header from '../../components/Header';
import CommentForm from '../../components/CommentForm';
import CommentList from '../../components/CommentList';
import { useLocalDb, Comment } from '../../lib/localDb';
import { useAuth } from '../../lib/useAuth';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa'; // Import react-icons
import { getPlateVote, updatePlateVote } from '../../lib/localDb'; // Assuming you have localDb handling the voting
import { Button } from '../../components/button'; // Ensure you have a Button component

export default function PlatePage() {
  const router = useRouter();
  const { plateNumber } = router.query;
  const { getCommentsByPlate, comments: allComments, upvotedCommentsByUser } = useLocalDb();
  const [comments, setComments] = useState<Comment[]>([]);
  const { user } = useAuth();
  const [overallSentiment, setOverallSentiment] = useState<'positive' | 'negative' | 'neutral'>('neutral');

  // Voting states
  const [upvotes, setUpvotes] = useState(0);
  const [downvotes, setDownvotes] = useState(0);
  const [userVote, setUserVote] = useState<'upvote' | 'downvote' | null>(null); // Track user vote

  const calculateOverallSentiment = (upvotes: number, downvotes: number) => {
    if (upvotes > downvotes) {
      return 'positive';
    } else if (downvotes > upvotes) {
      return 'negative';
    } else {
      return 'neutral';
    }
  };

  useEffect(() => {
    if (plateNumber && typeof plateNumber === 'string' && user?.id) {
      const plateComments = getCommentsByPlate(plateNumber);
      setComments(plateComments);

      // Get initial vote counts and user vote
      const { upvotes, downvotes, userVote } = getPlateVote(plateNumber, user.id);
      setUpvotes(upvotes);
      setDownvotes(downvotes);
      setUserVote(userVote);

      // Calculate overall sentiment based on votes
      const newSentiment = calculateOverallSentiment(upvotes, downvotes);
      setOverallSentiment(newSentiment);
    }
  }, [plateNumber, getCommentsByPlate, allComments, user?.id]);

  const handleUpvote = () => {
    if (!user?.id) return; // User must be logged in

    const newVote = userVote === 'upvote' ? null : 'upvote'; // Toggle vote
    updatePlateVote(plateNumber as string, user.id, 'upvote');
    setUserVote(newVote); // Update user vote state
    setUpvotes(upvotes + (newVote === 'upvote' ? 1 : -1)); // Adjust upvotes
    if (userVote === 'downvote') {
      setDownvotes(downvotes - 1); // Undo downvote if switching vote
    }

    // Recalculate overall sentiment based on new votes
    const newSentiment = calculateOverallSentiment(upvotes + (newVote === 'upvote' ? 1 : -1), downvotes - (userVote === 'downvote' ? 1 : 0));
    setOverallSentiment(newSentiment);
  };

  const handleDownvote = () => {
    if (!user?.id) return; // User must be logged in

    const newVote = userVote === 'downvote' ? null : 'downvote'; // Toggle vote
    updatePlateVote(plateNumber as string, user.id, 'downvote');
    setUserVote(newVote); // Update user vote state
    setDownvotes(downvotes + (newVote === 'downvote' ? 1 : -1)); // Adjust downvotes
    if (userVote === 'upvote') {
      setUpvotes(upvotes - 1); // Undo upvote if switching vote
    }

    // Recalculate overall sentiment based on new votes
    const newSentiment = calculateOverallSentiment(upvotes - (userVote === 'upvote' ? 1 : 0), downvotes + (newVote === 'downvote' ? 1 : -1));
    setOverallSentiment(newSentiment);
  };

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center w-full py-12 md:py-24">
        <div className="container px-4 md:px-6 max-w-7xl mx-auto">
          <div className="flex flex-col items-center justify-center text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500 mb-4">
              License Plate: {plateNumber}
            </h1>
            <div className="flex items-center justify-center p-4 mb-4">
              <div className={`rounded-full px-4 py-2 text-white ${overallSentiment === 'positive' ? 'bg-green-500' : overallSentiment === 'negative' ? 'bg-red-500' : 'bg-gray-500'}`}>
                {overallSentiment === 'positive' ? '👍' : overallSentiment === 'negative' ? '👎' : '😐'} {overallSentiment === 'positive' ? 'Great driver!' : overallSentiment === 'negative' ? 'Watch out!' : 'Neutral'}
              </div>
            </div>

            <div className="flex items-center justify-center space-x-4 mb-4">
              {/* Upvote Button */}
              <Button
                variant="ghost"
                className={`text-green-500 hover:text-green-400 hover:bg-green-500/10 ${userVote === 'upvote' ? 'bg-green-500/10' : ''}`}
                onClick={handleUpvote}
              >
                <FaThumbsUp className="mr-2 h-6 w-6" />
                <span className="text-xl font-semibold">{upvotes}</span>
              </Button>

              {/* Downvote Button */}
              <Button
                variant="ghost"
                className={`text-red-500 hover:text-red-400 hover:bg-red-500/10 ${userVote === 'downvote' ? 'bg-red-500/10' : ''}`}
                onClick={handleDownvote}
              >
                <FaThumbsDown className="mr-2 h-6 w-6" />
                <span className="text-xl font-semibold">{downvotes}</span>
              </Button>
            </div>
          </div>

          {/* Comment Section */}
          <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="p-6 md:p-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-white text-2xl">Comments</h2>
              </div>
              {user ? (
                <CommentForm plateNumber={plateNumber as string} currentUserId={user.id} />
              ) : (
                <p className="text-white mb-4">Please sign in to leave a comment.</p>
              )}
              <CommentList 
                comments={comments} 
                currentUserId={user?.id || ''} 
                upvotedComments={upvotedCommentsByUser[user?.id || ''] || []}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}