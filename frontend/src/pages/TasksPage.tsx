import { useEffect, useState } from "react";
import axios from "axios";


export default function TasksPage() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {axios.get("http://localhost:8080/api/tasks").then((response) => {
        setTasks(response.data);
    });}, []);

  return (
    <>
    <div>
      <h1>Tasks</h1>
<p>This is the Tasks page.</p>    
      {tasks.map((task) => (
        <div key={task.id}>
          <p>{task.description}</p>
          <p>{task.points}</p>
          <p>{task.status ? "Completed" : "Not completed"}</p>
        </div>
      ))}
    </div>
    <button onClick={() => {axios.post("http://localhost:8080/api/tasks", {description: "New Task", points: 50, status: false}).then(() => {window.location.reload();})}}>Add Task</button>
        </>
  );
}