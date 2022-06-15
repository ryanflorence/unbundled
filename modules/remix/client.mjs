import { findRoute } from "./utils.mjs";

let moduleCache = {};

export async function loadRouteModule(manifestRoute) {
  let mod = await import(manifestRoute.module);
  moduleCache[manifestRoute.id] = mod;
  return mod;
}

export function getRouteModule(manifestRoute) {
  return moduleCache[manifestRoute.id];
}

export function createLoader(manifestRoute) {
  return async () => {
    loadRouteModule(manifestRoute);
    let data;
    if (manifestRoute.loader) {
      let res = await fetch(`/?_data=${manifestRoute.id}`);
      data = await res.json();
    }
    return data;
  };
}

/**
 *
 * @param {import("@remix-run/router").RouterState} context
 */
export function getHydrationScriptContent({ loaderData }) {
  let json = JSON.stringify({ loaderData, actionData: {}, errors: {} });
  return `window.RemixHydrationData = ${json};`;
}

export function preloadModules(matches, manifest) {
  matches.forEach(match => {
    let manifestRoute = findRoute(manifest.routes, match.route.id);
    loadRouteModule(manifestRoute);
  });
}
