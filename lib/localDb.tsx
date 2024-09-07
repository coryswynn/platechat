import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Comment {
  id: string;
  plateNumber: string;
  content: string;
  parentId: string | null;
  createdAt: Date;
  upvotes: number;
  userId: string;
  userName: string;
  upvotedBy: string[];
  sentiment?: 'positive' | 'negative' | 'neutral';
}

interface PlateVote {
  upvotes: number;
  downvotes: number;
  users: {
    [userId: string]: 'upvote' | 'downvote';
  };
}

interface LocalDbContextType {
  comments: Comment[];
  addComment: (comment: Omit<Comment, 'id' | 'createdAt'>) => void;
  updateComment: (id: string, content: string) => void;
  deleteComment: (id: string) => void;
  getCommentsByPlate: (plateNumber: string) => Comment[];
  upvoteComment: (id: string, userId: string) => void;
  downvoteComment: (id: string, userId: string) => void;
  getCommentsByUser: (userId: string) => Comment[];
  upvotedCommentsByUser: { [userId: string]: string[] };
  getPlateVote: (plateNumber: string, userId: string) => { upvotes: number; downvotes: number; userVote: 'upvote' | 'downvote' | null };
  updatePlateVote: (plateNumber: string, userId: string, type: 'upvote' | 'downvote') => void;
}

// Function to get the upvotes/downvotes for a specific plate number and track user vote
export const getPlateVote = (plateNumber: string, userId?: string) => {
  const savedPlateVotes = localStorage.getItem('plateVotes');
  const plateVotes = savedPlateVotes ? JSON.parse(savedPlateVotes) : {};
  const plateVote: PlateVote = plateVotes[plateNumber] || { upvotes: 0, downvotes: 0, users: {} };
  
  // Ensure userId is provided before trying to access userVote
  const userVote = userId ? plateVote.users[userId] || null : null;
  
  return {
    upvotes: plateVote.upvotes,
    downvotes: plateVote.downvotes,
    userVote,
  };
};

// Function to update the upvotes/downvotes and track user vote
export const updatePlateVote = (plateNumber: string, userId: string, type: 'upvote' | 'downvote') => {
  // Ensure that userId is defined
  if (!userId) {
    console.error('Error: userId is undefined');
    return;
  }

  const savedPlateVotes = localStorage.getItem('plateVotes');
  const plateVotes = savedPlateVotes ? JSON.parse(savedPlateVotes) : {};

  // Initialize currentVotes for the plate if it doesn't exist
  const currentVotes: PlateVote = plateVotes[plateNumber] || { upvotes: 0, downvotes: 0, users: {} };
  
  // Ensure users is an object (initialize if not present)
  currentVotes.users = currentVotes.users || {};

  const currentUserVote = currentVotes.users[userId]; // Get user's current vote

  if (currentUserVote === type) {
    // If the user is undoing their vote (voting the same type again), remove their vote
    if (type === 'upvote') {
      currentVotes.upvotes = Math.max(0, currentVotes.upvotes - 1);
    } else if (type === 'downvote') {
      currentVotes.downvotes = Math.max(0, currentVotes.downvotes - 1);
    }
    delete currentVotes.users[userId]; // Remove user's vote record
  } else {
    // If the user is switching votes or voting for the first time
    if (currentUserVote === 'upvote') {
      currentVotes.upvotes = Math.max(0, currentVotes.upvotes - 1); // Undo the previous upvote
    } else if (currentUserVote === 'downvote') {
      currentVotes.downvotes = Math.max(0, currentVotes.downvotes - 1); // Undo the previous downvote
    }

    // Apply the new vote
    if (type === 'upvote') {
      currentVotes.upvotes += 1;
    } else if (type === 'downvote') {
      currentVotes.downvotes += 1;
    }

    currentVotes.users[userId] = type; // Store the user's vote type
  }

  plateVotes[plateNumber] = currentVotes;
  localStorage.setItem('plateVotes', JSON.stringify(plateVotes)); // Save updated votes to localStorage
};

const LocalDbContext = createContext<LocalDbContextType | undefined>(undefined);

export function LocalDbProvider({ children }: { children: React.ReactNode }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [upvotedCommentsByUser, setUpvotedCommentsByUser] = useState<{ [userId: string]: string[] }>({});
  
  useEffect(() => {
    const savedComments = localStorage.getItem('comments');
    const savedUpvotes = localStorage.getItem('upvotedCommentsByUser');
    
    if (savedComments) {
      setComments(JSON.parse(savedComments));
    }
    if (savedUpvotes) {
      setUpvotedCommentsByUser(JSON.parse(savedUpvotes));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('comments', JSON.stringify(comments));
    localStorage.setItem('upvotedCommentsByUser', JSON.stringify(upvotedCommentsByUser));
  }, [comments, upvotedCommentsByUser]);

  const addComment = async (comment: Omit<Comment, 'id' | 'createdAt' | 'sentiment'>) => {
    const newComment: Comment = {
      ...comment,
      id: Date.now().toString(),
      createdAt: new Date(),
      upvotes: 0,
      upvotedBy: [],
    };
    setComments(prevComments => [...prevComments, newComment]);
  };

  const updateComment = async (id: string, content: string) => {
    setComments(prevComments =>
      prevComments.map(comment =>
        comment.id === id ? { ...comment, content } : comment
      )
    );
  };

  const deleteComment = (id: string) => {
    setComments(prevComments => prevComments.filter(comment => comment.id !== id));
  };

  const getCommentsByPlate = (plateNumber: string) => {
    return comments.filter(comment => comment.plateNumber === plateNumber);
  };

  const getCommentsByUser = (userId: string) => {
    return comments.filter(comment => comment.userId === userId);
  };

  const upvoteComment = (id: string, userId: string) => {
    setComments(prevComments =>
      prevComments.map(comment =>
        comment.id === id
          ? {
              ...comment,
              upvotes: comment.upvotes + 1,
              upvotedBy: Array.from(new Set([...(comment.upvotedBy || []), userId])),
            }
          : comment
      )
    );
    setUpvotedCommentsByUser(prev => ({
      ...prev,
      [userId]: Array.from(new Set([...(prev[userId] || []), id])),
    }));
  };

  const downvoteComment = (id: string, userId: string) => {
    setComments(prevComments =>
      prevComments.map(comment =>
        comment.id === id
          ? {
              ...comment,
              upvotes: Math.max(0, comment.upvotes - 1),
              upvotedBy: comment.upvotedBy.filter(upvoter => upvoter !== userId),
            }
          : comment
      )
    );
    setUpvotedCommentsByUser(prev => ({
      ...prev,
      [userId]: (prev[userId] || []).filter(upvotedId => upvotedId !== id),
    }));
  };

  return (
    <LocalDbContext.Provider
      value={{
        comments,
        addComment,
        updateComment,
        deleteComment,
        getCommentsByPlate,
        upvoteComment,
        downvoteComment,
        getCommentsByUser,
        upvotedCommentsByUser,
        getPlateVote,    // Added to provider
        updatePlateVote, // Added to provider
      }}
    >
      {children}
    </LocalDbContext.Provider>
  );
}

export function useLocalDb() {
  const context = useContext(LocalDbContext);
  if (context === undefined) {
    throw new Error('useLocalDb must be used within a LocalDbProvider');
  }
  return context;
}