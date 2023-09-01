import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Button from '@material-ui/core/Button';
import PrivateRoute from './PrivateRoute'; // Adjust the path if you placed it in another directory


function Navbar() {
    return (
        <div style={{ padding: '20px', background: '#f7f7f7', marginBottom: '20px', display: 'flex', justifyContent: 'space-around' }}>
            <Button component={Link} to="/login" variant="outlined" color="primary">Login</Button>
            <Button component={Link} to="/register" variant="outlined" color="primary">Register</Button>
            <Button component={Link} to="/dashboard" variant="outlined" color="primary">Dashboard</Button>
        </div>
    );
}

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
                {/* Default Route */}
                <Route path="/" element={<Login />} />
            </Routes>
        </Router>
    );
}

export default App;
