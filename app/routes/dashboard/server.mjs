import { json } from "@remix-run/router";

export function loader() {
  return json([
    { id: 1, name: "Ryan" },
    { id: 2, name: "Pedro" },
  ]);
}
