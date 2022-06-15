import { createMemoryRouter } from "@remix-run/router";
import { findRoute } from "./utils.mjs";

export function createHandler({ routes, entry }) {
  return async request => {
    let url = new URL(request.url);
    if (url.searchParams.has("_data")) {
      return loadRouteData(routes, url, request);
    } else {
      let state = await loadPageData(routes, url);
      return entry(state);
    }
  };
}

async function loadRouteData(routes, url, request) {
  let routeId = url.searchParams.get("_data");
  let route = findRoute(routes, routeId);
  return route.loader({ request });
}

// TODO: should be in @remix-run/router and not a hack like this
async function loadPageData(routes, url) {
  return new Promise(res => {
    let router = createMemoryRouter({
      routes,
      initialEntries: [url.pathname],
    });
    router.initialize();
    router.subscribe(state => {
      router.dispose();
      res(state);
    });
  });
}
