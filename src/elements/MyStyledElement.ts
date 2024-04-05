import { customElement, css, html, attr, FASTElement } from "@microsoft/fast-element";

const styles = css`
    h1 {
        color: red;
    }
`;

@customElement({name: "my-styled-element", template: html`<h1>${x => x.message}</h1>`, styles})
export class MyStyledElement extends FASTElement {
    @attr
    public message = "Hello World with style";
}