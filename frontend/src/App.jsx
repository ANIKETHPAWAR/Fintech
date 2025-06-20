import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Signup } from './pages/signup';
import { Signin } from './pages/signin';
import { Dashboard } from './pages/dashboard';
import { SendMoney } from './pages/SendMoney';
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/send" element={<SendMoney/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;