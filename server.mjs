import { createServer } from "http";
import * as Static from "node-static";

import * as NodeAdapter from "./modules/http-fetch-adapter/index.mjs";
import * as Remix from "./modules/remix/server.mjs";

import * as Bundler from "./output.server.mjs";

let staticHandler = new Static.Server(process.cwd());
let remixHandler = Remix.createHandler(await Bundler.getRemixEntry());

createServer(async (req, res) => {
  if (
    req.url.endsWith(".mjs") ||
    req.url.endsWith(".js") ||
    req.url.endsWith(".map")
  ) {
    return staticHandler.serve(req, res);
  }

  let request = NodeAdapter.createFetchRequest(req);
  let response = await remixHandler(request);
  NodeAdapter.sendResponse(response, res);
}).listen(3000);
