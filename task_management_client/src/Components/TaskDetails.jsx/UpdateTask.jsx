import axios from "axios";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import useUser from "../../Hooks/useUser";
import { useAxiosSecure } from "../../Hooks/useAxiosSecure";
export default function UpdateTask({ isOpen, onClose, task, refetch }) {
  const axiosSecure = useAxiosSecure();
  const [userData, userDataLoading] = useUser();
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [category, setCategory] = useState(task.status);
  const [deadline, setDeadline] = useState(new Date());
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const updateTask = {
        title,
        description,
        status: category,
        deadline,
        email: userData?.email,
        userName: userData.name,
      };

      const { data } = await axiosSecure.put(`/task/${task._id}`, updateTask);

      if (data.modifiedCount) {
        refetch();
        onClose();
        setTitle(null);
        setDescription(null);
        setCategory("To-Do");
      }
    } catch (error) {
      console.error("Error update task-->", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full overflow-auto">
        <h2 className="text-2xl font-bold mb-4">Update Task</h2>
        <form onSubmit={handleSubmit}>
          {/* title */}
          <div>
            <label className="w-full mb-4">Task Title</label>
            <input
              type="text"
              placeholder="Task Title"
              className="w-full p-2 border rounded mb-2"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={50}
              required
            />
          </div>

          {/* descriptiton */}
          <div>
            <label className="w-full mb-4">Task Description </label>
            <textarea
              placeholder="Task Description (Optional)"
              className="w-full p-2 border rounded mb-2"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={200}
            />
          </div>
          {/* descriptiton */}
          <div>
            <label className="w-full mb-4">Choose Category</label>
            <select
              className="w-full p-2 border rounded mb-2"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="To-Do">To-Do</option>
              <option value="In-Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
          </div>

          {/* deadline */}
          <div>
            <label className="block w-full mb-2">Deadline</label>
            <DatePicker
              selected={deadline}
              required
              onChange={(date) => setDeadline(date)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none bg-background"
            />
          </div>

          <div className="flex justify-end space-x-2 mt-4">
            <button
              type="button"
              className="px-4 py-2 bg-gray-500 text-white rounded"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-white rounded"
              disabled={loading}
            >
              {loading ? "Adding..." : "Add Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
