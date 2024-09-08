import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../lib/firebaseConfig';
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
  Timestamp,
} from 'firebase/firestore';

// Interfaces
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

// Create context
const LocalDbContext = createContext<LocalDbContextType | undefined>(undefined);

// Provider component
export function LocalDbProvider({ children }: { children: React.ReactNode }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [upvotedCommentsByUser, setUpvotedCommentsByUser] = useState<{ [userId: string]: string[] }>({});

  // Fetch comments in real-time
  useEffect(() => {
    const q = query(collection(db, 'comments'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const fetchedComments: Comment[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        fetchedComments.push({
          ...data,
          id: doc.id,
          createdAt: data.createdAt.toDate(),
        } as Comment);
      });
      setComments(fetchedComments);
    });
    return () => unsubscribe();
  }, []);

  const addComment = async (comment: Omit<Comment, 'id' | 'createdAt'>) => {
    const newComment = {
      ...comment,
      createdAt: Timestamp.now(),
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
      const data = doc.data();
      plateComments.push({
        ...data,
        id: doc.id,
        createdAt: data.createdAt.toDate(),
      } as Comment);
    });
    return plateComments;
  };

  const upvoteComment = async (id: string, userId: string) => {
    const commentRef = doc(db, 'comments', id);
    const commentSnap = await getDoc(commentRef);
    if (commentSnap.exists()) {
      const commentData = commentSnap.data() as Comment;
      const isAlreadyUpvoted = commentData.upvotedBy.includes(userId);

      // If the user has already upvoted, remove the upvote (toggle behavior)
      const updatedUpvotes = isAlreadyUpvoted
        ? Math.max(0, commentData.upvotes - 1)
        : commentData.upvotes + 1;
      const updatedUpvotedBy = isAlreadyUpvoted
        ? commentData.upvotedBy.filter((uid) => uid !== userId)
        : [...commentData.upvotedBy, userId];

      // Update Firestore and make sure the upvote/downvote is logged
      await updateDoc(commentRef, {
        upvotes: updatedUpvotes,
        upvotedBy: updatedUpvotedBy,
      });
    }
  };

  const downvoteComment = async (id: string, userId: string) => {
    const commentRef = doc(db, 'comments', id);
    const commentSnap = await getDoc(commentRef);
    if (commentSnap.exists()) {
      const commentData = commentSnap.data() as Comment;
      const isAlreadyUpvoted = commentData.upvotedBy.includes(userId);

      // If the user has already upvoted, remove the upvote (toggle behavior)
      const updatedUpvotes = isAlreadyUpvoted
        ? Math.max(0, commentData.upvotes - 1)
        : commentData.upvotes + 1;
      const updatedUpvotedBy = isAlreadyUpvoted
        ? commentData.upvotedBy.filter((uid) => uid !== userId)
        : [...commentData.upvotedBy, userId];

      // Update Firestore and make sure the downvote/upvote is logged
      await updateDoc(commentRef, {
        upvotes: updatedUpvotes,
        upvotedBy: updatedUpvotedBy,
      });
    }
  };


  const getCommentsByUser = async (userId: string): Promise<Comment[]> => {
    const q = query(collection(db, 'comments'), where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    const userComments: Comment[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      userComments.push({
        ...data,
        id: doc.id,
        createdAt: data.createdAt.toDate(),
      } as Comment);
    });
    return userComments;
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
  
    if (plateVoteSnap.exists()) {
      currentVotes = plateVoteSnap.data() as PlateVote;
    }
  
    const currentUserVote = currentVotes.users[userId];
  
    if (currentUserVote === type) {
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
  
    const plateVoteUpdateData = {
      upvotes: currentVotes.upvotes,
      downvotes: currentVotes.downvotes,
      users: { ...currentVotes.users },
    };
  
    if (!plateVoteSnap.exists()) {
      await setDoc(plateVoteRef, plateVoteUpdateData);
    } else {
      await updateDoc(plateVoteRef, plateVoteUpdateData);
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
        getCommentsByUser,
        upvotedCommentsByUser,
        getPlateVote,
        updatePlateVote,
      }}
    >
      {children}
    </LocalDbContext.Provider>
  );
}

// Hook for using the LocalDb context
export function useLocalDb() {
  const context = useContext(LocalDbContext);
  if (context === undefined) {
    throw new Error('useLocalDb must be used within a LocalDbProvider');
  }
  return context;
}

// Server-side functions
export async function serverGetCommentsByUser(userId: string): Promise<Comment[]> {
  const q = query(collection(db, 'comments'), where('userId', '==', userId));
  const querySnapshot = await getDocs(q);
  const userComments: Comment[] = [];
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    userComments.push({
      ...data,
      id: doc.id,
      createdAt: data.createdAt.toDate(),
    } as Comment);
  });
  return userComments;
}

export async function serverGetCommentsByPlate(plateNumber: string): Promise<Comment[]> {
  const q = query(collection(db, 'comments'), where('plateNumber', '==', plateNumber));
  const querySnapshot = await getDocs(q);
  const plateComments: Comment[] = [];
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    plateComments.push({
      ...data,
      id: doc.id,
      createdAt: data.createdAt.toDate(),
    } as Comment);
  });
  return plateComments;
}

export async function serverAddComment(comment: Omit<Comment, 'id' | 'createdAt'>): Promise<void> {
  const newComment = {
    ...comment,
    createdAt: Timestamp.now(),
    upvotes: 0,
    upvotedBy: [],
  };
  await addDoc(collection(db, 'comments'), newComment);
}

// Export all server-side functions
export const serverDb = {
  getCommentsByUser: serverGetCommentsByUser,
  getCommentsByPlate: serverGetCommentsByPlate,
  addComment: serverAddComment,
};

export const getCommentsByUser = async (userId: string) => {
  const q = query(collection(db, 'comments'), where('userId', '==', userId));
  const querySnapshot = await getDocs(q);
  
  const userComments: Comment[] = [];
  querySnapshot.forEach((doc) => {
    userComments.push({ id: doc.id, ...doc.data() } as Comment);
  });
  
  return userComments;
};