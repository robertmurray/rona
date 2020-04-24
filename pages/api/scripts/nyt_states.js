import axios from "axios";
import faunadb from "faunadb";
import dotenv from "dotenv";

import { NYT_STATES_CSV } from "../../../lib/urls";

dotenv.config();

async function handler(req, res) {
  // const q = faunadb.query;
  // const client = new faunadb.Client({ secret: process.env.FAUNADB_RONA_SECRET });
  // // const dbs = await client.query(q.Paginate(q.Keys()));

  // // const col = await client.query(q.Get(q.Collection('ny_times_us_states')));

  let r = [];

  // const raw_csv = await axios.get(NYT_STATES_CSV);
  // const data = raw_csv.data.split("\n");
  // // console.log("dbs: ", dbs);
  // // console.log("cols:", col);

  // data.map(item => {
  //   const [date, state, fips, cases, deaths] = item.split(",");

  //   const data = { date, state, fips: parseInt(fips), cases: parseInt(cases), deaths: parseInt(deaths) };

  //   client.query(
  //     q.Create(q.Collection("ny_times_us_states"), {
  //       data
  //     })
  //   );
  //   r.push(data);
  // })
  res.json(r);
}

export default handler;
