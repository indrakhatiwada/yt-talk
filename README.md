



# What is content script?


1. Web Page Context: First, understand that when you visit a website, what you see is a web page rendered by your browser. This page has its own JavaScript, HTML, and CSS.
2. Extension's Role: Now, your Chrome extension might want to interact with this web page - read from it, modify it, or even add new elements to it. But for security reasons, JavaScript running on web pages is isolated and can't directly interact with extension code.
3. Enter Content Scripts: This is where content scripts come in. They are special scripts that run in the context of the web pages you visit. Think of them as your extension's agents that are injected into web pages.
4. What Can Content Scripts Do?:
    - Read and modify the content of the current page.
    - Add new elements to the page.
    - Listen to events on the page (like clicks, form submissions, etc.).
    - Basically, they can do most things regular JavaScript on a web page can do.
5. Limitations:
    - Content scripts can't use most of the Chrome Extension APIs directly. They have access to only a small subset.
    - They also can't access JavaScript variables or functions defined by the web page or by other content scripts.
6. Communication:
    - If your content script needs to do something that it can't do directly (like access a Chrome API), it can send a message to other parts of your extension (like the background script) which can then perform those actions.
7. When Do They Run?:
    - You can configure content scripts to run on specific pages (using URL patterns).
    - They can be set to run as soon as the page starts loading, or after the page has completely loaded.
8. Example Use Case: Let's say you're building an extension that changes the background color of all paragraphs on a web page to light yellow for easier reading. Your content script would be the piece of code that actually selects all `<p>` elements on the loaded web page and changes their `style.backgroundColor`.
9. In Plasmo: Plasmo simplifies working with content scripts. Usually, you'd create a file (like `content.ts` or similar, based on Plasmo's conventions), and Plasmo will automatically recognize it as a content script and inject it into web pages based on your configuration.
10. Security: Content scripts have their own isolated environment. This means they can interact with the web page's DOM, but they can't access JavaScript variables or functions defined by the page. This isolation helps prevent malicious websites from interfering with your extension.

To sum up, think of content scripts as the bridge between your Chrome extension and the web pages your users visit. They allow your extension to read from and make changes to web pages while maintaining a level of security and isolation.



# How to start injecting React Ui to a web page using Plasmo?



Plasmo makes it easy to create content scripts that can render React components directly into web pages. Let's go through the process step by step:

1. Create a new content script file: In your Plasmo project, create a new file under the `content` directory. You can name it something like `ui.tsx` (or `ui.ts` if you're not using JSX). This file will serve as your content script.
2. Import React and necessary components: At the top of your `ui.tsx` file, import React and any components you want to inject:
3. Create a container for your React app: In your content script, you'll need to create a DOM element that will serve as the container for your React application.
4. Render your React component: Now that you have a container, you can render your React component into it
5. (Optional) Add styles: You might want to style your injected UI. You can do this inline or by importing a CSS file:
6. (Optional) Configure when and where to inject: By default, Plasmo will inject your content scripts based on the `manifest.json` configuration. But you can also use a `config` object in your content script to specify this:
7. Handling cleanup: It's a good practice to clean up your injected UI when it's no longer needed (e.g., when navigating away from the page or when the extension is disabled).
8. - Communication with the extension: If you need to communicate between your injected UI and other parts of your extension (like the background script), you can use Plasmo's messaging system or the standard Chrome messaging APIs.
9. Build and test: After setting this up, build your extension with `npm run dev` or `yarn dev` (depending on your package manager). Then load the extension into Chrome and visit a web page where it should be injected. You should see your React UI appear on the page.



# Life Cycle of Plasmo CSUI

Plasmo's CSUI orchestrates a lifecycle dedicated to mounting and unmounting your React, Vue, or Svelte components in a content script. Although each UI library/framework has a slightly different mounting API, the top-level lifecycle is largely the same:

1. Get an [`Anchor`](https://docs.plasmo.com/framework/content-scripts-ui/life-cycle#anchor)
2. Create or locate a [`Root Container`](https://docs.plasmo.com/framework/content-scripts-ui/life-cycle#root-container)
3. [Render](https://docs.plasmo.com/framework/content-scripts-ui/life-cycle#renderer) the component onto the `Root Container`


### Anchor 

Anchor says where and how the component ui renders, for example, if we are using our extension to render in the you tube homepage, we need to take help of  DOM element unique Id and render our extension UI there. 

# Plasmo Config
Plasmo config is basically the base URL where we want to render the UI of our extension. 
YT-TALK is the extension for Youtube so, 
```ts
export const config: PlasmoCSConfig = {

  matches: ["https://www.youtube.com/*"]

}
```


This tells Plasmo that we need to inject it in youtube.com

Plasmo config helps us to generate `manifest.json` on it's own


## How to get inline Anchor in a web Page using Plasmo?

To specify a single inline anchor, export a `getInlineAnchor` function:

```ts
import type { PlasmoGetInlineAnchor } from "plasmo" export const getInlineAnchor: PlasmoGetInlineAnchor = async () =>  document.querySelector("#pricing")
```


Here, `#pricing` is the anchor for our element where we are going to inject our UI


## Detecting and Optimizing Root Container Removal


When a webpage changes its DOM structure, the `Root Container` might be removed. For example, given an email client filled with inbox items, and a CSUI injected inline next to each item. When an item is deleted, the root container will be removed as well.

To detect `Root Container` removal, the `CSUI Renderer` compares each mounted container's root against the `window.document` object. This check can be optimized to O(1) by exporting a `getShadowHostId` function:


```ts

import type { PlasmoGetShadowHostId } from "plasmo"
 
export const getShadowHostId: PlasmoGetShadowHostId = () => `adonais`
```


## Styling our CSUI


Styling the CSUI is a bit different from regular styles, in main file, import the css file as
 ```tsx
 import styleText from "data-text:./style.scss"
```

Then, we can use `PlasmoGetStyle ` and add css there

```tsx
import type { PlasmoGetStyle } from "plasmo"
export const getStyle: PlasmoGetStyle = () => {  const style = document.createElement("style")  style.textContent = styleText  return style}
```
