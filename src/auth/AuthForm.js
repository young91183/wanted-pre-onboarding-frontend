import React, { useState } from 'react';

function AuthForm({ onSubmit }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ email, password });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            data-testid="email-input"
            />
            <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            data-testid="password-input"
            />
        </form>
    );
}
export default AuthForm;
