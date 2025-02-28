import { Routes, Route } from 'react-router-dom';
import App from '../App';
import TeamOutings from '../pages/TeamOutings';
import TeamOutingDetail from '../pages/TeamOutingDetail';
import Stays from '../pages/Stays';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/team-outings" element={<TeamOutings />} />
      <Route path="/team-outings/:slug" element={<TeamOutingDetail />} />
      <Route path="/stays" element={<Stays />} />
    </Routes>
  );
};

export default AppRoutes; 