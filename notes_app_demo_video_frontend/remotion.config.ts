/**
 * PUBLIC_INTERFACE
 * Remotion CLI configuration.
 * - Ensures the correct entry file is used (src/index.ts)
 * - Reads REMOTION_PORT to align with the platform proxy
 * - Adds a /health endpoint via devServer setup for proxy health checks
 * - Tweaks image format and overwrite behavior
 */
import { Config } from "@remotion/cli/config";

// Use src/index.ts explicitly as entry point
Config.setEntryPoint("./src/index.ts");

// Configure port from env to ensure it binds to the expected port (defaults to 3000)
const portFromEnv = process.env.REMOTION_PORT
  ? Number(process.env.REMOTION_PORT)
  : 3000;
if (!Number.isNaN(portFromEnv)) {
  Config.setPort(portFromEnv);
}

/**
 * Preferred image format and overwrite on render
 */
Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);

/**
 * Note: Trust proxy setting is not available in this Remotion version.
 * Proxies should work with correct port binding and health endpoint.
 */

/**
 * Enable source maps optionally (default off to reduce weight)
 * and attach a /health endpoint.
 * Also reduce client-side logs if REMOTION_LOG_LEVEL=error or warn by
 * injecting DefinePlugin to let app code react to it if desired.
 */
Config.overrideWebpackConfig((current) => {
  if (process.env.REMOTION_ENABLE_SOURCE_MAPS === "true") {
    current.devtool = "source-map";
  }

  // Inject a /health route for dev server using setupMiddlewares (Webpack v5)
  // Remotion uses Webpack dev server under the hood in Studio mode.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const devServer: any = (current as any).devServer ?? {};
  const existingSetup = devServer.setupMiddlewares;
  devServer.setupMiddlewares = (middlewares: unknown[], server: any) => {
    server.app.get(
      process.env.REMOTION_HEALTHCHECK_PATH ?? "/health",
      (_req: unknown, res: any) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ status: "ok" }));
      }
    );
    // Preserve previous setup if any
    if (typeof existingSetup === "function") {
      return existingSetup(middlewares, server);
    }
    return middlewares;
  };
  (current as any).devServer = devServer;

  return current;
});
