import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router-dom"
import { useAxiosSecure } from "../Hooks/useAxiosSecure";
import { useState } from "react";
import Loading from "../Components/Shared/Loading";
import { FaArrowLeft, FaBackward } from "react-icons/fa";

export default function TaskDetails() {
  const navigate = useNavigate();
  const {id} = useParams();
  const [modalOpen, setModalOpen] = useState(false);
  const axiosSecure = useAxiosSecure();
  const {data: task = {}, isLoading, refetch} = useQuery({
    queryKey: ["task", id],
    queryFn: async() =>{
      const {data} = await axiosSecure.get(`task/${id}`);
      return data;
    }
  })

  if(isLoading){
    return <Loading />
  }
  return (
    <div className="p-6 max-w-xl mx-auto bg-white shadow-lg rounded-md">
      <h1 className="text-2xl font-bold text-primary">{task.title}</h1>
      <p className="text-gray-600 mt-2">{task.description || "No description available."}</p>

      <div className="mt-4">
        <p><strong>Category:</strong> <span className="text-primary">{task.category}</span></p>
        <p><strong>Deadline:</strong> {new Date(task.deadline).toLocaleDateString()}</p>
      </div>


      <div className="py-5 flex justify-between items-center">
      <Link 
      to={-1}
      className=" px-4 py-2 border-2 border-textDark text-textDark rounded-lg flex items-center gap-2">Go Back <FaArrowLeft /></Link>
         {/* Update Task Button */}
      <button
        onClick={() => setModalOpen(true)}
        className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary"
      >
        Update Task
      </button>
     
      </div>
     

      {/* Update Task Modal */}
      {/* {modalOpen && <UpdateTaskModal task={task} onClose={() => setModalOpen(false)} />} */}
    </div>
  )
}
