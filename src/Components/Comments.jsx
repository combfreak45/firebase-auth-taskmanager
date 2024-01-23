import { useEffect, useState } from "react";
import { GrAddCircle } from "react-icons/gr";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
} from "firebase/firestore";
import { db } from "../firebase";
import List from "./List";



const Comments = () => {
  const [data, setData] = useState([]);
 const [comment,setComment] = useState("")
 const [name,setName] = useState("")

  useEffect(() => {
    const q = query(collection(db, "comments"));
    const d = onSnapshot(q, (querySnap) => {
      let arr = [];
      querySnap.forEach((doc) => {
        arr.push({ ...doc.data(), id: doc.id });
      });
      setData(arr);
    });
    return () => d();
  }, []);

  
  const createComment = async (e) => {
    e.preventDefault(e);
    if (
      comment === "" || name === ""
    ) {
      alert("enter the value");
      return;
    }
    await addDoc(collection(db, "comments"), {
      comment:comment,
      name:name
    });
    setComment("")
    setName("")
  };

  const deleteComment = async (id) => {
    await deleteDoc(doc(db, "comments", id));
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center p-10 gap-4 text-xl">
        <div className="text-7xl font-bold ">Write Comment</div>
        <form
          onSubmit={createComment}
          className="flex flex-col border-solid border-2 p-10 gap-2"
        >
          <input
            className="text-black p-3"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <textarea
            className="text-black p-3"
            type="text"
            placeholder="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button className="bg-sky-800 p-2 px-3 rounded-3xl font-semibold w-[22rem]">
            Send
          </button>
        </form>
      </div>

      <div className=" p-10 flex flex-col gap-4">
        <div className="text-6xl font-bold">Tasks</div>
        {data.map((value, index) => (
          <List key={index} value={value} deleteComment={deleteComment} />
        ))}
      </div>
    </div>
  );
};

export default Comments;
