import { collection, doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { GrAddCircle } from "react-icons/gr";
import { db } from "../firebase";

const Edit_Task = ({setEditWindow,value,editWindow}) => {

  const [input, setInput] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [assignedTo, setAssignedTo] = useState("");

  const editTodo = async (e) => {
    e.preventDefault(e);
    if (input === "" || description === "" || date === "" || assignedTo === "") {
      alert("enter the value");
      return;
    }
    await updateDoc(doc(db, "tasks",value.id), {
      text: input,
      description: description,
      date: date,
      completed: false,
      assignedTo: assignedTo
    });
    setEditWindow(!editWindow)
  };

  return (
    <div className="flex flex-col p-10  gap-2">
      <div className="text-2xl font-bold ">Edit List</div>
      <div>
        <form onSubmit={editTodo} className="flex flex-row gap-4">
          <input
            className="p-1 rounded-xl text-black"
            type="text"
            placeholder="ADD TASK"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <textarea
            className="p-1 rounded-xl text-black"
            type="text"
            placeholder="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            className="p-1 rounded-xl text-black"
            type="text"
            placeholder="DD/MM/YYYY"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <input
            className="p-1 rounded-xl text-black"
            type="text"
            placeholder="assignedto"
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
          />
          <button className="bg-sky-800  px-7 rounded-3xl font-semibold">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Edit_Task;
