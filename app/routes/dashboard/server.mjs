import { json } from "../../../modules/remix/server.mjs";

export function loader() {
  return json([
    { id: 1, name: "Ryan" },
    { id: 2, name: "Pedro" },
  ]);
}
