import AddTask from "../Components/Dashboard/AddTask";
import useUser from "../Hooks/useUser";
import { useQuery } from "@tanstack/react-query";
import { useAxiosSecure } from "../Hooks/useAxiosSecure";
import Loading from "../Components/Shared/Loading";
import Column from "../Components/Dashboard/Column";
import {
  closestCorners,
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
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

  useEffect(() => {
    setTasks(loadedTasks);
  }, [loadedTasks]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, // Drag starts after 5px movement (improves mobile experience)
      },
    })
  );

  // drag and drop functiom:
  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (!over) return;
    const taskId = active.id;
    const newStatus = over.id;

    // 🔹 Find the dragged task
    const draggedTask = tasks.find((task) => task._id === taskId);
    if (!draggedTask || draggedTask.status === newStatus) return;

    // 🔹 Update state immediately for UI response
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === taskId ? { ...task, status: newStatus } : task
      )
    );
    try {
      await axiosSecure.patch(`tasks/${taskId}`, { status: newStatus });
      refetch(); // Reload tasks from DB
    } catch (error) {
      console.error("Error updating task status:", error);
    }
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
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragEnd={handleDragEnd}
        >
          {tasks.length === 0 ? (
            <div className="min-h-[70vh] bg-card rounded-lg col-span-3 flex justify-center items-center">
              <h2 className="text-center text-2xl font-bold text-primary">
              Please add your tasks
            </h2>
            </div>
          ) : (
            columns?.map((column) => (
              <Column
                key={column.id}
                column={column}
                tasks={tasks.filter((task) => task.status == column.id)}
                refetch={refetch}
              />
            ))
          )}
        </DndContext>
      </div>

      {/* Add Task Modal */}
      <AddTask
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        refetch={refetch}
      />
    </div>
  );
}
