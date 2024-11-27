import {
  get_temp_timer,
  start_exercise,
  stop_exercise,
} from "@/scripts/scripts";
import { useEffect, useState } from "react";

function StartExercise() {
  const [countdown, setCountdown] = useState(30);
  const [timer, setTimer] = useState(30);
  useEffect(() => {
    let inter = setInterval(async () => {
      let res = await get_temp_timer();
      setTimer(res);
    }, 500);
    return () => clearInterval(inter);
  }, []);

  async function start() {
    setCountdown(timer);
    let c = timer * 1000;
    await start_exercise();
    setTimeout(async () => {
      await stop_exercise();
    }, c);
  }

  return (
    <div>
      <div>{`exercising for: ${timer} seconds`}</div>
      <div onClick={start}>Start!</div>
    </div>
  );
}

export default StartExercise;
