import axios from axios; 
import { US_STATES_URL } from "../lib/urls"; 

async function handler(req, res) {
  // Run the middleware
  // await runMiddleware(req, res, cors);
  const states = await axios.get(US_STATES_URL); 
  console.log("states: ", states); 
  // Rest of the API logic
  res.json({ data: states });
}

export default handler;
