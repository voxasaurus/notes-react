import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Typography } from '@material-ui/core';

function Dashboard() {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('userToken');
        if (!token) {
            navigate('/login');
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('userToken');
        navigate('/login');  // Redirecting to login page on logout
    }

    return (
        <Container component="main" maxWidth="md">
            <Typography component="h1" variant="h5">
                Welcome to your Dashboard!
            </Typography>
            {/* Here you can list user-specific data or any other content you want */}
            
            <Button
                onClick={handleLogout}
                variant="contained"
                color="secondary"
            >
                Logout
            </Button>
        </Container>
    );
}

export default Dashboard;
