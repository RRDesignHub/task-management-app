import TaskCard from "./TaskCard";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
export default function Column({ column, tasks, refetch }) {
  return (
    <div data-column-id={column.id} className="bg-card p-4 rounded-lg">
      <h2 className="text-xl font-bold">{column.title}</h2>
      <SortableContext
        items={tasks.map((task) => task._id)}
        strategy={verticalListSortingStrategy}
      >
        {tasks.map((task, index) => (
          <TaskCard key={task._id} task={task} refetch={refetch} />
        ))}
      </SortableContext>
    </div>
  );
}
