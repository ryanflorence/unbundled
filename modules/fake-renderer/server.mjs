import { createBrowserRouter } from "@remix-run/router";

/**
 *
 * @param {import("@remix-run/router").RouterState} state
 */
export function renderToString(context) {
  return context.matches.reduceRight((children, match) => {
    let data = context.loaderData[match.route.id];
    return match.route.render({ data, children, context });
  }, "");
}
