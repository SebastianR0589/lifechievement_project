import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import { useState} from "react";
import axios from "axios";
import TasksPage from './pages/TasksPage';
import RewardsPage from './pages/RewardsPage';
import Header from './components/header/Header';
import Balance from './components/balance/Balance';


function App() {

  const [balance, setBalance] = useState(0);

  function updateBalance() {
    axios.get("http://localhost:8080/api/balance").then((response) => {
      setBalance(response.data);
    });
  }

  return (
   <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
    <Header />
    <Balance balance={balance} />  
    <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-10">
      <div className="App">
        <nav>
          <ul>
            <li><Link to="/tasks">Tasks</Link></li>
            <li><Link to="/rewards">Rewards</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/tasks" element={<TasksPage onUpdate={updateBalance} />} />
          <Route path="/rewards" element={<RewardsPage onUpdate={updateBalance}/>} />
        </Routes>
      </div>
      </main>
    </div>
  )
}

export default App
