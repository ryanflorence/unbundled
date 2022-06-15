export function findRoute(routes, id) {
  for (let route of routes) {
    if (id === route.id) {
      return route;
    }
    if (route.children) {
      let child = findRoute(route.children, id);
      if (child) {
        return child;
      }
    }
  }
  return null;
}
