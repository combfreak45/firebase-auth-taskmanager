import { useEffect, useState } from "react";
import { GrAddCircle } from "react-icons/gr";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  updateDoc,
} from "firebase/firestore";
import ToDo from "../Components/ToDo";
import { db } from "../firebase";
const Task_Manager = () => {
  const [data, setData] = useState([]);
  const [input, setInput] = useState("");
  const [description,setDescription] = useState("")
  const [date,setDate] = useState("")
  const [assignedTo,setAssignedTo] = useState("")


  useEffect(() => {
    const q = query(collection(db, "tasks"));
    const d = onSnapshot(q, (querySnap) => {
      let arr = [];
      querySnap.forEach((doc) => {
        arr.push({ ...doc.data(), id: doc.id });
      });
      setData(arr);
    });
    return () => d();
  }, []);

  const toggleComponent = async (value) => {
    await updateDoc(doc(db, "tasks", value.id), {
      completed: !value.completed,
    });
  };

  const createTodo = async (e) => {
    e.preventDefault(e);
    if (input === "" || description === "" || date=== "" || assignedTo==="") {
      alert("enter the value");
      return;
    }
    await addDoc(collection(db, "tasks"), {
      text: input,
      description:description,
      date:date,
      completed: false,
      assignedTo: assignedTo
    });
    setInput("");
    setDescription("")
    setDate("")
    setAssignedTo("")
  };

  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, "tasks", id));
  };


  return (
    <div className="flex flex-col  gap-10 p-10">
      <div className=" p-10 flex flex-col items-center">
        <div className="text-8xl font-bold py-10">TO DO LIST</div>
        <div className="border border-5 border-white p-5">
          <form onSubmit={createTodo} className="flex flex-col gap-2">
            <input
              className="w-[20rem] p-3 border-2 border-solid text-black"
              type="text"
              placeholder="ADD TASK"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <textarea
              className="w-[20rem] p-3 border-2 border-solid text-black"
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <input
              className="w-[20rem] p-3 border-2 border-solid text-black"
              type="text"
              placeholder="DD/MM/YYYY"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <input
              className="w-[20rem] p-3 border-2 border-solid text-black"
              type="text"
              placeholder="Assigned To"
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
            />
            <button className="w-[20rem] p-3 bg-sky-500 text-xl">Done</button>
          </form>
        </div>
      </div>

      <div className="flex flex-col  gap-4">
        <div className="text-7xl font-bold">Tasks</div>
        {data.map((value, index) => (
          <ToDo
            key={index}
            value={value}
            toggleComponent={toggleComponent}
            deleteTodo={deleteTodo}
          />
        ))}
      </div>
    </div>
  );
};

export default Task_Manager;
