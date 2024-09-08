import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../lib/firebaseConfig'; // Import Firebase Firestore config
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
  getDoc,
  getDocs,
  onSnapshot,
  setDoc,
} from 'firebase/firestore'; // Import Firestore functions

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
  addComment: (comment: Omit<Comment, 'id' | 'createdAt'>) => Promise<void>;
  updateComment: (id: string, content: string) => Promise<void>;
  deleteComment: (id: string) => Promise<void>;
  getCommentsByPlate: (plateNumber: string) => Promise<Comment[]>;
  upvoteComment: (id: string, userId: string) => Promise<void>;
  downvoteComment: (id: string, userId: string) => Promise<void>;
  getCommentsByUser: (userId: string) => Promise<Comment[]>;
  upvotedCommentsByUser: { [userId: string]: string[] };
  getPlateVote: (plateNumber: string, userId: string) => Promise<PlateVote>;
  updatePlateVote: (plateNumber: string, userId: string, type: 'upvote' | 'downvote') => Promise<void>;
}

const LocalDbContext = createContext<LocalDbContextType | undefined>(undefined);

export function LocalDbProvider({ children }: { children: React.ReactNode }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [upvotedCommentsByUser, setUpvotedCommentsByUser] = useState<{ [userId: string]: string[] }>({});

  // Fetching comments in real-time from Firebase Firestore
  useEffect(() => {
    const q = query(collection(db, 'comments'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const fetchedComments: Comment[] = [];
      querySnapshot.forEach((doc) => {
        fetchedComments.push({ id: doc.id, ...doc.data() } as Comment);
      });
      setComments(fetchedComments);
    });
    return () => unsubscribe(); // Clean up the snapshot listener
  }, []);

  const addComment = async (comment: Omit<Comment, 'id' | 'createdAt'>) => {
    const newComment = {
      ...comment,
      createdAt: new Date(),
      upvotes: 0,
      upvotedBy: [],
    };
    await addDoc(collection(db, 'comments'), newComment);
  };

  const updateComment = async (id: string, content: string) => {
    const commentRef = doc(db, 'comments', id);
    await updateDoc(commentRef, { content });
  };

  const deleteComment = async (id: string) => {
    const commentRef = doc(db, 'comments', id);
    await deleteDoc(commentRef);
  };

  const getCommentsByPlate = async (plateNumber: string) => {
    const q = query(collection(db, 'comments'), where('plateNumber', '==', plateNumber));
    const querySnapshot = await getDocs(q);
    const plateComments: Comment[] = [];
    querySnapshot.forEach((doc) => {
      plateComments.push({ id: doc.id, ...doc.data() } as Comment);
    });
    return plateComments;
  };

  const upvoteComment = async (id: string, userId: string) => {
    const commentRef = doc(db, 'comments', id);
    const commentSnap = await getDoc(commentRef);
    if (commentSnap.exists()) {
      const commentData = commentSnap.data() as Comment;
      const updatedUpvotes = commentData.upvotes + 1;
      const updatedUpvotedBy = Array.from(new Set([...commentData.upvotedBy, userId]));
      await updateDoc(commentRef, { upvotes: updatedUpvotes, upvotedBy: updatedUpvotedBy });
    }
  };

  const downvoteComment = async (id: string, userId: string) => {
    const commentRef = doc(db, 'comments', id);
    const commentSnap = await getDoc(commentRef);
    if (commentSnap.exists()) {
      const commentData = commentSnap.data() as Comment;
      const updatedUpvotes = Math.max(0, commentData.upvotes - 1);
      const updatedUpvotedBy = commentData.upvotedBy.filter((upvoter) => upvoter !== userId);
      await updateDoc(commentRef, { upvotes: updatedUpvotes, upvotedBy: updatedUpvotedBy });
    }
  };

  const getPlateVote = async (plateNumber: string, userId?: string) => {
    const plateVoteRef = doc(db, 'plateVotes', plateNumber);
    const plateVoteSnap = await getDoc(plateVoteRef);

    if (plateVoteSnap.exists()) {
      const data = plateVoteSnap.data() as PlateVote;
      const userVote = userId ? data.users[userId] || null : null;
      return { ...data, userVote };
    } else {
      return { upvotes: 0, downvotes: 0, users: {} };
    }
  };

  const updatePlateVote = async (plateNumber: string, userId: string, type: 'upvote' | 'downvote') => {
    const plateVoteRef = doc(db, 'plateVotes', plateNumber);
    const plateVoteSnap = await getDoc(plateVoteRef);
  
    let currentVotes: PlateVote = { upvotes: 0, downvotes: 0, users: {} };
  
    // If the document exists, get the current data; otherwise, create a new document
    if (plateVoteSnap.exists()) {
      currentVotes = plateVoteSnap.data() as PlateVote;
    }
  
    const currentUserVote = currentVotes.users[userId];
  
    // Logic to adjust the votes based on the user's previous vote
    if (currentUserVote === type) {
      // Undo vote
      if (type === 'upvote') currentVotes.upvotes = Math.max(0, currentVotes.upvotes - 1);
      else currentVotes.downvotes = Math.max(0, currentVotes.downvotes - 1);
      delete currentVotes.users[userId];
    } else {
      if (currentUserVote === 'upvote') currentVotes.upvotes = Math.max(0, currentVotes.upvotes - 1);
      if (currentUserVote === 'downvote') currentVotes.downvotes = Math.max(0, currentVotes.downvotes - 1);
      if (type === 'upvote') currentVotes.upvotes += 1;
      if (type === 'downvote') currentVotes.downvotes += 1;
      currentVotes.users[userId] = type;
    }
  
    // Converting the `PlateVote` object into a plain object that Firebase can handle
    const plateVoteUpdateData = {
      upvotes: currentVotes.upvotes,
      downvotes: currentVotes.downvotes,
      users: { ...currentVotes.users },
    };
  
    // If the document doesn't exist, create it. Otherwise, update the existing document.
    if (!plateVoteSnap.exists()) {
      await setDoc(plateVoteRef, plateVoteUpdateData); // Create the document if it doesn't exist
    } else {
      await updateDoc(plateVoteRef, plateVoteUpdateData); // Update the existing document
    }
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
        getCommentsByUser: async (userId: string) => comments.filter((c) => c.userId === userId),
        upvotedCommentsByUser,
        getPlateVote,
        updatePlateVote,
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