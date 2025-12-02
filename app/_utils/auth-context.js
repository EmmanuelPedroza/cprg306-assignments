"use client";

import { useContext, createContext, useState, useEffect } from "react";
import {
    signInWithPopup,
    signOut,
    onAuthStateChanged,
    GithubAuthProvider,
    GoogleAuthProvider
} from "firebase/auth";
import { auth, db } from "./firebase";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const gitHubSignIn = () => {
        const provider = new GithubAuthProvider();
        console.log(provider);
        return signInWithPopup(auth, provider);
    };

    const googleSignIn = () => {
        const provider = new GoogleAuthProvider();
        console.log(provider);
        return signInWithPopup(auth, provider);
    };

    const firebaseSignOut = () => {
        return signOut(auth);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            console.log(currentUser);
            if (currentUser) {
                const userDocRef = doc(db, "users", currentUser.uid);
                const userDocSnap = await getDoc(userDocRef);

                if (!userDocSnap.exists()) {
                    await setDoc(userDocRef, {
                        email: currentUser.email,
                        displayName: currentUser.displayName,
                        lastSeen: serverTimestamp(),
                    });
                } else {
                    await setDoc(userDocRef, {
                        lastSeen: serverTimestamp(),
                    }, { merge: true });
                }
            }
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, [user]);

    return (
        <AuthContext.Provider value={{ user, gitHubSignIn, firebaseSignOut, googleSignIn }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useUserAuth = () => {
    return useContext(AuthContext);
};