import { Outlet } from "react-router-dom";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
import { Footer } from "../Footer/Footer";
import Navigation from "../Navigation/Navigation";
import "./appLayout.css";

const AppLayout: React.FC = () => {
  return (
    <div id="app-layout">
      <ErrorBoundary>
        <Navigation />
        <main id="main-content">
          <Outlet />
        </main>
        <Footer />
      </ErrorBoundary>
    </div>
  );
};

export default AppLayout;
