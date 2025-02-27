import { useEffect, useRef } from 'react';

export function useAbortController() {
  const abortControllers = useRef<AbortController[]>([]);

  useEffect(() => {
    const controllers = abortControllers.current;
    return () => {
      controllers.forEach((controller) => {
        controller.abort();
      });
      abortControllers.current = [];
    };
  }, []);

  const createAbortController = () => {
    const controller = new AbortController();
    abortControllers.current.push(controller);

    return controller;
  };

  return { createAbortController };
}
