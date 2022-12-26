import adapter from "@sveltejs/adapter-static"; 
// was "@sveltejs/adapter-auto"

const dev = "production" === "development";

/** @type {import(""@sveltejs/kit").Config} */
const config = {
    kit: {
        adapter: adapter({
			base: "docs",
            pages: "docs",
            assets: "docs"
        }),
        paths: {
            // change below to your repo name
            base: dev ? "" : "/KaiErikNiermann.github.io",
        },
    }
};

export default config;