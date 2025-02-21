import AddTask from "../Components/Dashboard/AddTask";
import useUser from "../Hooks/useUser";
import { useQuery } from "@tanstack/react-query";
import { useAxiosSecure } from "../Hooks/useAxiosSecure";
import Loading from "../Components/Shared/Loading";
import Column from "../Components/Dashboard/Column";
import { closestCorners, DndContext } from "@dnd-kit/core";
import { useEffect, useState } from "react";
import { arrayMove } from "@dnd-kit/sortable";
export default function Dashboard() {
  const [userData, userDataLoading] = useUser();
  const axiosSecure = useAxiosSecure();
  const [modalOpen, setModalOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const columns = [
    {
      id: "To-Do",
      title: "To-Do",
    },
    {
      id: "In-Progress",
      title: "In Progress",
    },
    {
      id: "Done",
      title: "Done",
    },
  ];

  const {
    data: loadedTasks = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["tasks", userData.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`tasks/${userData.email}`);
      return data;
    },
  });
  useEffect(() =>{
    setTasks(loadedTasks)
  },[])

  //task position
  const taskPosition = id =>{
    tasks.findIndex(task => task._id === id)
  }

  // drag and drop functiom:
  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if(active.id == over.id) return;

    setTasks(tasks =>{
      const orgPosition = taskPosition(active.id);
      const newPosition = taskPosition(over.id)

      return arrayMove(tasks, orgPosition, newPosition)
    })


  };

  if ((isLoading, userDataLoading)) {
    return <Loading />;
  }
  return (
    <div className="w-11/12 mx-auto py-6">
      {/* section heading */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Your Tasks</h1>
        <button
          onClick={() => setModalOpen(true)}
          className="px-4 py-2 bg-primary text-white rounded-lg"
        >
          + Add Task
        </button>
      </div>

      {/* Task Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <DndContext
          collisionDetection={closestCorners}
          onDragEnd={handleDragEnd}
        >
          {columns.map((column) => (
            <Column
              key={column.id}
              refetch={refetch}
              column={column}
              tasks={tasks.filter((task) => task.category === column.id)}
            />
          ))}
        </DndContext>
      </div>

      {/* Add Task Modal */}
      <AddTask
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onTaskAdded={tasks}
        refetch={refetch}
      />
    </div>
  );
}
