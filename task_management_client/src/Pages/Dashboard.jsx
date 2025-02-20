import React, { useState } from "react";
import AddTask from "../Components/Dashboard/AddTask";
import useUser from "../Hooks/useUser";
import { useQuery } from "@tanstack/react-query";
import { useAxiosSecure } from "../Hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import Loading from "../Components/Shared/Loading";
import { FaArrowRight } from "react-icons/fa";
export default function Dashboard() {
  const [userData, userDataLoading] = useUser();
  const axiosSecure = useAxiosSecure();

  const {data: tasks = [], isLoading, refetch} = useQuery({
    queryKey: ["tasks", userData.email],
    queryFn: async() =>{
      const {data} = await axiosSecure.get(`tasks/${userData.email}`);
      return data;
    }
  })

  const [modalOpen, setModalOpen] = useState(false);

  if(isLoading, userDataLoading){
    return <Loading />
  }
  return (
    <div className="w-11/12 mx-auto py-6">
    <div className="flex justify-between items-center mb-4">
      <h1 className="text-3xl font-bold">Your Tasks</h1>
      <button onClick={() => setModalOpen(true)} className="px-4 py-2 bg-primary text-white rounded-lg">
        + Add Task
      </button>
    </div>

    {/* Task Columns */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {["To-Do", "In Progress", "Done"].map((category) => (
        <div key={category} className="bg-card p-4 rounded-lg">
          <h2 className="text-xl font-bold">{category}</h2>
          {tasks.filter((task) => task.category === category).map((task) => (
            <div key={task._id} className="p-4 bg-white shadow-md rounded-md my-2">
            {/* Task Title */}
            <h3 className="text-lg font-semibold text-textDark">{task.title}</h3>
        
            {/* Task Deadline (Formatted) */}
            <p className="text-sm text-gray-600">
              <span className="font-medium">Deadline:</span> {new Date(task.deadline).toLocaleDateString()}
            </p>
        
            {/* Details Button */}
            <Link 
              to={`/task/${task._id}`} 
              className="mt-2 text-primary hover:underline text-sm font-medium flex items-center gap-2"
            >
              View Details <FaArrowRight />
            </Link>
          </div>
          ))}
        </div>
      ))}
    </div>

    {/* Add Task Modal */}
    <AddTask isOpen={modalOpen} onClose={() => setModalOpen(false)} onTaskAdded={tasks} refetch={refetch} />
  </div>
  );
}
