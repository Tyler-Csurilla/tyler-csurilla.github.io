import { motion } from "motion/react";
import { Component, ErrorInfo, ReactNode } from "react";
import "./errorBoundary.css";
interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <main id="main-content">
            <motion.div
              className="error-boundary-content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1>Sorry.. there was an error</h1>
              <p style={{ fontSize: "2rem" }}>{this.state.error?.message}</p>
              <button
                onClick={() => (window.location.href = "/")}
                className="home-link"
              >
                Go Home
              </button>
            </motion.div>
          </main>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
