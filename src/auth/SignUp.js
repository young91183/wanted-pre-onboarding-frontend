import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function SignUp() {
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

            if (password.length < 8) {
                setError('비밀번호는 최소 8자 이상이어야 합니다.');
                return;
            }
            
            // 회원가입
            const response = await axios.post('https://www.pre-onboarding-selection-task.shop/auth/signup', {
                email,
                password,
            });

            console.log(response)
            // 페이지 이동
            move_page('/signin');

        } catch (error) {
            setError('회원가입에 실패했습니다.');
        }
  };

  return (
    <div>
        <h2>회원가입</h2>
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
            placeholder="비밀번호 (최소 8자 이상)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            data-testid="password-input"
            />
            <button 
            type="submit" 
            data-testid="signup-button" 
            disabled={!isFormValid}>
                회원가입
            </button>
        </form>
    </div>
  );
}

export default SignUp;
