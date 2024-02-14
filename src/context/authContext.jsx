import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, createuserdocfromAuth } from '../utils/firebase';
import { getDoc } from 'firebase/firestore';

// Create a context for authentication.
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Define the state to store the user's data.
  const [user, setUser] = useState(null);

  // useEffect to handle Firebase auth state changes.
  useEffect(() => {
    // Listen for changes in the authentication state.
    const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
        // If the user is authenticated:
        if (authUser) {
            // Create or retrieve the user document from Firestore.
            const userDocRef = await createuserdocfromAuth(authUser);
            // Fetch the actual document snapshot.
            const userSnapshot = await getDoc(userDocRef);
            const userData = userSnapshot.data();
            
            // Update the local state with the user's data.
            setUser({
                uid: authUser.uid,
                email: authUser.email,
                displayName: userData.displayName,
                plan: userData.plan,
                userDocRef
            });
        } else {
            // If the user is not authenticated, set the user state to null.
            setUser(null);
        }
    });

    // Cleanup function to unsubscribe from the auth listener on component unmount.
    return () => unsubscribe();
  }, []);

  // Provide the user state to children components.
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the authentication context.
export const useAuth = () => {
  return useContext(AuthContext);
};
