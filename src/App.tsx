
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './components/Home';
import Header from './components/layout/Header';
import Login from './components/user/Login';
import Registration from './components/user/Registration';
import Profile from './components/profile/Profile';
import ProtectedRoute from './components/protectedRoutes/ProtectedRoute';

const App = () => {
  const location = useLocation();

  const isLoginOrSignup =
    location.pathname === '/login' ||
    location.pathname === '/signup' ||
    location.pathname === '/forgetpassword';

  return (
    <div>
      {!isLoginOrSignup && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Registration />} />
        <Route path="/profile" element={<ProtectedRoute />}>
          <Route index element={<Profile />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
