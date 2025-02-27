import { motion } from "motion/react";
import { Link } from "react-router-dom";
import "./NotFoundPage.css";

const NotFoundPage: React.FC = () => {
  return (
    <div className="not-found-page">
      <motion.div
        className="not-found-page__content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="not-found-page__title">404</h1>
        <h2 className="not-found-page__subtitle">Page Not Found</h2>
        <p className="not-found-page__text">
          The page you're looking for doesn't exist or was moved.
        </p>
        <Link to="/" className="not-found-page__home-link">
          Go Home
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;
