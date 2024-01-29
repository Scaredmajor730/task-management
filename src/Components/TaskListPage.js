// TaskListPage.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import TaskItem from "./TaskItem";
import './TaskListPage.css';

const TaskListPage = () => {
  const [tasks, setTasks] = useState([]);
  const [newTaskName, setNewTaskName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch tasks from localStorage or any other source
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  const moveTask = (fromIndex, toIndex, isCompleted) => {
    const updatedTasks = [...tasks];
    const [movedTask] = updatedTasks.splice(fromIndex, 1);
    movedTask.completed = isCompleted;
    updatedTasks.splice(toIndex, 0, movedTask);
    setTasks(updatedTasks);
    // Update localStorage or send to API for persistence
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const markAsCompleted = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: true } : task
    );
    setTasks(updatedTasks);
    // Update localStorage or send to API for persistence
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const markAsIncomplete = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: false } : task
    );
    setTasks(updatedTasks);
    // Update localStorage or send to API for persistence
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const addTask = () => {
    if (newTaskName.trim() !== "") {
      const newTask = {
        id: new Date().getTime(),
        name: newTaskName,
        completed: false,
      };

      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);
      setNewTaskName("");
      // Update localStorage or send to API for persistence
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    }
  };

  const viewTaskDetails = (taskId) => {
    navigate(`/task/${taskId}`);
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    // Update localStorage or send to API for persistence
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="tasks">
        <h2 className="task-list-header">Task List</h2>

        {/* Add Task Section */}
        <div className="input-wrapper">
          <input
            className="form-control"
            type="text"
            placeholder="Enter a new task"
            value={newTaskName}
            onChange={(e) => setNewTaskName(e.target.value)}
          />
          <button onClick={addTask} className="btn">
            Add Task
          </button>
        </div>

        {/* Incomplete Tasks Section */}
        <div className="task-wrapper">
          <h3 className="task-header">Incomplete Tasks</h3>
          <ul>
            {Array.isArray(tasks) &&
              tasks
                .filter((task) => !task.completed)
                .map((task, index) => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    index={index}
                    isCompleted={false}
                    moveTask={moveTask}
                    viewTaskDetails={viewTaskDetails}
                    deleteTask={deleteTask}
                    markAsCompleted={markAsCompleted}
                    markAsIncomplete={markAsIncomplete}
                  />
                ))}
          </ul>
        </div>

        {/* Complete Tasks Section */}
        <div className="task-wrapper">
          <h3 className="task-header">Complete Tasks</h3>
          <ul >
            {Array.isArray(tasks) &&
              tasks
                .filter((task) => task.completed)
                .map((task, index) => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    index={index}
                    isCompleted={true}
                    moveTask={moveTask}
                    viewTaskDetails={viewTaskDetails}
                    deleteTask={deleteTask}
                    markAsCompleted={markAsCompleted}
                    markAsIncomplete={markAsIncomplete}
                  />
                ))}
          </ul>
        </div>
      </div>
    </DndProvider>
  );
};

export default TaskListPage;
