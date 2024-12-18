import ReactAudioPlayer from "react-audio-player";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const wellness = ["Bad :(", "Meh", "Fair", "Good", "Great :)"];

function Data({ data }) {
  // console.log(v1);
  function turn_date_to_str(date) {
    let d = new Date(date);
    return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()} at ${d
      .getHours()
      .toString()
      .padStart(2, "0")}:${d.getMinutes().toString().padStart(2, "0")} - `;
  }

  function isAcheived(start, end, cal) {
    let t = 0;
    for (let el of data?.data) {
      if (
        (el["start_time"] >= start && el["start_time"] <= end) ||
        (el["end_time"] >= start && el["end_time"] <= end)
      ) {
        t += el.calories;
      }
    }
    if (t >= cal) return true;
    return false;
  }

  console.log(data);

  const rand = Math.floor(Math.random() * 4) + 1;

  return (
    <div>
      <ReactAudioPlayer src={`/v${rand}.mp3`} autoPlay={true} />
      <div>
        {data?.data
          ? data?.data.map((el, i) => {
              return (
                <div key={i}>
                  {`${turn_date_to_str(el["start_time"] * 1000)} you walked ${
                    el.num_steps
                  } steps and burned ${el.calories} calories`}
                </div>
              );
            })
          : null}
      </div>
      <div>
        {data?.goals
          ? data?.goals.map((el, i) => {
              return (
                <div
                  key={i}
                  className={
                    isAcheived(el.start, el.end, el.calories)
                      ? "text-green-600"
                      : " text-red-600"
                  }
                >
                  {`${turn_date_to_str(el["start"] * 1000)} ${
                    el.calories
                  } calories in ${el.end - el["start"]} seconds`}
                </div>
              );
            })
          : null}
      </div>

      <div>Your wellness status is: {wellness[data.wellness]}</div>
    </div>
  );
}

export default Data;
