import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Signup } from './pages/signup';
import { Signin } from './pages/signin';
import { Dashboard } from './pages/dashboard';
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/dashboard" element={<Dashboard/>}/>

        </Routes>
      </Router>
    </div>
  );
}

export default App;