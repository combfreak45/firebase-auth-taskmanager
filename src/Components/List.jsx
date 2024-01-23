
const List = ({ value,deleteComment}) => {
  return (
    <div className="flex flex-row gap-5  items-center justify-between border w-full p-5">
      <div className="flex flex-col gap-2 text-2xl ">
        <div className="text-2xl">{value.name}</div>
        <div className="text-sm">{value.comment}</div>
      </div>
      <div>
        <button
          onClick={() => deleteComment(value.id)}
          className="bg-sky-800 p-2 px-3 rounded-3xl font-semibold"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default List;
