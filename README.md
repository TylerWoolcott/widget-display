
# Serendipity AI case study 

## Link to embeddable web component widget
https://widget-display.vercel.app/

## Requirements

Build a reusable widget which can be embedded in any website. 

## Technologies

Makes most sense to use **web components** for the widget and **React** for the frontend because:

 - They can work in combination. Get the benefits of web component encapsulation and efficiency of React's routing, state management, data-binding, etc. 
 - Web components offer clients a shortcut by deploying easy to use and responsive web & mobile assets directly to their pages with just a few lines of Javascript. If I build and host the widget's binary file on a third-party website, the solution is the easiest for the user to use as they can just copy the embed link and include the script tag and web component on their website. No installation required and the styles are fully encapsulated. 
 - I know that Serendipity AI use React so it's a useful thing to use!

## Initial development strategy

 1. Scope out existing architectures available online for inspiration and the pros and cons of each approach.
 2. Decide which widget architecture approach to use.
 3. Assess layout configuration parameters the widget may need in order to ease its integration into other websites
 4. Get the structure of the app in place.
 5. Start development.
 6. Ways I might evolve the widget to improve its appeal and utility

## Different architectures pros / cons
 ## Web components:
 Web components combine the following:
 - **Custom Elements**, an API that allows custom HTML elements (named and defined with custom attributes/events) to be defined and used like any other element; 
 - **Shadow DOM**, an API allows an encapsulated DOM element which is attached to a host DOM element (CSS styles applied in the Shadow DOM will not bleed into the host document, and vice versa); 
 - **HTML Templates**, an API that provides `<template>` and `<slot>` tags to easily markup UI for reuse, without rendering them, and;
 - **HTML Import**, an API that allows the import of web components from separate resource definitions. For example, a custom `<intelligence-widget>` element could be developed once and imported, configured and run on any other site.

**Pros**: 
- Cross-browser (web standard) for creating and extending reusable components.
- Requires no library or framework to get started. Vanilla JS/HTML. The result of this can reduce code complexity and web page performance.
- Provides a familiar programming model. It's just DOM/CSS/HTML.
- A custom element has its own semantic tag and lifecycle methods, similar to a React component, so it’s a good encapsulation tool for logic and UI into one custom HTML element tag which we then can reuse across the page or reuse across multiple projects. 
- Custom elements can be placed anywhere in the existing app’s structure
- Third-party content can be embedded as Web Component by simply adding a script and a custom HTML tag 
- The same web component can be reused on multiple target pages with minimal effort
- Isolated DOM: A component's DOM is self-contained (e.g. document.querySelector() won't return nodes in the component's shadow DOM). Shadow DOM content can be rendered by browsers without putting it inside the main document DOM tree.
- Scoped CSS: CSS defined inside shadow DOM is scoped to it. Style rules don't leak out(except for CSS variables) and page styles don't bleed in, e.g., if we style a button in the `</style>` block, this style only applies to our custom element content but not for all buttons on the page.
- Simplifies CSS - Scoped DOM means we can use simple CSS selectors, more generic id/class names, and not worry about naming conflicts.
- Works well with other new web platform features (Shadow DOM, `<template>`, CSS custom properties, etc.)
- Tightly integrated with the browser's DevTools.
- Leverage existing accessibility features.
- Productivity - Think of apps in chunks of DOM rather than one large (global) page.
- All the major browsers Chrome, Chromium Edge, Firefox, and Safari support web components.
- Compared to a React page, a web component page has a lower CPU cost, will become interactive sooner, and can respond to use action in a faster manner.

**Cons:** 
- Sparse documentation: Although, there is some good documentation out there - a central repo per se, doesn't exist - leaving developers to piece together knowledge.
- Choice is limited when it comes to libraries and frameworks to build Web Components in, although Polymer, a library developed by Google to build and distribute web components is a promising option.
- Limited community/amount of open-source projects currently compared to React based projects.
- Lack state management for complex application, routing, solution, navigation, parsing url etc.
- If we do want to share styles between components, their advantage related to encapsulation turns into a disadvantage, we can't share code (or styles) between components. 
- Unknown SEO implications: Some tidbits on the internet report SEO support for Web Components with mixed results, so any heavy websites with Web components may suffer from inefficient indexing
- There may be issues importing third-party libraries that contain styles, and we may have to find compromises on how to use third party libraries in the Web component
- If we want to style your component using a global CSS stylesheet, we should avoid using Shadow DOM in that particular component, as the global styles will not be applied if you use it.
- We should handle event propagation with care if we are using Shadow DOM in our component, as the use of UI events is different in and out of the shadow boundary.
- Some payment processors don't support shadow DOM in the official clients
- Many platforms such as WIX.com and Wordpress tend to offer the option to embed via an iFrame rather than web components. 
   
## iFrame:
- The iFrame is used to embed another HTML document into the body of the currently browsed page. This creates a nested browsing context in which useful content from third-party sites or services can be directly enclosed without much configuration. A second and related use-case for iFrames is to enable reuse of business logic already implemented in an existing web application as embedded widgets (e.g., of real-time chat widgets).

**Pros**:
- It can be used to load external html or xhtml pages into the current document without disturbing the original page
- All modern web browsers support them
- If there are multiple pages referencing iFrame, you only need to modify the content of iFrame, and then you can change the content of every page you call, which is convenient and fast.
- Selectors and styles inside of a shadow DOM node don’t leak outside of the shadow root and styles from outside the shadow root don’t leak in.

**Cons:** 
- Consumer can’t tweak any of the styles in the iFrame. Also, for example, by default, browsers display the `<iframe>` with a surrounding border (which is generally undesirable). This can lead to inconsistent user interfaces and a bad experience all around.
- Iframes are inherently unresponsive, so we have to set up a postMessage-driven mechanism of manually keeping the height up to date. This comes with library bloat andcomputationaloverhead.
- Iframes are hard to write for: CORS errors are common, as iframes are locked down and things like hooking into scroll events need to be ‘normalised’ before forwarding to the iframe, to take into account the iframe offset.
- Iframes require a ‘title’, otherwise screen readers announce them simply as ‘iframe’. Shadow DOM has no such requirement as it’s ‘native’ to the page.
- The nested context created in embedded pages could result in decreased SEO credit for the host page, as search engines will attribute content to the iFrame’s source URL.
- iFrames effectively create “browser windows” within the existing page, resulting in unintended nested and vertical scrollbars if not carefully configured.
- With iframes, the iframe itself is a separate document — so the page has to download and render the iframe document, which itself requests assets such as JavaScript and CSS. Consequently, the iframe initialisation is much slower than the shadow DOM, where all of the requests are already ‘in the page’
- We have no control over the element’s size, so the consumer of the widget will have to accurately carve out space in their dom for the iFrame.  If our widget is dynamic in size, this is going to cause problems with scrolling and positioning.
- Communication between the iFrame and the parent. While we can use Custom Events, we'd need to build out an event system for both the parent and the iFrame context, e.g., if the user resizes their window, we need the parent to tell the iframe; if the iframe changes its dimensions by loading in extra content, the iframe needs to inform the parent; if a user clicks a button, we need to inform the parent so we can track this data to measure our project efficiency etc. Each of these messages takes time and when we are trying to increase front end performance. This can also be rather frustrating if the client already has a built in SDK, e.g., building a mini SDK for the SDK for IFrame communication. 
- Many mobile devices (PDA mobile phones) can not fully display the frame, and the device compatibility is poor.
- Iframe framework pages will increase the HTTP requests of the server, which is not advisable for large websites.

## Widget architecture used 
**Web components**, **shadow DOM**, and **custom elements** together with **React**. 

## Layout configuration considerations 
 - Allow the widget to expand to fill its container, giving control to the developer (SI recommends using a container width of around 350-400px and a minimum of 300px). 
 - Offer some limited options for customising the style of the widget (SI's widget supports the changing of background colour. thumbnail radius, and/or font family through the use of an enclosing div tag and css). To do this we can use CSS variable custom properties scoped to the custom element. 

## Ways I might evolve the widget to improve its appeal and utility
 - Using the widget, enable customers to more fully customise and surface the transformation maps on their site, such as: 
   - Add custom animations (e.g., [Flourish](https://flourish.studio/examples/)); 
   - Invite and collaborate with others; 
   - Run reports;
   - Gather SEO analytics; 
   - Export data; 
   - Perhaps find a clever way to gamify the maps using the widget (e.g., [SportsDataIO](https://sportsdata.io/developers/widgets-guide));
   - Allow customers to attach notes/comments to the transformation maps (e.g., [Loom](https://support.loom.com/hc/en-us/articles/360017464517-How-to-react-to-videos-with-emojis-and-in-video-comments-)). 
   - Offer different subscription access tiers through the widget (e.g., [Zendesk](https://support.zendesk.com/hc/en-us/articles/4408836216218#topic_bkd_qgd_bq)).
   - Enable users to rate the relevance of the transformation maps to boost the algorithm in order to better meet their needs (ratings would not be not publicly viewable).
   - Attach event listeners to custom elements to track when and how the events are fired, as well as the data submitted with them.

## Installing and running client locally 

> Note that if you want to test out the app, then you don't need to run it locally. You can visit the deployed app here: https://widget-display.vercel.app/

To install locally you will need to have node installed on your computer.

```bash
git clone https://github.com/TylerWoolcott/widget-display.git
yarn install
yarn start
```

Open `http://localhost:3000` in a browser. 

## Retrospective

How did this little mini project go?

I actually really enjoyed it but it took me quite a while because I had to learn web components and how to use them in a React project environment. If I were to tackle a project of similar size then it would take me less than half the time. I developed a system of working comprising of 3 interlinking parts. 
1. [Web Component Widget](https://github.com/TylerWoolcott/web-component-widget.git) repo
- I developed and built the widget then `yarn run build`ed it and copied the `build/static/index.js` file.
2. [Widget Host](https://github.com/TylerWoolcott/widget-host.git) repo 
- I pasted it into the `public/index.js`directory and removed the existing one. 
- I pushed the changes to the repo and deployed it to Vercel `https://widget-host.vercel.app/index.js`
3. [Widget Display](https://github.com/TylerWoolcott/widget-display.git) repo 
- I pasted the `<script type="text/javascript" src="https://widget-host.vercel.app/index.js"></script>` into the `public/index.html` file and added the `<intelligence-widget apiKey="YOUR_API_KEY_HERE" topicId="a1Gb0000000LGk6EAG" language="en"></intelligence-widget>` to the src/app.js file. This repo represents a customer embedding the widget on their site, which users can copy the embed link from the frontend and paste it into their own site.

### What am I proud of?

I believe I have done a good job in my presentation, in terms of clear code and commits. I have not tidied/rebased my commit messages so you can get a good idea of my progress and thoughts throughout development.

I am pleased with the responsive frontend which works nicely at different resolutions and on mobile thanks to Bootstrap for the widget embed links modal.

## Would could I have done better?

I would have liked to have done more TDD. TDD does take a little longer but I believe it results in a more robust product. Ultimately time constraints forced my hand on this one.

Other than TDD, a polished product would contain way more tests. It's missing end-to-end and integration tests. I am also aware that no effort has been put into testing security like XSS or DNS attacks.

There are some obvious features missing from the project. Pagination would have been a nice feature to have been able to implement along with text showing the total number of results and how far through you are. I also think a loading animation would have been good for times when either my or Spotify's server are slow.

I think it's good to have deployed the app so it can be easily tested on multiple devices. However, I would have liked to have had time to create a Dockerfile to push to Docker Hub for ease of testing locally.

Obviously, I only got to implement 3 of the 6 types of Spotify entity.

### Development tools

Development was on a Mac running M1. Used Git CLI for commit messages. Visual Studio Code was used for editing source.
