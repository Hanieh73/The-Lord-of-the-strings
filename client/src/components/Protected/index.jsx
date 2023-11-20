import { Navigate, Outlet } from 'react-router-dom';
import { useExample } from '../../contexts';

const Protected = ({ children }) => {
  const { isLoggedIn } = useExample();
  if (!localStorage.token) {
    return (
      <>
        <Navigate to="/login" replace />
      </>
    );
  }
  return children;
};
export default Protected;
