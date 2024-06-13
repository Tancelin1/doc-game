import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { useState } from "react";
import { app } from "../firebase";

export default function AuthenticationComponent() {
  const [email, setEmail] = useState("user@user.com");
  const [password, setPassword] = useState("user@user.com");
  const [loggedInEmail, setLoggedInEmail] = useState("");

  async function login() {
      console.log("login with", email, password);
      const auth = getAuth(app);
      const userInfo = await signInWithEmailAndPassword(auth, email, password);
      setLoggedInEmail(userInfo.user.email);
  }

  async function logout() {
      const auth = getAuth(app);
      await signOut(auth);
      setLoggedInEmail("");
  }

  async function register() {
      console.log("register with", email, password);
      const auth = getAuth(app);
      const userInfo = await createUserWithEmailAndPassword(
          auth,
          email,
          password
      );
      setLoggedInEmail(userInfo.user.email);
  }

  function triggerError() {
      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleString();
      console.error(`This error was created at ${formattedDate}`);
      throw new Error("This is a test error");
  }

  return (
      <div className="form-group">
          <div>
              <label htmlFor="email">Email:</label>
              <input
                  name="email"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
              />
          </div>
          <div>
              <label htmlFor="password">Mot de passe:</label>
              <input
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
              />
          </div>
          <div>
              {loggedInEmail.length > 0 ? (
                  <>
                      <p>Hello {loggedInEmail}</p>
                      <button onClick={logout}>Se déconnecter</button>
                  </>
              ) : (
                  <>
                      <button onClick={login}>Se connecter</button>
                      <button onClick={register}>S'enregistrer</button>
                  </>
              )}
          </div>
          <div>
              <button onClick={triggerError}>Provoquer une erreur</button>
          </div>
      </div>
  );
}
