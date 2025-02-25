import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import './notfound.css';

const NotFoundPage: React.FC = () => {
    return (
        <div className="not-found">
            <motion.div
                className="not-found-content"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1>404</h1>
                <h2>Page Not Found</h2>
                <p>The page you're looking for doesn't exist or was moved.</p>
                <Link to="/" className="home-link">Go Home</Link>
            </motion.div>
        </div>
    );
};

export default NotFoundPage;
