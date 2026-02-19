import { BrowserRouter as Router, Routes, Route, Link, BrowserRouter } from 'react-router-dom';
import { useState } from 'react'
import TasksPage from './pages/TasksPage';
import RewardsPage from './pages/RewardsPage';
import './App.css'


function App() {


  return (
    <BrowserRouter>
      <div className="App">
        <nav>
          <ul>
            <li><Link to="/tasks">Tasks</Link></li>
            <li><Link to="/rewards">Rewards</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/rewards" element={<RewardsPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
