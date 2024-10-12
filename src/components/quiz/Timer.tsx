import { FC, useEffect } from 'react';
import { useTimer } from 'react-timer-hook';

type TimerProps = {
  onExpire: () => void;
  time: number;
}

const Timer: FC<TimerProps> = ({ time, onExpire }) => {
  const expiryTimestamp = new Date();
  expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + time);
  const { seconds, minutes } = useTimer({ expiryTimestamp, onExpire });
  const totalSeconds: number = minutes * 60 + seconds;

  useEffect(() => {
    const cachedProgress = localStorage.getItem("quizProgress");
    if (cachedProgress) {
      const progress = JSON.parse(cachedProgress);
      progress.timer = totalSeconds;
      localStorage.setItem("quizProgress", JSON.stringify(progress));
    }
  }, [totalSeconds]);

  return (
    <p className='font-semibold absolute right-1/2 translate-x-1/2 text-md'>{totalSeconds}</p>
  );
};

export default Timer;
