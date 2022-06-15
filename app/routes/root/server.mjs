import { json } from "../../../modules/remix/server.mjs";

export function loader() {
  return json({ title: "Root Loader Data", count: 0 });
}
