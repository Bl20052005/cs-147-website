import { Button } from "@nextui-org/react";
import { set_goal } from "@/scripts/scripts";
import { useState } from "react";

function NewGoal({ onClose }) {
  const [cal, setCal] = useState(0);
  const [sec, setSec] = useState(0);

  async function handleClose() {
    let start = Math.floor(Date.now() / 1000);
    set_goal(start, sec, cal);
    onClose();
  }

  return (
    <div className="flex flex-col">
      <div>How many calories?</div>
      <input
        className="border-black border-2"
        type="number"
        onChange={(e) => setCal(e.target.value)}
      />
      <div>How many seconds?</div>
      <input
        className="border-black border-2"
        type="number"
        onChange={(e) => setSec(e.target.value)}
      />
      <Button onPress={handleClose}>Send!</Button>
    </div>
  );
}

export default NewGoal;
