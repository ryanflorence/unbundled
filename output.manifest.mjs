let manifest = {
  routes: [
    {
      id: "root",
      path: "/",
      loader: true,
      module: "/app/routes/root/render.mjs",
      children: [
        {
          id: "index",
          index: true,
          loader: true,
          module: "/app/routes/index/render.mjs",
        },
        {
          id: "dashboard",
          path: "dashboard",
          loader: true,
          module: "/app/routes/dashboard/render.mjs",
        },
      ],
    },
  ],
};

if (typeof window !== "undefined") {
  window.AppManifest = manifest;
}

export default manifest;
