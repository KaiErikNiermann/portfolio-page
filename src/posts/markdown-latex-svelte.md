---
title: Adding markdown with latex to svelte
description: A basic guide that quickly introduces how to add mdsvex and proper markdown latex support to your svelte project.
date: '2023-4-14'
categories:
  - sveltekit
  - svelte
published: true
github: null
post_type: 3
---

## Preamble

The code from this post is based in large part on [*this*](https://joyofcode.xyz/sveltekit-markdown-blog) guide but aims to extend it with proper support for some missing features. Its also moreso meant for people who maybe already have a working markdown blog but wish to add the full functionality you would expect from markdown. 

So if you are just starting out I recommend you first go through the afroementioned guide and then come back here to add the final touches to get everything working.

## Features

I'll go through the list of features one by one and how to add them.

### Full Syntax highlighting

There is the official way of extending the mdsvex options but as a fan of costumizability I really just preferred the more manual approach of just importing some nice `PrismJS` themes from [*here*](https://github.com/PrismJS/prism/tree/master/themes). To use these themes I made a `styles` folder in my `src` directory then in the `app.scss` at the top I just included the theme from the folder and it overwrites any theme.

`app.scss`
```css
@import url(./styles/prism-synthwave84.css);
// other global styles
```

As a sidenote you don't have to be using scss for this to work, it was just my preferred flavor of css.

To get the inline syntax highlighting to work you might have to extend the code stylesheet, since mdsvex renders inline code such as `this` as `<code>this</code>` so you should add the `code` tag to the main styles block like this.

```scss
// for block style
code[class*="language-"], 

pre[class*="language-"],

// for inline style
code,            

// optionally if you want code inside liks for example         
a > code {                
  // main code styles
  ...
}
```

Checkout [*this*](https://github.com/KaiErikNiermann/portfolio-page/blob/main/src/styles/prism-synthwave84.css) example if you are still a bit confused.

In the stylesheet you can also do things like add a nice rounded border and in general modify the sytax highlighting exactly to your liking.

### Latex

One thing that was quite a struggle initally was getting latex working, the crux of the problem with latex is that svelte sees things inside braces `{ }` as JS expressions which can mess up rendering the latex, so we obviously need to escape them somehow before svelte tries treating the contents as code.

Luckily to do this you just need to surround whatever string you wish to render with the special `{@html ""}` tag. Doing this manually everytime you want to write some latex is rather annoying but luckily [*someone*](https://github.com/kwshi) already wrote a [`plugin`](https://github.com/kwshi/rehype-katex-svelte) that wraps all math inside this tag. To use this plugin there are a few steps.

1. Get katex

Include the required stylesheets and scripts in your `app.html` header.

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css" integrity="sha384-GvrOXuhMATgEsSwCs4smul74iXGOixntILdUW9XmUC6+HX0sLNAK3q71HotJqlAn" crossorigin="anonymous">
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.js" integrity="sha384-cpW21h6RZv/phavutF+AuVYrr+dA8xD9zs6FwLpaCct6O9ctzYFfFr4dgmgccOTx" crossorigin="anonymous"></script>
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/contrib/auto-render.min.js" integrity="sha384-+VBxd3r6XgURycqtZ117nYw44OOcIax56Z4dCRWbxyPt0Koah1uHoK0o4+/RRE05" crossorigin="anonymous"></script>
```

2. Install the required dependencies

```bash
pnpm i remark-math rehype-katex-svelte
```

3. Costumize your `svelte.config.js` file 

```js
import preprocess from "svelte-preprocess";
import adapter from "@sveltejs/adapter-auto";
import remarkUnwrapImages from 'remark-unwrap-images'
import remarkToc from 'remark-toc'
import remarkMath from "remark-math";
import rehypeSlug from 'rehype-slug'
import rehypeKatexSvelte from "rehype-katex-svelte";
import { vitePreprocess } from "@sveltejs/kit/vite";
import { mdsvex } from 'mdsvex';

/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOptions = {
	extensions: ['.md'],
  remarkPlugins: [
    remarkMath,
    remarkUnwrapImages, 
    [remarkToc, { tight: true }],
  ],
  // Render katex components inside @html blocks, aka {@html "<katex output html>"}
  rehypePlugins: [
    rehypeKatexSvelte,
    rehypeSlug    
  ],
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: [".svelte", ...mdsvexOptions.extensions],
  preprocess: [
    vitePreprocess(),
    mdsvex(mdsvexOptions),
    preprocess({
      scss: {
        prependData: '@use "src/variables.scss" as *;',
      },
    })
  ],

  kit: {
    adapter: adapter(),
  },
};

export default config;
```

Now you should be able to have both $inline\ latex\ \frac{1 + 2}{3}\times 4 \rightarrow$ 🐈

And very cool looking block latex

$$
\begin{align*}
    \frac{\partial^2 u}{\partial t^2} &= c^2 \nabla^2 u \\
    \int_{0}^{2\pi} e^{i\theta} \, d\theta &= 0 \\
    \sum_{n=1}^{\infty} \frac{1}{n^2} &= \frac{\pi^2}{6}
\end{align*}
$$

with Katex. Checkout the [*katex docs*](https://katex.org/docs/supported.html) for what is supported.

## Final notes

If you have any recommendations for things to add feel free to open an issue or contact me dirctly and I will update this page.
