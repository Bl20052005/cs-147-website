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

import Logged from "./logged";

function Page() {
  return <Logged user="waldo" />;
}

export default Page;
