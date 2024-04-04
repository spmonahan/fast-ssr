import express from "express";
// eslint-disable-next-line
import useragent from "express-useragent";
import { join, dirname } from "path";
import { fileURLToPath } from 'url';
import { Server } from 'http';
import { templateRenderer, RequestStorageManager } from './ssr';

const __dirname = dirname(fileURLToPath(import.meta.url));

let server: Server;
const port = 3000;

const handleGracefulShutdown: (arg: unknown) => void = arg => {
  console.log('Shutting down...');
  if (server && server.close) {
    console.log('Closing HTTP server');
    server.close();
    process.off('uncaughtException', handleGracefulShutdown);
  }

  if (arg instanceof Error) {
    console.error('Error', arg);
    process.exit(1);
  }
};

export const startServer = () => {
    const app = express();

    // FAST context
    app.use(RequestStorageManager.middleware());

    // Use EJS templates
    app.set('views', join(__dirname, 'views'));
    app.set('view engine', 'ejs');

    // Sniff the browser
    app.use(useragent.express());

    // Parse JSON bodies
    app.use(express.json());

    app.get('/fast-ssr.html', (_req, res) => {
      res.render('fast-ssr', { template: templateRenderer.render('<div>a div</div>')});
    });

    process.on('uncaughtException', handleGracefulShutdown);

    server = app.listen(port, () => {
        console.log("FAST SSR server started!");
    });
};

export const stopServer = () => {
    if (!server) {
        throw new Error('No server running!');
    }

    server.close();
};