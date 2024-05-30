import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import Logout from './components/Logout';
import Profile from './components/Profile';
import Register from './components/Register';
import ViewProfile from './components/ViewProfile'
import ImageUpload from './components/ImageUpload';
import Activites from './components/Activities';
import NotFound from './components/NotFound';
import PrivateRoutes from './utils/PrivateRoutes';
import NotAuthRoutes from './utils/NotAuthRoutes';

function App(){
  return (
    <Router>
        <Routes>
          <Route exact path="/" element={ <Home />}  />
          <Route element={<PrivateRoutes />}>
            <Route path="/logout" element={<Logout />}  />
            <Route path="/profile" element={<Profile /> }  />
            <Route path="/dashboard" element={<Activites />}  />
            <Route path="/view" element={<ViewProfile />}  />
            <Route path="/imageUpload" element={<ImageUpload />} />
          </Route> 
          <Route element={<NotAuthRoutes />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register /> } />
          </Route>
          <Route path='*' element={<NotFound />} />
        </Routes>
    </Router>
  );
}
export default App;
