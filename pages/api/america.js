import axios from "axios"; 
import { US_URL } from "../../lib/urls"; 

async function handler(req, res) {
  const response = await axios.get(US_URL); 
  return res.json(response.data[0]);
}

export default handler;
