import { createBrowserRouter } from "@remix-run/router";
import {
  createLoader,
  getRouteModule,
  loadRouteModule,
  preloadModules,
} from "../remix/client.mjs";
import { findRoute } from "../remix/utils.mjs";

export function hydrate() {
  let manifest = window.AppManifest;
  let routes = recurseRoutes(manifest.routes);

  let router = createBrowserRouter({
    routes,
    hydrationData: window.RemixHydrationData,
  });

  router.initialize();
  router.subscribe(state => {
    if (state.navigation.state === "idle") {
      let html = render(state, manifest);
      document.open();
      document.write(html);
      document.close();
      delegateLinks(router);
    }
  });

  preloadModules(router.state.matches, manifest);
  delegateLinks(router);
}

function delegateLinks(router) {
  document.addEventListener("click", event => {
    let el = event.target.closest("a[href]");
    if (!el) return;
    event.preventDefault();
    let path = el.getAttribute("href");
    router.navigate(path);
  });
}

export function render(state, manifest) {
  return state.matches.reduceRight((children, match) => {
    let manifestRoute = findRoute(manifest.routes, match.route.id);
    let mod = getRouteModule(manifestRoute);
    let data = state.loaderData[match.route.id];
    return mod.render({ data, children, context: state });
  }, "");
}

function recurseRoutes(manifestRoutes, routes = []) {
  for (let manifestRoute of manifestRoutes) {
    let route = {
      id: manifestRoute.id,
      path: manifestRoute.path,
      index: manifestRoute.index,
      loader: createLoader(manifestRoute),
    };
    if (manifestRoute.children) {
      route.children = recurseRoutes(manifestRoute.children);
    }
    routes.push(route);
  }
  return routes;
}
