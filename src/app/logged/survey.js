import { useEffect, useState } from "react";
import { get_survey_res, end_survey, update_wellness } from "@/scripts/scripts";

const survey_questions = [
  {
    question: "How much water have you been drinking today?",
    answers: ["not a lot", "some", "a lot"],
  },
  {
    question: "How much food did you eat in the last 24 hours?",
    answers: ["not a lot", "some", "a lot"],
  },
  {
    question: "How much did you sleep last night?",
    answers: ["< 5 hours", "8+ hours", "5-8 hours"],
  },
  {
    question: "How do you feel?",
    answers: ["bad", "fine", "great"],
  },
];

function Survey({ onClose }) {
  const [curIndex, setCurIndex] = useState(0);
  const [answers, setAnswers] = useState([-1, -1, -1, -1]);
  let el = survey_questions[curIndex];

  useEffect(() => {
    async function get_res() {
    //   console.log("a", curIndex);
      let res = await get_survey_res();
      return res;
    }
    let inter = setInterval(async () => {
      let res = await get_res();
      console.log(res);
      if (res > -1) {
        setAnswers((answers) => [
          ...answers.slice(0, curIndex),
          res,
          ...answers.slice(curIndex + 1),
        ]);
      }
    }, 1000);
    return () => clearInterval(inter);
  }, [curIndex]);

  useEffect(() => {
    async function sendResults() {
      console.log("sent res");
      for (let i = 0; i < 4; i++) if (answers[i] == -1) return;
      let sum = answers.reduce((acc, cur) => acc + cur, 0);
      let p;
      if (sum <= 2) p = sum;
      if (sum > 2 && sum <= 5) p = 3;
      else p = 4;
      await update_wellness(p);
      await end_survey();
      onClose();
    }
    sendResults();
  }, [answers, onClose]);

  return (
    <div>
      <div>
        <div>{el.question}</div>
        {el.answers.map((a, i) => {
          return (
            <div key={`${a}${i}`}>
              <div
                className={answers[curIndex] == i ? "text-green-600" : ""}
              >{`${a}`}</div>
            </div>
          );
        })}
      </div>
      {curIndex > 0 && (
        <div onClick={() => setCurIndex((i) => i - 1)}>&lt;</div>
      )}
      {curIndex < 3 && (
        <div onClick={() => setCurIndex((i) => i + 1)}>&gt;</div>
      )}
    </div>
  );
}

export default Survey;
