import { customElement, html, attr, FASTElement } from "@microsoft/fast-element";

@customElement({name: "my-element", template: html`<h1>${x => x.message}</h1>`})
export class MyElement extends FASTElement {
    @attr
    public message = "Hello World";
}