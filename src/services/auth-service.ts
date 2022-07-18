import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export const AuthService = {
  signInWithGoogle: async () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    try {
      const { user } = await signInWithPopup(auth, provider);
      return {
        user,
      };
    } catch (e: any) {
      console.log("AuthService/signInWithGoogle/error", e);
      return {
        error: e.message,
      };
    }
  },
  signOut: async () => {
    const auth = getAuth();
    try {
      await auth.signOut();
    } catch (e: any) {
      console.log("AuthService/signOut/error", e);
      return {
        error: e.message,
      };
    }
  },
};
