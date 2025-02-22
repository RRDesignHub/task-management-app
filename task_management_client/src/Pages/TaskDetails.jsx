import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAxiosSecure } from "../Hooks/useAxiosSecure";
import { useState } from "react";
import Loading from "../Components/Shared/Loading";
import { FaArrowLeft, FaBackward } from "react-icons/fa";
import { format, isBefore, parseISO } from "date-fns";
import UpdateTask from "../Components/TaskDetails.jsx/UpdateTask";

export default function TaskDetails() {
  const { id } = useParams();
  const [modalOpen, setModalOpen] = useState(false);
  const axiosSecure = useAxiosSecure();
  const {
    data: task = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["task", id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`task/${id}`);
      return data;
    },
  });

  // if the deadline crossed:
  let deadlineDate = {}
  if(task.deadline){
    deadlineDate = parseISO(task?.deadline);
  }
  const today = new Date();
  const isExpired = isBefore(deadlineDate, today);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="p-6 max-w-xl mx-auto bg-card shadow-lg rounded-md">
      <h1 className="text-2xl font-bold text-primary">{task.title}</h1>
      <p className="text-gray-600 mt-2">
        {task.description || "No description available."}
      </p>

      <div className="mt-4">
        <p>
          <strong>Status:</strong>{" "}
          <span
            className={`${
              task.status === "To-Do"
                ? "text-orange-500"
                : task.status === "In-Progress"
                ? "text-blue-400"
                : "text-primary"
            } `}
          >
            {task.status}
          </span>
        </p>
        <p>
          <strong>Deadline:</strong>{" "}
          <span
            className={`text-sm ${
              isExpired ? "text-red-400 font-bold" : "text-gray-600"
            }`}
          >
            {format(task.deadline, "yyyy-MM-dd HH:mm")}
          </span>
        </p>
      </div>

      <div className="py-5 flex justify-between items-center">
        <Link
          to={-1}
          className=" px-4 py-2 border-2 border-textDark text-textDark rounded-lg flex items-center gap-2"
        >
          Go Back <FaArrowLeft />
        </Link>
        {/* Update Task Button */}
        <button
          onClick={() => setModalOpen(true)}
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary"
        >
          Update Task
        </button>
      </div>

      {/* Update Task Modal */}
            <UpdateTask
              isOpen={modalOpen}
              onClose={() => setModalOpen(false)}
              task={task}
              refetch={refetch}
            />
    </div>
  );
}
