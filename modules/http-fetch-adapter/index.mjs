export function createFetchRequest(req) {
  let headers = new Headers(req.headers);
  let url = new URL(req.url, "http://" + headers.get("host"));
  return new Request(url, { headers });
}

export async function sendResponse(fetchResponse, nodeResponse) {
  for (let [k, v] of fetchResponse.headers) {
    nodeResponse.setHeader(k, v);
  }
  nodeResponse.statusCode = fetchResponse.status;

  // wrong but not the point right now ...
  let text = await fetchResponse.text();
  nodeResponse.end(text);
}
