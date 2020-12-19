import { useEffect, useState, useCallback } from 'react';

function useIdleTimer(timeout = 3000, onActivity, onInactivity) {
    const [timeoutID, setTimeoutID] = useState(null);

    const inactivityHandler = useCallback(() => {
        if (onInactivity) onInactivity();
    }, [onInactivity]);

    const activityHandler = useCallback(
        (event) => {
            if (onActivity) onActivity(event);
            clearTimeout(timeoutID);
            setTimeoutID(setTimeout(inactivityHandler, timeout));
        },
        [timeoutID, inactivityHandler, onActivity, timeout]
    );

    useEffect(() => {
        document.addEventListener('mousemove', activityHandler, false);
        return () => {
            document.removeEventListener('mousemove', activityHandler, false);
        };
    }, [activityHandler]);
}

export default useIdleTimer;
