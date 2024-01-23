import React, { useState } from "react";
import Edit_Task from "./EditTask";
const ToDo = ({ value, toggleComponent, deleteTodo }) => {
    const [editWindow,setEditWindow] = useState(false)
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row gap-3 text-2xl border-solid border-2 p-10 justify-between">
        <div className="flex flex-row gap-3">
          <div>
            <input
              type="checkbox"
              checked={`${value.completed ? "check" : ""}`}
              onChange={() => toggleComponent(value)}
            />
          </div>
          <div onClick={() => toggleComponent(value)}>{value.text}</div>
          <div>{value.description}</div>
          <div>{value.date}</div>
          <div>{value.assignedTo}</div>
        </div>
        <div className="flex flex-row gap-3">
          <div
            onClick={() => deleteTodo(value.id)}
            className="w-[4rem]  bg-sky-500 p-1 text-xl rounded-lg text-center hover:cursor-pointer"
          >
            Delete
          </div>
          <div
            onClick={() => setEditWindow(!editWindow)}
            className="w-[4rem]  bg-sky-500 text-xl p-1 rounded-lg text-center hover:cursor-pointer"
          >
            Edit
          </div>
        </div>
      </div>
      <div
        className={`bg-black text-white transition ease-in-out duration-700 ${
          editWindow ? "h-auto opacity-100" : "h-0 opacity-0"
        }`}
      >
        {editWindow ? (
          <Edit_Task
            setEditWindow={setEditWindow}
            value={value}
            editWindow={editWindow}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default ToDo;
