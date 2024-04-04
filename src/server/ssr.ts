import {
    createWindow,
    installWindowOnGlobal,
} from '@microsoft/fast-ssr/install-dom-shim.js';
import fastSSR, { RequestStorageManager } from "@microsoft/fast-ssr";

installWindowOnGlobal(createWindow({ isSSR: true }));

const { templateRenderer } = fastSSR();

export { templateRenderer, RequestStorageManager };



// const result = templateRenderer.render(html`
//     <!DOCTYPE HTML>
//     <html>
//         <body>
//             <my-element></my-element>
//         </body>
//     </html>
// `);