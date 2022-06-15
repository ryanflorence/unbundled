import { json } from "@remix-run/router";

export function loader() {
  return json("index data");
}
