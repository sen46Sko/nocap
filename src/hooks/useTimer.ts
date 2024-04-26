import {useCallback, useEffect, useState} from 'react';

export function useTimer() {
  const [value, setValue] = useState(0);
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);

  const clearTimer = useCallback(() => {
    if (timerId) {
      clearInterval(timerId);
      setTimerId(null);
      setValue(0);
    }
  }, [timerId]);

  const setTimer = useCallback((seconds: number) => {
    setValue(seconds);

    const timer = setInterval(() => {
      setValue(current => {
        const timeLeft = current - 1;

        if (timeLeft <= 0) {
          clearInterval(timer);
          return 0;
        }
        return timeLeft;
      });
    }, 1000);

    setTimerId(timer);
  }, []);

  useEffect(() => {
    return () => {
      if (timerId) {
        clearInterval(timerId);
      }
    };
  }, [timerId]);

  return {
    current: value,
    setTimer,
    clearTimer,
  };
}
