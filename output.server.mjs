import entry from "./app/entry.server.mjs";
import manifest from "./output.manifest.mjs";

async function recurseRoutes(manifestRoutes) {
  let routes = [];
  for (let manifestRoute of manifestRoutes) {
    let routePath = `./app/routes/${manifestRoute.id}`;
    let [renderModule, serverModule] = await Promise.all([
      import(`${routePath}/render.mjs`),
      import(`${routePath}/server.mjs`),
    ]);

    let route = {
      id: manifestRoute.id,
      path: manifestRoute.path,
      index: manifestRoute.index,
      loader: serverModule.loader,
      render: renderModule.render,
    };
    if (manifestRoute.children) {
      route.children = await recurseRoutes(manifestRoute.children);
    }
    routes.push(route);
  }
  return routes;
}

export async function getRemixEntry() {
  return { entry, routes: await recurseRoutes(manifest.routes) };
}
