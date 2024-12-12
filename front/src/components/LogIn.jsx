// import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import '../style.css';

export default function LogIn() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const userData = {
    user_name: userName,
    password: password,
  };

  async function logInAuth() {
    const response = await fetch('http://localhost:8000/api/logIn', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
      credentials: 'include', // クッキーを含める
    });
    if (response.ok) {
      const successResponse = await response.json();
      alert(successResponse.message);
      navigate('/test');
    } else {
      const errorResponse = await response.json();
      alert(errorResponse.message);
    }
  }

  return (
    <div>
      <h1>ログイン</h1>
      <form id="log_in_form" onSubmit={async () => await logInAuth()}>
        <label htmlFor="user_name">ユーザ名：</label>
        <input
          required
          type="text"
          id="user_name"
          // name="user_name"
          autoComplete="username"
          onChange={(e) => setUserName(e.target.value)}
        />
        <br></br>
        <label htmlFor="password">パスワード：</label>
        <input
          required
          type="password"
          id="password"
          // name="password"
          autoComplete="current-password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <br></br>
        <input type="submit" name="sign_up" value="ログイン" />
      </form>
    </div>
  );
}
