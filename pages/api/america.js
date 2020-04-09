import axios from "axios"; 
import { US_STATES_URL } from "../../lib/urls"; 

async function handler(req, res) {
  const response = await axios.get(US_URL); 
  console.log("data: ", ...response.data); 
  res.json({ ...response.data });
}

export default handler;
