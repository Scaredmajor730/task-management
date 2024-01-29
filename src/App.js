// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./Components/LandingPage";
import TaskListPage from "./Components/TaskListPage";
import TaskDetailsPage from "./Components/TaskDetailsPage";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

const App = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/tasklist" element={<TaskListPage />} />
          <Route path="/task/:taskId" element={<TaskDetailsPage />} />
        </Routes>
      </Router>
    </DndProvider>
  );
};

export default App;
