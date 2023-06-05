"use client";

import {unknown} from "zod";
import { useState } from "react";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import {gql} from "@apollo/client";

export const dynamic = "force-dynamic";


const query = gql`query {
  launchLatest {
    mission_name
  }
}`

export default function PollPage() {
  const [count, setCount] = useState(0);

  const { data} = useSuspenseQuery(query);

  return <div key={data.launchLatest.mission_name}>
    <p>You clicked the Count++ button {count} times</p>
    <button onClick={() => setCount(count + 1)}>Count++</button>
    {data.launchLatest.mission_name}
  </div>;
};
