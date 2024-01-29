// TaskItem.js
import React from "react";
import { useDrag } from "react-dnd";

const TaskItem = ({
  task,
  index,
  isCompleted,
  moveTask,
  viewTaskDetails,
  deleteTask,
  markAsCompleted,
  markAsIncomplete,
}) => {
  const [{ isDragging }, drag] = useDrag({
    type: "TASK",
    item: { index, isCompleted },
  });

  return (
    <li ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <div className="task-item">
        <strong>{task.name}</strong>
        <div>
          <button onClick={() => viewTaskDetails(task.id)}>View Task</button>
          <button onClick={() => deleteTask(task.id)}>Delete Task</button>
          {isCompleted ? (
            <button onClick={() => markAsIncomplete(task.id)}>
              Mark as Incomplete
            </button>
          ) : (
            <button onClick={() => markAsCompleted(task.id)}>
              Mark as Completed
            </button>
          )}
        </div>
      </div>
    </li>
  );
};

export default TaskItem;
