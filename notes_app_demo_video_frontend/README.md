# Remotion video

<p align="center">
  <a href="https://github.com/remotion-dev/logo">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://github.com/remotion-dev/logo/raw/main/animated-logo-banner-dark.gif">
      <img alt="Animated Remotion Logo" src="https://github.com/remotion-dev/logo/raw/main/animated-logo-banner-light.gif">
    </picture>
  </a>
</p>

Welcome to your Remotion project!

## Commands

**Install Dependencies**

```console
npm i
```

**Start Preview**

```console
# Binds to port 3000 by default and exposes /health for proxy checks
npm run dev
```

**Healthcheck**
```console
# Check if studio is responsive
npm run healthcheck
```

**Render video**

```console
npx remotion render
```

**Upgrade Remotion**

```console
npx remotion upgrade
```

## Environment

- REMOTION_PORT: Defaults to 3000. Set if your environment requires a different port.
- REMOTION_HEALTHCHECK_PATH: Defaults to /health. Used by proxy to detect readiness.
- REMOTION_TRUST_PROXY: Set to "true" if running behind a proxy.
- REMOTION_LOG_LEVEL: One of verbose|info|warn|error.

See .env.example for more options.

## Docs

Get started with Remotion by reading the [fundamentals page](https://www.remotion.dev/docs/the-fundamentals).

## Help

We provide help on our [Discord server](https://discord.gg/6VzzNDwUwV).

## Issues

Found an issue with Remotion? [File an issue here](https://github.com/remotion-dev/remotion/issues/new).

## License

Note that for some entities a company license is needed. [Read the terms here](https://github.com/remotion-dev/remotion/blob/main/LICENSE.md).
