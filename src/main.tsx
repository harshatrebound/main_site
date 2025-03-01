import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import TeamOutingRegions from './pages/TeamOutingRegions'
import Destinations from './pages/Destinations'
import CorporateTeamOutingPlaces from './pages/CorporateTeamOutingPlaces'
import DestinationDetail from './pages/DestinationDetail'
import StayDetail from './pages/StayDetail/index'
import Stays from './pages/Stays'
import TeamOutings from './pages/TeamOutings'
import TeamOutingDetail from './pages/TeamOutingDetail'
import Activities from './pages/Activities'
import ActivityDetail from './pages/ActivityDetail'
import JobsPage from './pages/Jobs'
import { CombinedProvider } from './contexts/TeamOutingAdsContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CombinedProvider>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/team-outing-regions" element={<TeamOutingRegions />} />
          <Route path="/team-outing-regions/:regionSlug" element={<Destinations />} />
          <Route path="/corporate-team-outing-places" element={<CorporateTeamOutingPlaces />} />
          <Route path="/corporate-team-outing-places/:destinationSlug" element={<DestinationDetail />} />
          <Route path="/stays" element={<Stays />} />
          <Route path="/stays/:staySlug" element={<StayDetail />} />
          <Route path="/team-outings" element={<TeamOutings />} />
          <Route path="/team-outings/:slug" element={<TeamOutingDetail />} />
          <Route path="/team-building-activity" element={<Activities />} />
          <Route path="/team-building-activity/:slug" element={<ActivityDetail />} />
          <Route path="/jobs" element={<JobsPage />} />
        </Routes>
      </Router>
    </CombinedProvider>
  </StrictMode>,
)
