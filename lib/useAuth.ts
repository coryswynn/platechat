import { useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Simulate an authentication process
    const mockUser: User = {
      id: 'user-1',
      name: 'John Doe',
    };
    setUser(mockUser);
  }, []);

  return { user };
}