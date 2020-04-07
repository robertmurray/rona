import axios from "axios"; 
import { US_STATES_URL } from "../../lib/urls"; 

async function handler(req, res) {
  const response = await axios.get(US_STATES_URL); 
  res.json({ ...response.data });
}

export default handler;
