import express from "express";
// eslint-disable-next-line
import useragent from "express-useragent";
import { join, dirname } from "path";
import { fileURLToPath } from 'url';
import { Server } from 'http';
import fs from 'fs';
import { templateRenderer, RequestStorageManager } from './ssr.js';

import { MyElement } from "../elements/MyElement.js";
MyElement;

import { MyStyledElement } from "../elements/MyStyledElement.js";
MyStyledElement;

import { MyContainerElement } from "../elements/MyContainerElement.js";
MyContainerElement;


const __dirname = dirname(fileURLToPath(import.meta.url));

let server: Server;
const port = 3000;

const sleep = (timeMs: number) => {
  return new Promise((resolve) => setTimeout(resolve, timeMs));
};

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

    app.use('/node_modules', express.static(join(__dirname, '..', '..', 'node_modules')));
    app.use('/elements', express.static(join(__dirname, '..', 'elements')));

    app.get('/fast-ssr.html', (_req, res) => {
      
      const result = templateRenderer.render('<my-element></my-element><my-styled-element></my-styled-element>');
      let template = '';
      for (const part of result) {
        template += part;
      }

      res.render('fast-ssr', { template, title: 'FAST SSR' });
    });

    app.get('/fast-ssr-stream.html', async (req, res) => {
      
      const { sleepTime = 1000 } = req.query;

      const streamTemplate = `<my-element></my-element>
      <p>blah</p>
      <p>blah</p>
      <p>blah</p>
      <p>blah</p>
      <p>blah</p>
      <p>blah</p>
      <p>blah</p>
      <p>blah</p>
      <p>blah</p>
      <p>blah</p>
      <my-styled-element></my-styled-element>`;

      let template = fs.readFileSync(join(__dirname, 'views', 'fast-ssr.ejs'), { encoding: 'utf8' });
      template = template
        .replace('<%- template %>', streamTemplate)
        .replace('<%- title %>', 'FAST SSR Stream');
              

      const result = templateRenderer.render(template);
      for await (const part of result) {
        res.write(part);
        await sleep(Number(sleepTime));
      }

      res.end();
    });

    app.get('/fast-ssr-stream-container.html', async (req, res) => {
      
      const { sleepTime = 1000 } = req.query;

      const streamTemplate = `<my-container-element></my-container-element>`;

      let template = fs.readFileSync(join(__dirname, 'views', 'fast-ssr.ejs'), { encoding: 'utf8' });
      template = template
        .replace('<%- template %>', streamTemplate)
        .replace('<%- title %>', 'FAST SSR Stream Container');
              

      const result = templateRenderer.render(template);
      for await (const part of result) {
        res.write(part);
        await sleep(Number(sleepTime));
      }

      res.end();
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

startServer();