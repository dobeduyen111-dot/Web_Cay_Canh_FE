import { Component } from 'react';
import { Navigate } from 'react-router-dom';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      redirectToDashboard: false,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="bg-surface p-8 rounded-lg shadow-lg text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Đã xảy ra lỗi</h1>
            <p className="text-text mb-4">Xin lỗi, có lỗi không mong muốn xảy ra.</p>
            <button
              onClick={() => this.setState({ hasError: false, error: null, redirectToDashboard: true })}
              className="bg-primary text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Quay về tổng quan
            </button>
          </div>
        </div>
      );
    }

    if (this.state.redirectToDashboard) {
      return <Navigate to="/admin/dashboard" replace />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
