// import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../style.css';

export default function SignUp() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // //確認用
  // useEffect(() => {
  //   console.log('user_name: ', userName);
  //   console.log('email: ', email);
  //   console.log('password: ', password);
  // }, [userName, email, password]);

  async function saveNewUser() {
    try {
      const userData = {
        user_name: userName,
        email: email,
        password: password,
      };
      const response = await fetch('http://localhost:8000/api/signUp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
        credentials: 'include', // クッキーを含む
      });
      if (response.ok) {
        const successResponse = await response.json();
        alert(successResponse.message);
        navigate('/test');
      } else {
        const errorResponse = await response.json();
        alert(`ERROR MESSAGE: ${errorResponse.message}`);
      }
    } catch (error) {
      alert(error);
    }
  }

  return (
    <div>
      <h1>サインアップ</h1>
      <form
        id="sign_up_form"
        // action="http://localhost:8000/api/signUp"
        // method="post"
        onSubmit={async () => await saveNewUser()}
      >
        <label htmlFor="user_name">ユーザ名：</label>
        <input
          required
          type="text"
          id="user_name"
          // name="user_name"// labelタグはidと紐づくためnameは不要
          autoComplete="username"
          onChange={(e) => {
            e.preventDefault(); // デフォルトのフォーム送信を防ぐ
            setUserName(e.target.value);
          }}
        />
        <br></br>
        <label htmlFor="email">メールアドレス：</label>
        <input
          required
          type="email"
          id="email"
          // name="email"
          autoComplete="email"
          onChange={(e) => {
            e.preventDefault();
            setEmail(e.target.value);
          }}
        />
        <br></br>
        <label htmlFor="password">パスワード：</label>
        <input
          required
          type="password"
          id="password"
          // name="password"
          autoComplete="new-password"
          onChange={(e) => {
            e.preventDefault();
            setPassword(e.target.value);
          }}
        />
        <br></br>
        {/*<label>パスワード 再入力 ※上と同じパスワードを入力してください</label>*/}
        {/*<input required type="password" />*/}
        <input
          type="submit"
          name="sign_up"
          value="登録"
          // onClick={async () => {
          //   await saveNewUser();
          // }}
        />
      </form>
    </div>
  );
}
