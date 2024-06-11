import { createContext, useEffect, useContext, useState } from "react";
import { ref, set, get } from "firebase/database";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut as firebaseSignOut,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth, db } from "../firebase";

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  function isValidEmail(email) {
    const regex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    return regex.test(email);
  }

  async function signUp(email, password, firstName, lastName) {
    if (!isValidEmail(email)) {
      console.error("Invalid email format");
      return Promise.reject("Invalid email format");
    }

    try {
      // Create user in authentication database
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const uid = userCredential.user.uid;

      // Create user in Realtime Database with the same UID
      const dbRef = ref(db, `users/${uid}`);
      await set(dbRef, {
        firstName: firstName,
        lastName: lastName,
        email: email,
        role: "user", // Add the role field here
      });
      // Update the current user state with the user object including firstName and lastName
      setCurrentUser({
        ...userCredential.user,
        firstName: firstName,
        lastName: lastName,
        role: "user", // Add the role field here
      });

      return userCredential.user;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }

  async function logIn(email, password) {
    try {
      // Log in user in authentication database
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const uid = userCredential.user.uid;

      // Fetch user data from Realtime Database
      const dbRef = ref(db, `users/${uid}`);
      const snapshot = await get(dbRef);
      console.log("Snapshot:", snapshot.val()); // Log the snapshot data

      // Update the current user state with the fetched user data
      // Update the current user state with the fetched user data
      if (snapshot.exists()) {
        const userData = snapshot.val();
        setCurrentUser({
          ...userCredential.user,
          firstName: userData.firstName,
          lastName: userData.lastName,
        });
      }

      return userCredential.user;
    } catch (error) {
      console.error("Error logging in user:", error);
      throw error;
    }
  }



  function googleSignIn() {
    const googleAuthProvider = new GoogleAuthProvider();
  
    return signInWithPopup(auth, googleAuthProvider)
      .then((userCredential) => {
        const user = userCredential.user;
  
        // Extract first name and last name from displayName
        const displayName = user.displayName;
        const fullName = displayName.split(' ');
        const firstName = fullName[0];
        const lastName = fullName[fullName.length - 1];
  
        // Save user data to Realtime Database
        const dbRef = ref(db, `users/${user.uid}`);
        set(dbRef, {
          firstName,
          lastName,
          email: user.email,
        });
  
        return user;
      })
      .catch((error) => {
        console.error("Error signing in with Google:", error);
        throw error;
      });
  }

  async function signOut() {
    try {
      await firebaseSignOut(auth);
      setCurrentUser(null);
    } catch (error) {
      console.error("Error signing out:", error);
      throw error;
    }
  }

  function forgotPassword(email) {
    return sendPasswordResetEmail(auth, email)
      .then(() => {
        // Password reset email sent successfully
        setError(null);
      })
      .catch((error) => {
        setError(error.message);
        return Promise.reject(error.message);
      });
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User is signed in, set the user data
        setCurrentUser(user);

        // Save user data to localStorage
        localStorage.setItem("currentUser", JSON.stringify(user));
      } else {
        // No user is signed in, clear the user data
        setCurrentUser(null);

        // Clear user data from localStorage
        localStorage.removeItem("currentUser");
      }
    });

    // Check for user data in localStorage on component mount
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }

    return unsubscribe;
  }, []);

  const contextValue = {
    user: currentUser,
    error,
    signUp,
    logIn,
    signOut,
    googleSignIn,
    forgotPassword,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export const UserAuth = () => useContext(UserContext);
