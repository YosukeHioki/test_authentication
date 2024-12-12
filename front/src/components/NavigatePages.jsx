import { useNavigate } from 'react-router-dom';

export default function NavigatePages() {
  //！！！useNavigateフックの呼び出し位置に注意↓
  const navigate = useNavigate();
  function movePages(path) {
    navigate(path);
  }

  return (
    <div>
      <h1>ページ移動出来ます</h1>
      <button onClick={() => movePages('/signUp')}>サインインページへ</button>
      <button onClick={() => movePages('/logIn')}>ログインページへ</button>
    </div>
  );
}
