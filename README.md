# fast-ssr

Test app for learning about [fast-ssr](https://github.com/microsoft/fast/tree/master/packages/web-components/fast-ssr).

## Setup

```bash
$ yarn # install deps
$ yarn build # build code
$ yarn server # serve site
```

Navigate to [http://localhost:3000/fast-ssr.html](http://localhost:3000/fast-ssr.html) to view the site.

These pages are available:

1. [http://localhost:3000/fast-ssr.html](http://localhost:3000/fast-ssr.html): a simple SSR scenario
2. [http://localhost:3000/fast-ssr-stream.html](http://localhost:3000/fast-ssr-stream.html): a simple SSR scenario that is streamed to the client
3. [http://localhost:3000/fast-ssr-stream-container.html](http://localhost:3000/fast-ssr-stream-container.html): nested custom elements that are streamed to the client

Use the `sleepTime` query param with the streaming examples to control the speed of the stream. Defaults to `1000` (ms). Ex: `?sleepTime=1` to set the delay to 1ms.


## Disable patches

To disable patches, remove the `postinstall` script in `package.json` then follow the setup again.