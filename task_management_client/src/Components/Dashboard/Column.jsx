import { useDroppable } from "@dnd-kit/core";
import TaskCard from "./TaskCard";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
export default function Column({ column, tasks, refetch}) {
  const { setNodeRef } = useDroppable({ id: column.id });
  
  return (
    <div className="bg-card p-4 rounded-lg">
      <h2 className="text-xl font-bold">{column.title}</h2>
      <div ref={setNodeRef}>
      {tasks.length !== 0 && tasks.map((task) => (
        <TaskCard key={task._id} task={task} refetch={refetch}/>
      ))}
      </div>
      {tasks.length === 0 && <p className="mt-4 w-full h-[100px] border border-dashed border-primary rounded-lg text-primary flex justify-center items-center">Drop task here</p>}
    </div>
  );
}
