import { useNavigate } from 'react-router-dom';

export default function TestPage() {
  const navigate = useNavigate();
  return (
    <div>
      <div>ログイン完了</div>
      <button
        onClick={async () => {
          confirm('ログアウトしてもよろしいですか？');
          await fetch('http://localhost:8000/api/logOut');
          navigate('/logIn');
        }}
      >
        ログアウト
      </button>
      <button>なんでもないボタン</button>
    </div>
  );
}
