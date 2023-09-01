import React, { useState } from 'react';
import { Button, TextField, Container, Typography } from '@material-ui/core';
import axios from 'axios';

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        
        axios.post('/api/login', { username, password })
            .then(response => {
                if (response.data.success) {
                    localStorage.setItem('userToken', response.data.token);
                    // Here, you can add logic to redirect to the dashboard or handle other tasks post-login.
                } else {
                    console.error("Login error");
                }
            })
            .catch(error => {
                console.error("Server error", error);
            });
    }

    return (
        <Container component="main" maxWidth="xs">
            <Typography component="h1" variant="h5">
                Login
            </Typography>
            
            <form noValidate onSubmit={handleSubmit}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                    autoFocus
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
                
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                >
                    Login
                </Button>
            </form>
        </Container>
    );
}

export default Login;
