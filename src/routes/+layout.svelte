<script>
    import Header from "$lib/components/header.svelte";
    import Footer from "$lib/components/footer.svelte";
    import 'open-props/style'
	import 'open-props/buttons'
    import "../app.scss";

    // @ts-ignore
    import { dev } from '$app/environment';
    import { inject } from '@vercel/analytics';
    inject({ mode: dev ? 'development' : 'production' });
</script>

<svelte:head>
    <link
        href="https://cdn.jsdelivr.net/npm/prismjs@1.29.0/themes/prism-tomorrow.min.css"
        rel="stylesheet"
    />
</svelte:head>

<div class="layout">
    <main>
        <slot />
    </main>
    
    <Footer/>
</div>

<style>
    div.layout {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        width: 100vw;
        margin: 0;
    }

    main {
        flex: 1;
    }

</style>