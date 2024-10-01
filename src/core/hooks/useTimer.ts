import React from "react";

function useTimer() {
    const [timer, setTimer] = React.useState([0, 0, 0]);
    const [pause, setPause] = React.useState(false);

    React.useEffect(() => {
        if (pause) return;
    
        const updateTimer = () => {
            const now = new Date();
            setTimer(() => [now.getHours(), now.getMinutes(), now.getSeconds()]);
        }

        updateTimer();
        setPause(true);
        setTimeout(() => setPause(false), 1000);
    }, [pause]);

    const timerFormatted = React.useCallback(() => {
        return `${timer[0].toString().padStart(2, '0')}:${timer[1].toString().padStart(2, '0')}:${timer[2].toString().padStart(2, '0')}`;
    }, [timer]);

    return { timer, timerFormatted };
}

export default useTimer;