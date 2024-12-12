import { Routes, Route } from 'react-router-dom';
import NavigatePages from './components/NavigatePages.jsx';
import SignUp from './components/SignUp.jsx';
import LogIn from './components/LogIn.jsx';
import TestPage from './components/TestPage.jsx';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<NavigatePages />} />
      <Route path="/signUp" element={<SignUp />} />
      <Route path="/logIn" element={<LogIn />} />
      <Route path="/test" element={<TestPage />} />
    </Routes>
  );
}
