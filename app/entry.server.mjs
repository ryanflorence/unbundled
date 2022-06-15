import * as FakeRenderer from "../modules/fake-renderer/server.mjs";

export default function (state) {
  let html = FakeRenderer.renderToString(state);
  let headers = new Headers();
  headers.set("Content-Type", "text/html");
  return new Response(html, { headers });
}
