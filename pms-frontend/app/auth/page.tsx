"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import SendingData from "../sendingData/page";
import LoginPage from '../login/page';

export default function AuthPage({ }) {

    const [Login, setLogin] = useState(true);
    const [Register, setRegister] = useState(false);

    const isAuthenticated = false;
    useEffect(() => {
        if (isAuthenticated) {
            <LoginPage />
        }
    }, []);
    function handleLogin() {
        return (
            <div>
                <h1>Welcome to login</h1>
            </div>
        );
    }
    function handleRegister() {
        return (
            <div>
                <h1>Welcome to register</h1>
            </div>
        );
    }
    return (
        <div>
            <div>
                <button onClick={() => handleLogin()}>Login</button>
                <button onClick={() => handleRegister()}>Register</button>
            </div>
        </div>
    );
}
