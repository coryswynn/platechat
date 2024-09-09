import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import CommentForm from '../../components/CommentForm';
import CommentList from '../../components/CommentList';
import { useLocalDb, Comment } from '../../lib/localDb';
import { useAuth } from '../../lib/useAuth';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import { Button } from '../../components/button';

export default function PlatePage({ plateNumber }: { plateNumber: string }) {
  const { getCommentsByPlate, getPlateVote, updatePlateVote, upvotedCommentsByUser } = useLocalDb();
  const [comments, setComments] = useState<Comment[]>([]);
  const { user } = useAuth();
  const [overallSentiment, setOverallSentiment] = useState<'good driver' | 'all good' | 'watch out'>('all good');

  // Voting states
  const [upvotes, setUpvotes] = useState(0);
  const [downvotes, setDownvotes] = useState(0);
  const [userVote, setUserVote] = useState<'upvote' | 'downvote' | null>(null);

  const calculateOverallSentiment = (upvotes: number, downvotes: number) => {
    if (upvotes > downvotes) {
      return 'good driver';
    } else if (downvotes > upvotes) {
      return 'watch out';
    } else {
      return 'all good';
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (plateNumber) {
        try {
          // Fetch comments related to the license plate
          const plateComments = await getCommentsByPlate(plateNumber);
          setComments(plateComments);
  
          // Fetch plate vote data
          const plateVote = await getPlateVote(plateNumber as string, user?.id || '');
          const { upvotes, downvotes, users } = plateVote;
  
          // Set overall votes
          setUpvotes(upvotes);
          setDownvotes(downvotes);
  
          // If user exists, set the user's vote
          if (user?.id) {
            setUserVote(users[user.id] || null);
          }
  
          // Calculate overall sentiment
          const sentiment = calculateOverallSentiment(upvotes, downvotes);
          setOverallSentiment(sentiment);
        } catch (error) {
          console.error('Error fetching plate data:', error);
        }
      }
    };
  
    fetchData();
  }, [plateNumber, getCommentsByPlate, user?.id]);

  const handleUpvote = async () => {
    if (!user?.id) return;

    const newVote = userVote === 'upvote' ? null : 'upvote';
    await updatePlateVote(plateNumber as string, user.id, 'upvote');
    setUserVote(newVote);

    setUpvotes(upvotes + (newVote === 'upvote' ? 1 : -1));
    if (userVote === 'downvote') setDownvotes(downvotes - 1);

    const newSentiment = calculateOverallSentiment(upvotes + (newVote === 'upvote' ? 1 : -1), downvotes - (userVote === 'downvote' ? 1 : 0));
    setOverallSentiment(newSentiment);
  };

  const handleDownvote = async () => {
    if (!user?.id) return;

    const newVote = userVote === 'downvote' ? null : 'downvote';
    await updatePlateVote(plateNumber as string, user.id, 'downvote');
    setUserVote(newVote);

    setDownvotes(downvotes + (newVote === 'downvote' ? 1 : -1));
    if (userVote === 'upvote') setUpvotes(upvotes - 1);

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
              <div className={`rounded-full px-4 py-2 text-white ${overallSentiment === 'good driver' ? 'bg-green-500' : overallSentiment === 'watch out' ? 'bg-red-500' : 'bg-gray-500'}`}>
                {overallSentiment === 'good driver' ? '👍 ' : overallSentiment === 'watch out' ? '👎 ' : '😐 '} 
                {overallSentiment === 'good driver' ? 'Good Driver' : overallSentiment === 'watch out' ? 'Watch Out!' : 'Jury is out'}
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

// Generate paths at build time for all possible plate numbers
export const getStaticPaths: GetStaticPaths = async () => {
  // Explicitly define the type of `paths` as an array of objects with `params` containing `plateNumber`
  const paths: { params: { plateNumber: string } }[] = []; // You can fetch actual plate numbers from an API or DB

  return {
    paths,
    fallback: 'blocking', // You can use 'blocking' to wait for the content to be generated
  };
};

// Fetch plate-specific data during build
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const plateNumber = params?.plateNumber as string;

  // Pass the plateNumber as a prop to the component
  return {
    props: {
      plateNumber,
    },
    revalidate: 10, // Revalidate the data every 10 seconds
  };
};