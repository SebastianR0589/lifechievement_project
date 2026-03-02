import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { useState} from "react";
import axios from "axios";
import TasksPage from './pages/TasksPage';
import RewardsPage from './pages/RewardsPage';
import Header from './components/layout/header/Header';
import Navigation from './components/layout/navigation/Navigation';

function App() {
  const [balance, setBalance] = useState(0);
  const [flash, setFlash] = useState<"gain" | "loss" | null>(null);

  function updateBalance(change?: number) {
    axios.get("http://localhost:8080/api/balance").then((response) => { 
      if (change) setFlash(change > 0 ? "gain" : "loss");
      setBalance(response.data);

      setTimeout(() => setFlash(null), 500);
    });
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Header balance={balance}/>

      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-10">
        <Navigation />

        <Routes>
          <Route path="/tasks" element={<TasksPage onUpdate={updateBalance} />} />
          <Route path="/rewards" element={<RewardsPage onUpdate={updateBalance} />} />
        </Routes>
      </main>
    </div>
  );
}

export default App
