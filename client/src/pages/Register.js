import React, { useState } from 'react';
import { Button, TextField, Container, Typography } from '@material-ui/core';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';


function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");  // Added state variable for email
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");  // Added state variable for confirmPassword
    const history = useNavigate();


    const handleSubmit = (e) => {
        e.preventDefault();

        // Check if passwords match
        if (password !== confirmPassword) {
            console.error("Passwords do not match!");
            return;
        }

        axios.post('http://localhost:5000/api/register', { username, email, password })
        .then(response => {
            if (response.data.success) {
                console.log("User registered successfully");
                Navigate('/dashboard');  // Redirect to the Dashboard
            } else {
                console.error("Registration error");
            }
        })
        .catch(error => {
            console.error("Server error", error);
        });    
    }

    return (
        <Container component="main" maxWidth="xs">
            <Typography component="h1" variant="h5">
                Register
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
                    id="email"
                    label="Email"
                    name="email"
                    autoComplete="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
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
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    id="confirm-password"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                >
                    Register
                </Button>
            </form>
        </Container>
    );
}

export default Register;
