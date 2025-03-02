import { Outlet } from "react-router-dom";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
import { Footer } from "../Footer/Footer";
import Navigation from "../Navigation/Navigation";
import ParticlesBackground from "../ParticleBackground/ParticleBackground";
import "./AppLayout.css";

const AppLayout: React.FC = () => {
  return (
    <div className="app-layout">
      <ErrorBoundary>
        <Navigation />
        <ParticlesBackground />
        <main className="app-layout__main-content">
          <Outlet />
        </main>
        <Footer />
      </ErrorBoundary>
    </div>
  );
};

export default AppLayout;
