import { json } from "@remix-run/router";

export function loader() {
  return json({ title: "Root Loader Data", count: 0 });
}
