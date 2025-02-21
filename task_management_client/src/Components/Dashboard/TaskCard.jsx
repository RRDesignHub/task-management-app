import { FaArrowRight } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { Link } from "react-router-dom";
import { useAxiosSecure } from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
export default function TaskCard({ task, refetch }) {
  const axiosSecure = useAxiosSecure();
  const {attributes, listeners, transform, transition, setNodeRef} = useSortable({id: task?._id});

  const style = {
    transition,
    transform: CSS.Transform.toString(transform)
  }
  const handleRemoveTask = async (id) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You have to again add this!",
        icon: "warning",
        color: "#064E3B",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#16A34A",
        confirmButtonText: "Yes, delete it!"
      }).then(async(result) => {
        if (result.isConfirmed) {
          const { data } = await axiosSecure.delete(`task/${id}`);
      if (data.deletedCount) {
        Swal.fire({
          title: "Deleted!",
          text: "Your task has been deleted.",
          icon: "success"
        });
        refetch();
      }
          
        }
      });
      
    } catch (err) {
      console.log("Delete Task Error--->", err);
    }
  };
  return (
    <div
    ref={setNodeRef}
    {...attributes}
    {...listeners}
    style={style}
      className="p-4 bg-white shadow-md rounded-md my-2 active:opacity-80 active:border active:border-primary cursor-grab"
    >
      {/* Task Title */}
      <h3 className="text-lg font-semibold text-textDark">{task.title}</h3>

      {/* Task Deadline  */}
      <p className="text-sm text-gray-600">
        <span className="font-medium">Deadline:</span>{" "}
        {new Date(task.deadline).toLocaleDateString()}
      </p>

      <div className="flex items-center justify-between">
        {/* Details Button */}
        <Link
          to={`/task/${task._id}`}
          className="mt-2 text-primary hover:underline text-sm font-medium flex items-center gap-2"
        >
          View Details <FaArrowRight />
        </Link>

        <button
          onClick={() => handleRemoveTask(task._id)}
          className="flex gap-2 items-center font-semibold text-textDark bg-background rounded-lg drop-shadow-lg p-4"
        >
          Remove <MdDeleteForever />
        </button>
      </div>
    </div>
  );
}
