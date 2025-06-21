import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Signup } from './pages/signup';
import { Signin } from './pages/signin';
import { Dashboard } from './pages/dashboard';
import { SendMoney } from './pages/SendMoney';
import { PublicRoute } from './components/PublicRoute';
import { ProtectedRoute } from './components/ProtectedRoute';
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/signup" element={<PublicRoute><Signup/> </PublicRoute>} />
          <Route path="/signin" element={<PublicRoute><Signin /> </PublicRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute>
          <Dashboard/></ProtectedRoute> }/>
          <Route path="/send" element={<SendMoney/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;