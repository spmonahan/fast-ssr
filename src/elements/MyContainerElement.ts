import { customElement, css, html, attr, FASTElement } from "@microsoft/fast-element";

const styles = css`
    h1 {
        color: red;
    }
`;

const template = html`
    <div>
        <my-element></my-element>
        <my-styled-element></my-styled-element>
        <my-element></my-element>
        <my-styled-element></my-styled-element>
        <my-element></my-element>
        <my-styled-element></my-styled-element>
        <my-element></my-element>
        <my-styled-element></my-styled-element>
        <my-element></my-element>
        <my-styled-element></my-styled-element>
        <my-element></my-element>
        <my-styled-element></my-styled-element>
        <my-element></my-element>
        <my-styled-element></my-styled-element>
    </div>
`;

@customElement({name: "my-container-element", template, styles})
export class MyContainerElement extends FASTElement {}