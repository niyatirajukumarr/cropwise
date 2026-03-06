// src/ErrorBoundary.jsx
import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          background: 'linear-gradient(170deg,#fff8ee 0%,#fdf0d8 40%,#f5e4b8 75%,#e8d090 100%)',
          fontFamily: "'Sora', sans-serif",
          color: '#3a1f00',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: 48, marginBottom: 20 }}>🌾</div>
          <h2 style={{ fontSize: 24, marginBottom: 10 }}>Something went wrong</h2>
          <p style={{ color: '#b85c00', marginBottom: 20, maxWidth: 400 }}>
            {this.state.error?.message || 'An unexpected error occurred'}
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '12px 30px',
              background: 'linear-gradient(135deg,#7a3a00,#b85c00,#d47020)',
              border: 'none',
              borderRadius: 50,
              color: '#fff8e8',
              fontSize: 16,
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 4px 20px rgba(140,60,0,0.4)'
            }}
          >
            Reload App
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;