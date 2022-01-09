import React, { createContext, useContext, useMemo } from "react";
import * as Google from "expo-google-app-auth";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
  signInWithCredentials,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase";
import { Text, View } from "react-native";

const AuthContext = createContext({});

const config = {
  androidClientId:
    "395519300430-tst2b01h9l6mkmc1un64nt2horc8p0cb.apps.googleusercontent.com",
  scopes: ["profile", "email"],
  permissions: ["public_profile", "email", "gender", "location"],
};

export const AuthProvider = ({ children }) => {
  const [error, setError] = React.useState(null);
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setUser(user);
        } else {
          setUser(null);
        }
        setLoading(false);
      }),
    []
  );

  const signInWithGoogle = async () => {
    setLoading(true);
    await Google.logInAsync(config)
      .then(async (loginResult) => {
        if (loginResult.type == "success") {
          const { idToken, accessToken } = loginResult;
          const credentials = GoogleAuthProvider.credential(
            idToken,
            accessToken
          );
          await signInWithCredential(auth, credentials);
        }
        return Promise.reject();
      })
      .catch((e) => setError(e))
      .finally(() => setLoading(false));
  };

  const logout = () => {
    setLoading(true);

    signOut(auth)
      .catch((e) => setError(e))
      .finally(() => setLoading(false));
  };

  const memoedValue = useMemo(
    () => ({ user, loading, error, signInWithGoogle, logout }),
    [user, loading, error]
  );

  return (
    <AuthContext.Provider value={memoedValue}>
      {loading && (
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ textAlign: "center", fontSize: 30 }}>
            Tinder Clone
          </Text>
        </View>
      )}
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
