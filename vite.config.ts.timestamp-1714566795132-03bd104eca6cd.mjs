// vite.config.ts
import { vitePlugin as remix } from "file:///D:/WebApps/epic-news-EricGoncalvesJE/node_modules/@remix-run/dev/dist/index.js";
import { sentryVitePlugin } from "file:///D:/WebApps/epic-news-EricGoncalvesJE/node_modules/@sentry/vite-plugin/dist/esm/index.mjs";
import { glob } from "file:///D:/WebApps/epic-news-EricGoncalvesJE/node_modules/glob/dist/esm/index.js";
import { flatRoutes } from "file:///D:/WebApps/epic-news-EricGoncalvesJE/node_modules/remix-flat-routes/dist/index.js";
import { defineConfig } from "file:///D:/WebApps/epic-news-EricGoncalvesJE/node_modules/vite/dist/node/index.js";
import tsconfigPaths from "file:///D:/WebApps/epic-news-EricGoncalvesJE/node_modules/vite-tsconfig-paths/dist/index.mjs";
var MODE = process.env.NODE_ENV;
var vite_config_default = defineConfig({
  build: {
    cssMinify: MODE === "production",
    rollupOptions: {
      external: [/node:.*/, "stream", "crypto", "fsevents"]
    },
    sourcemap: true
  },
  plugins: [
    tsconfigPaths(),
    remix({
      ignoredRouteFiles: ["**/*"],
      serverModuleFormat: "esm",
      routes: async (defineRoutes) => {
        return flatRoutes("routes", defineRoutes, {
          ignoredRouteFiles: [
            ".*",
            "**/*.css",
            "**/*.test.{js,jsx,ts,tsx}",
            "**/__*.*",
            // This is for server-side utilities you want to colocate
            // next to your routes without making an additional
            // directory. If you need a route that includes "server" or
            // "client" in the filename, use the escape brackets like:
            // my-route.[server].tsx
            "**/*.server.*",
            "**/*.client.*"
          ]
        });
      }
    }),
    process.env.SENTRY_AUTH_TOKEN ? sentryVitePlugin({
      disable: MODE !== "production",
      authToken: process.env.SENTRY_AUTH_TOKEN,
      org: process.env.SENTRY_ORG,
      project: process.env.SENTRY_PROJECT,
      release: {
        name: process.env.COMMIT_SHA,
        setCommits: {
          auto: true
        }
      },
      sourcemaps: {
        filesToDeleteAfterUpload: await glob([
          "./build/**/*.map",
          ".server-build/**/*.map"
        ])
      }
    }) : null
  ]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxXZWJBcHBzXFxcXGVwaWMtbmV3cy1FcmljR29uY2FsdmVzSkVcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXFdlYkFwcHNcXFxcZXBpYy1uZXdzLUVyaWNHb25jYWx2ZXNKRVxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovV2ViQXBwcy9lcGljLW5ld3MtRXJpY0dvbmNhbHZlc0pFL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgdml0ZVBsdWdpbiBhcyByZW1peCB9IGZyb20gJ0ByZW1peC1ydW4vZGV2J1xyXG5pbXBvcnQgeyBzZW50cnlWaXRlUGx1Z2luIH0gZnJvbSAnQHNlbnRyeS92aXRlLXBsdWdpbidcclxuaW1wb3J0IHsgZ2xvYiB9IGZyb20gJ2dsb2InXHJcbmltcG9ydCB7IGZsYXRSb3V0ZXMgfSBmcm9tICdyZW1peC1mbGF0LXJvdXRlcydcclxuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcclxuaW1wb3J0IHRzY29uZmlnUGF0aHMgZnJvbSAndml0ZS10c2NvbmZpZy1wYXRocydcclxuXHJcbmNvbnN0IE1PREUgPSBwcm9jZXNzLmVudi5OT0RFX0VOVlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuXHRidWlsZDoge1xyXG5cdFx0Y3NzTWluaWZ5OiBNT0RFID09PSAncHJvZHVjdGlvbicsXHJcblxyXG5cdFx0cm9sbHVwT3B0aW9uczoge1xyXG5cdFx0XHRleHRlcm5hbDogWy9ub2RlOi4qLywgJ3N0cmVhbScsICdjcnlwdG8nLCAnZnNldmVudHMnXSxcclxuXHRcdH0sXHJcblxyXG5cdFx0c291cmNlbWFwOiB0cnVlLFxyXG5cdH0sXHJcblx0cGx1Z2luczogW1xyXG5cdFx0dHNjb25maWdQYXRocygpLFxyXG5cdFx0cmVtaXgoe1xyXG5cdFx0XHRpZ25vcmVkUm91dGVGaWxlczogWycqKi8qJ10sXHJcblx0XHRcdHNlcnZlck1vZHVsZUZvcm1hdDogJ2VzbScsXHJcblx0XHRcdHJvdXRlczogYXN5bmMgZGVmaW5lUm91dGVzID0+IHtcclxuXHRcdFx0XHRyZXR1cm4gZmxhdFJvdXRlcygncm91dGVzJywgZGVmaW5lUm91dGVzLCB7XHJcblx0XHRcdFx0XHRpZ25vcmVkUm91dGVGaWxlczogW1xyXG5cdFx0XHRcdFx0XHQnLionLFxyXG5cdFx0XHRcdFx0XHQnKiovKi5jc3MnLFxyXG5cdFx0XHRcdFx0XHQnKiovKi50ZXN0Lntqcyxqc3gsdHMsdHN4fScsXHJcblx0XHRcdFx0XHRcdCcqKi9fXyouKicsXHJcblx0XHRcdFx0XHRcdC8vIFRoaXMgaXMgZm9yIHNlcnZlci1zaWRlIHV0aWxpdGllcyB5b3Ugd2FudCB0byBjb2xvY2F0ZVxyXG5cdFx0XHRcdFx0XHQvLyBuZXh0IHRvIHlvdXIgcm91dGVzIHdpdGhvdXQgbWFraW5nIGFuIGFkZGl0aW9uYWxcclxuXHRcdFx0XHRcdFx0Ly8gZGlyZWN0b3J5LiBJZiB5b3UgbmVlZCBhIHJvdXRlIHRoYXQgaW5jbHVkZXMgXCJzZXJ2ZXJcIiBvclxyXG5cdFx0XHRcdFx0XHQvLyBcImNsaWVudFwiIGluIHRoZSBmaWxlbmFtZSwgdXNlIHRoZSBlc2NhcGUgYnJhY2tldHMgbGlrZTpcclxuXHRcdFx0XHRcdFx0Ly8gbXktcm91dGUuW3NlcnZlcl0udHN4XHJcblx0XHRcdFx0XHRcdCcqKi8qLnNlcnZlci4qJyxcclxuXHRcdFx0XHRcdFx0JyoqLyouY2xpZW50LionLFxyXG5cdFx0XHRcdFx0XSxcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9LFxyXG5cdFx0fSksXHJcblx0XHRwcm9jZXNzLmVudi5TRU5UUllfQVVUSF9UT0tFTlxyXG5cdFx0XHQ/IHNlbnRyeVZpdGVQbHVnaW4oe1xyXG5cdFx0XHRcdFx0ZGlzYWJsZTogTU9ERSAhPT0gJ3Byb2R1Y3Rpb24nLFxyXG5cdFx0XHRcdFx0YXV0aFRva2VuOiBwcm9jZXNzLmVudi5TRU5UUllfQVVUSF9UT0tFTixcclxuXHRcdFx0XHRcdG9yZzogcHJvY2Vzcy5lbnYuU0VOVFJZX09SRyxcclxuXHRcdFx0XHRcdHByb2plY3Q6IHByb2Nlc3MuZW52LlNFTlRSWV9QUk9KRUNULFxyXG5cdFx0XHRcdFx0cmVsZWFzZToge1xyXG5cdFx0XHRcdFx0XHRuYW1lOiBwcm9jZXNzLmVudi5DT01NSVRfU0hBLFxyXG5cdFx0XHRcdFx0XHRzZXRDb21taXRzOiB7XHJcblx0XHRcdFx0XHRcdFx0YXV0bzogdHJ1ZSxcclxuXHRcdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRzb3VyY2VtYXBzOiB7XHJcblx0XHRcdFx0XHRcdGZpbGVzVG9EZWxldGVBZnRlclVwbG9hZDogYXdhaXQgZ2xvYihbXHJcblx0XHRcdFx0XHRcdFx0Jy4vYnVpbGQvKiovKi5tYXAnLFxyXG5cdFx0XHRcdFx0XHRcdCcuc2VydmVyLWJ1aWxkLyoqLyoubWFwJyxcclxuXHRcdFx0XHRcdFx0XSksXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdDogbnVsbCxcclxuXHRdLFxyXG59KVxyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQW9TLFNBQVMsY0FBYyxhQUFhO0FBQ3hVLFNBQVMsd0JBQXdCO0FBQ2pDLFNBQVMsWUFBWTtBQUNyQixTQUFTLGtCQUFrQjtBQUMzQixTQUFTLG9CQUFvQjtBQUM3QixPQUFPLG1CQUFtQjtBQUUxQixJQUFNLE9BQU8sUUFBUSxJQUFJO0FBRXpCLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzNCLE9BQU87QUFBQSxJQUNOLFdBQVcsU0FBUztBQUFBLElBRXBCLGVBQWU7QUFBQSxNQUNkLFVBQVUsQ0FBQyxXQUFXLFVBQVUsVUFBVSxVQUFVO0FBQUEsSUFDckQ7QUFBQSxJQUVBLFdBQVc7QUFBQSxFQUNaO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUixjQUFjO0FBQUEsSUFDZCxNQUFNO0FBQUEsTUFDTCxtQkFBbUIsQ0FBQyxNQUFNO0FBQUEsTUFDMUIsb0JBQW9CO0FBQUEsTUFDcEIsUUFBUSxPQUFNLGlCQUFnQjtBQUM3QixlQUFPLFdBQVcsVUFBVSxjQUFjO0FBQUEsVUFDekMsbUJBQW1CO0FBQUEsWUFDbEI7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsWUFNQTtBQUFBLFlBQ0E7QUFBQSxVQUNEO0FBQUEsUUFDRCxDQUFDO0FBQUEsTUFDRjtBQUFBLElBQ0QsQ0FBQztBQUFBLElBQ0QsUUFBUSxJQUFJLG9CQUNULGlCQUFpQjtBQUFBLE1BQ2pCLFNBQVMsU0FBUztBQUFBLE1BQ2xCLFdBQVcsUUFBUSxJQUFJO0FBQUEsTUFDdkIsS0FBSyxRQUFRLElBQUk7QUFBQSxNQUNqQixTQUFTLFFBQVEsSUFBSTtBQUFBLE1BQ3JCLFNBQVM7QUFBQSxRQUNSLE1BQU0sUUFBUSxJQUFJO0FBQUEsUUFDbEIsWUFBWTtBQUFBLFVBQ1gsTUFBTTtBQUFBLFFBQ1A7QUFBQSxNQUNEO0FBQUEsTUFDQSxZQUFZO0FBQUEsUUFDWCwwQkFBMEIsTUFBTSxLQUFLO0FBQUEsVUFDcEM7QUFBQSxVQUNBO0FBQUEsUUFDRCxDQUFDO0FBQUEsTUFDRjtBQUFBLElBQ0QsQ0FBQyxJQUNBO0FBQUEsRUFDSjtBQUNELENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
