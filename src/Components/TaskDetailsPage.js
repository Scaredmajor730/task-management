// TaskDetailsPage.js
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./TaskDetailsPage.css";

function TaskDetailsPage() {
  const [task, setTask] = useState(null);
  const [newSubTask, setNewSubTask] = useState("");
  const { taskId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const selectedTask = storedTasks.find((t) => t.id === parseInt(taskId, 10));

    if (!selectedTask) {
      // Handle case where task is not found
      navigate("/");
    } else {
      setTask(selectedTask);
    }
  }, [taskId, navigate]);

  const addSubTask = () => {
    if (newSubTask.trim() !== "") {
      const updatedSubTasks = [
        ...(task?.subtasks || []),
        { name: newSubTask, completed: false },
      ];
      const updatedTask = { ...task, subtasks: updatedSubTasks };
      updateTask(updatedTask);
      setNewSubTask("");
    }
  };

  const deleteSubTask = (index) => {
    const updatedSubTasks = [...(task?.subtasks || [])];
    updatedSubTasks.splice(index, 1);
    const updatedTask = { ...task, subtasks: updatedSubTasks };
    updateTask(updatedTask);
  };

  const toggleSubTaskCompletion = (index) => {
    const updatedSubTasks = [...(task?.subtasks || [])];
    updatedSubTasks[index].completed = !updatedSubTasks[index].completed;
    const updatedTask = { ...task, subtasks: updatedSubTasks };
    updateTask(updatedTask);
  };

  const updateTask = (updatedTask) => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const updatedTasks = storedTasks.map((t) =>
      t.id === task.id ? updatedTask : t
    );
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setTask(updatedTask);
  };

  // Separate subtasks into complete and incomplete arrays
  const incompleteSubtasks = (task?.subtasks || []).filter(
    (subtask) => !subtask.completed
  );
  const completeSubtasks = (task?.subtasks || []).filter(
    (subtask) => subtask.completed
  );

  return (
    <div className="task-details-page">
      <h2 className="task-details-header">Task Details</h2>
      {task ? (
        <>
          <div className="task-name">
            <strong>Task Name:</strong> {task.name}
          </div>
          <div className="task-status">
            <strong>Completed:</strong> {task.completed ? "Yes" : "No"}
          </div>
          <div className="subtask-wrapper">
            <strong className="subtask-title">Subtasks:</strong>
            {incompleteSubtasks.length > -1 && (
              <div className="subtask-content">
                <h3 className="subtask-header">Incomplete Subtasks:</h3>
                <ul>
                  {incompleteSubtasks.map((subtask, index) => (
                    <li
                      key={index}
                      className={subtask.completed ? "completed" : ""}
                    >
                      {subtask.name}
                      <div>
                        <button
                          className="subtask-toggle"
                          onClick={() => toggleSubTaskCompletion(index)}
                        >
                          {subtask.completed
                            ? "Mark Incomplete"
                            : "Mark Completed"}
                        </button>
                        <button
                          className="subtask-delete"
                          onClick={() => deleteSubTask(index)}
                        >
                          Delete
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {completeSubtasks.length > -1 && (
              <div className="subtask-content">
                <h3 className="subtask-header">Complete Subtasks:</h3>
                <ul>
                  {completeSubtasks.map((subtask, index) => (
                    <li key={index} className="completed">
                      {subtask.name}
                      <div>
                        <button
                          className="subtask-toggle"
                          onClick={() => toggleSubTaskCompletion(index)}
                        >
                          Mark Incomplete
                        </button>
                        <button
                          className="subtask-delete"
                          onClick={() => deleteSubTask(index)}
                        >
                          Delete
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="add-subtask">
              <input
                type="text"
                placeholder="Enter a new subtask"
                value={newSubTask}
                onChange={(e) => setNewSubTask(e.target.value)}
              />
              <button className="add-subtask" onClick={addSubTask}>
                Add Subtask
              </button>
            </div>
          </div>
        </>
      ) : (
        <div>Loading...</div>
      )}
      <button className="go-back-button" onClick={() => navigate(-1)}>
        Go Back
      </button>
    </div>
  );
}

export default TaskDetailsPage;
