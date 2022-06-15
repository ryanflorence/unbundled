import { json } from "../../../modules/remix/server.mjs";

export function loader() {
  return json("index data");
}
