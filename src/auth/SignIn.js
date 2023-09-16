import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function SignIn() {
    const [error, setError] = useState('');
    const move_page = useNavigate(); 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const isEmailValid = email.includes('@');
    const isPasswordValid = password.length >= 8;
    const isFormValid = isEmailValid && isPasswordValid;

    const handleSubmit = async (e) => { 
        e.preventDefault();

        try {
            
            // 로그인 요청
            const response = await axios.post('https://www.pre-onboarding-selection-task.shop/auth/signin', {
            email,
            password,
            });

            console.log(response);

            // 토큰 추출
            const { access_token } = response.data;
            localStorage.setItem('token', access_token);

            // 페이지 이동
            move_page('/todo');

        } catch (error) {
            setError('로그인에 실패했습니다.');
        }
    };
        
    return (
        <div>
            <h2>로그인 Page</h2>
            {error && <div style={{ color: 'red' }}>{error}</div>}
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
                <button 
                    type="submit" 
                    data-testid="signin-button" 
                    disabled={!isFormValid}>
                    로그인
                </button>
            </form>
        </div>
    );
}
export default SignIn;
