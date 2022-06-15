import { getHydrationScriptContent } from "../../../modules/remix/client.mjs";

export function render({ data, children, context }) {
  return `
    <!doctype html>
    <html lang="en">
      <head>
        <title>Look ma! no bundler</title>
      </head>
      <body>
        <h1>${data.title}</h1>
        <p>
          <a href="/">Home</a> | <a href="/dashboard">Dashboard</a>
        </p>
        <button onclick="alert('heyooo')">Alert</button>
        <p>${data.count}</p>
        <div>${children}</div>


        <script type="importmap">
        {
          "imports": {
            "@remix-run/router": "/node_modules/@remix-run/router/router.development.js"
          }
        }
        </script>

        <script type="module">${getHydrationScriptContent(context)}</script>
        <script type="module" src="/output.manifest.mjs"></script>
        <script type="module" src="/app/entry.client.mjs"></script>
      </body>
    </html>
  `;
}
