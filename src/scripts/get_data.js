async function get_data() {
  // let response = await fetch(`http://${process.env.IP_ADDR}:5000/health`);
  // const json = await response.text();
  console.log(process.env.IP_ADDR);
}

export default get_data;
