"use client";
import {
  get_user_data,
  start_survey,
  end_survey,
  start_exercise,
  stop_exercise,
  get_survey_res,
  set_timer,
  cancel_timer,
  update_wellness,
  set_goal,
} from "@/scripts/scripts";
import { NextUIProvider } from "@nextui-org/react";
import { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import NewGoal from "./new_goal";
import Data from "./data";
import Survey from "./survey";
import StartExercise from "./start_exercise";

function Logged({ user }) {
  const [data, setData] = useState({});
  const [option, setOption] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();

  //   useEffect(() => {
  //     const cur_user = user ? user : "me";

  //     async function get_data() {
  //       let res = await get_user_data(cur_user);
  //       return res;
  //     }

  //     let inter = setInterval(async () => {
  //       let res = await get_data();
  //       setData(res);
  //     }, 5000);
  //     return () => clearInterval(inter);
  //   }, [user]);
  useEffect(() => {
    // console.log("meow");
    async function reset() {
      await cancel_timer();
    }
    if (!isOpen) {
      reset();
    }
  }, [isOpen]);

  async function handleOnClick(option_set) {
    if (option_set == "exercise") {
      await set_timer();
    }
    if (option_set == "survey") {
      await start_survey();
    }
    const cur_user = user ? user : "me";
    get_user_data(cur_user).then((res) => setData(res));
    setOption(option_set);
    onOpen();
  }
  return (
    <NextUIProvider>
      <div>hello</div>
      <div onClick={() => handleOnClick("exercise")}>
        <div>Start Exercise</div>
      </div>

      <div onClick={() => handleOnClick("stats")}>
        <div>See stats</div>
      </div>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody className=" min-h-11">
                {option == "exercise" && <StartExercise />}
                {option == "new goal" && <NewGoal onClose={onClose} />}
                {option == "stats" && <Data data={data} />}
                {option == "survey" && <Survey onClose={onClose} />}
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>

      <div>
        <div onClick={() => handleOnClick("new goal")}>Set new Goal</div>
      </div>

      <div onClick={() => handleOnClick("survey")}>
        <div>Start Survey</div>
      </div>
    </NextUIProvider>
  );
}

export default Logged;
