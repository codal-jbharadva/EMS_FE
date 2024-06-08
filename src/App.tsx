import './App.css';
import Navbar from './component/navbar/Navbar';
import Home from './pages/home/Home';
import Footer from './component/footer/Footer';
import Details from './pages/details/Details';
import LoginForm from './commoncomponent/login/Login';
import AddEvent from './pages/addEvent/AddEvent';
import { Routes, Route, RouteProps } from 'react-router-dom';
import AddBlog from './commoncomponent/blog/AddBlog';
import SignUpForm from './pages/signup/Signup';
import { useAppSelector } from './hooks/reduxHooks';
import React from 'react';
import NotAuthorized from './commoncomponent/notAuthorized/NotAuthprized';
import BlogDetails from './component/blogDetails/BlogDetails';
import EventList from './component/eventlist/EventList';
import ForgotPasswordForm from './pages/forgotpassword/Forgot';
import UpdatePasswordForm from './pages/resetpassword/ResetPassword';

// Define the route configuration
interface AppRoute extends RouteProps {
  path: string;
  element: React.ReactNode;
  isAdminOnly?: boolean;
}

// Function to check permissions and return the correct component
const permissionCondition = (component: React.ReactNode, isAdminOnly?: boolean) => {
  const { isAdmin } = useAppSelector(state => state.auth);
  if (isAdminOnly && !isAdmin) {
    return <NotAuthorized />;
  }
  return component;
};

const routes: AppRoute[] = [
  { path: '/', element: <Home /> },
  { path: '/details/:id', element: <Details /> },
  { path: '/login', element: <LoginForm /> },
  { path: '/addevent', element: <AddEvent />, isAdminOnly: true },
  { path: '/addblog', element: <AddBlog/>, isAdminOnly: true},
  { path: '/signup', element: <SignUpForm /> },
  { path: '/not-authorized', element: <NotAuthorized /> },
  { path: '/blogdetail/:id', element:<BlogDetails/>},
  { path: '/events', element:<EventList/>},
  { path: '/forgot-password', element: <ForgotPasswordForm/>},
  { path: '/reset-password/:token', element: <UpdatePasswordForm/>}
];

const App: React.FC = () => {
  return (
    <>
      <Navbar />
      <Routes>
        {routes.map(({ path, element, isAdminOnly }) => (
          <Route 
            key={path}
            path={path}
            element={permissionCondition(element, isAdminOnly)}
          />
        ))}
      </Routes>
      <Footer />
    </>
  );
}

export default App;
