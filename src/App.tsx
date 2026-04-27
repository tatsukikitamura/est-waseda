import { useEffect } from 'react';
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import { useReveal } from './hooks/useReveal';
import Header from './components/Header';
import Footer from './components/sections/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import StoryPage from './pages/StoryPage';
import InfoPage from './pages/InfoPage';
import JoinPage from './pages/JoinPage';

const basename = import.meta.env.BASE_URL.replace(/\/$/, '');

function Layout() {
  const { pathname } = useLocation();
  useReveal(pathname);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/story" element={<StoryPage />} />
        <Route path="/info" element={<InfoPage />} />
        <Route path="/join" element={<JoinPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter basename={basename}>
      <Layout />
    </BrowserRouter>
  );
}
