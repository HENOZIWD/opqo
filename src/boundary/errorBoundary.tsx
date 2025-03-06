import { Component, ReactElement, ReactNode } from 'react';
import ErrorBoundaryFallback from './errorBoundaryFallback/component';

interface ErrorBoundaryProps {
  fallback?: ReactElement;
  children?: ReactNode;
}

interface ErrorBoundaryState { hasError: boolean }

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: unknown) {
    return { hasError: true };
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return this.props.fallback || (
        <ErrorBoundaryFallback reset={() => {
          this.setState({ hasError: false });
        }}
        />
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
