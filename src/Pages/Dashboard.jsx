import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db, logout } from "../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import Task_Manager from "./Task_Manager";
import Comments from "../Components/Comments";


function Dashboard() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setName(data.name);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };


  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    fetchUserName();
  }, [user, loading]);


  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <div className="h-1/5 flex flex-row gap-3 justify-end p-5 text-2xl font-semibold ">
        <div>{name}</div>
        <div className="border-2 border-black h-10 px-2 rounded-xl bg-sky-600 text-white hover:scale-110">
          <button onClick={logout}>Logout</button>
        </div>
      </div>
      <div className="h-3/4 min-w-screen">
        <Task_Manager />
      </div>
      <div className="h-1/4 min-w-screen">
        <Comments />
      </div>
    </div>
  );
}
export default Dashboard;
