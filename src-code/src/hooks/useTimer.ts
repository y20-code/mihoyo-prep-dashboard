import {useState,useRef,useEffect,useCallback} from 'react';

interface UseTimerReturn {
    timeLeft: number;
    isActive: boolean;
    start: () => void;
    pause: () => void;
    reset: () => void;
    formattedTime:string;

}

export function useTimer(initialTime:number = 25 * 60,onFinish?: () => void): UseTimerReturn{
    const [timeLeft,setTimeLeft] = useState(initialTime)
    const [isActive,setIsActive] = useState(false)
    const timerRef = useRef<number | null>(null)

    const formattedTime = (() =>{
        const m = Math.floor(timeLeft / 60)
        const s = timeLeft % 60
        return `${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`
    })();


    const start = useCallback(() =>{
        if (isActive) return;
        setIsActive(true);
        timerRef.current = setInterval(() =>{
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    if (timerRef.current) {
                        clearInterval(timerRef.current)
                    }
                    setIsActive(false)
                    if (onFinish) {
                        onFinish()
                    }
                    return 0
                }
                return prev - 1
            })
        },1000)
    },[isActive,onFinish]);

    const pause = useCallback(() =>{
        if (timerRef.current) {
            clearInterval(timerRef.current)
        }
        setIsActive(false)
    },[]);

    const reset = useCallback(() =>{
        if (timerRef.current) {
            clearInterval(timerRef.current)
        }
        setTimeLeft(initialTime)
        setIsActive(false)
    },[initialTime]);

    useEffect(() =>{
        return () =>{
            if (timerRef.current) {
                clearInterval(timerRef.current)
            }
        }
    },[])

    return {
        timeLeft,
        isActive,
        start,
        pause,
        reset,
        formattedTime
    }


}