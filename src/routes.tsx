import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import StayDetail from './pages/StayDetail';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/stay/:staySlug" element={<StayDetail />} />
    </Routes>
  );
};

export default AppRoutes; 