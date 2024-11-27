const PREFIX = `http://3.86.191.26:5000/`;

async function get_user_data(user) {
  let response = await fetch(`${PREFIX}get-user-data?user=${user}`);
  const json = await response.json();
  return json;
}

async function start_survey() {
  await fetch(`${PREFIX}start-survey`);
}

async function get_survey_res() {
  let response = await fetch(`${PREFIX}get-survey-res`);
  const text = await response.text();
  return parseInt(text);
}

async function end_survey() {
  await fetch(`${PREFIX}end-survey`);
}

async function set_timer() {
  await fetch(`${PREFIX}set-timer`);
}

async function get_temp_timer() {
  const res = await fetch(`${PREFIX}get-temp-timer`);
  const text = await res.text();
  console.log(text);
  return parseInt(text);
}

async function cancel_timer() {
  await fetch(`${PREFIX}cancel-timer`);
}

async function start_exercise() {
  const time = Math.floor(Date.now() / 1000);
  await fetch(`${PREFIX}start-exercise?time=${time}`);
}

async function stop_exercise() {
  await fetch(`${PREFIX}stop-exercise`);
}

async function update_wellness(wellness) {
  await fetch(`${PREFIX}update-wellness?wellness=${wellness}`);
}

async function set_goal(start, duration, calories) {
  await fetch(
    `${PREFIX}set-goal?start=${start}&calories=${calories}&duration=${duration}`
  );
}

export {
  get_user_data,
  start_survey,
  end_survey,
  start_exercise,
  stop_exercise,
  get_survey_res,
  set_timer,
  get_temp_timer,
  cancel_timer,
  update_wellness,
  set_goal,
};
