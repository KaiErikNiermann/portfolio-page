import preprocess from "svelte-preprocess";
import adapter from "@sveltejs/adapter-auto";
import remarkUnwrapImages from 'remark-unwrap-images'
import remarkToc from 'remark-toc'
import remarkMath from "remark-math";
import rehypeSlug from 'rehype-slug'
import rehypeFigure from 'rehype-figure'
import relativeImages from 'mdsvex-relative-images'
import addClasses from "rehype-add-classes"
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
    relativeImages
  ],
  // Render katex components inside @html blocks, aka {@html "<katex output html>"}
  rehypePlugins: [
    rehypeKatexSvelte,
    rehypeSlug, 
    rehypeFigure,
    [addClasses, {"ul, ol": "list-style"}]
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
    // adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
    // If your environment is not supported or you settled on a specific environment, switch out the adapter.
    // See https://kit.svelte.dev/docs/adapters for more information about adapters.
    adapter: adapter(),
  },
};

export default config;
