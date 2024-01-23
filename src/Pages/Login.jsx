import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, signInWithGoogle } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();


  useEffect(() => {
    if (loading) {
      return;
    }
    if (user) navigate("/dashboard");
  }, [user, loading]);


  return (
    <div className="min-h-screen bg-black text-white  flex flex-col justify-center items-center">
      <div className="flex flex-col gap-5 text-3xl items-center border-4 border-solid border-zinc-50 p-10">
        <input
          className="p-2 rounded-3xl text-black"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <input
          className="p-2 rounded-3xl text-black"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button
          className="bg-sky-800 p-2 px-3 rounded-3xl font-semibold w-[22rem]"
          onClick={() => signInWithEmailAndPassword(auth, email, password)}
        >
          Login
        </button>
        <button
          className="bg-sky-800 p-2 px-3 rounded-3xl font-semibold w-[22rem]"
          onClick={signInWithGoogle}
        >
          Login with Google
        </button>
        <div>
          <Link to="/reset">Forgot Password</Link>
        </div>
        <div
        className="text-2xl">
          Don't have an account? <Link to="/register">Register</Link> now.
        </div>
      </div>
    </div>
  );
}
export default Login;
