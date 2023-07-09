<script>
    import Nav from "$lib/components/Nav.svelte";
    import "../app.scss";
    import Footer from "../lib/components/Footer.svelte";
    // @ts-ignore
    import { dev } from '$app/environment';
    import { inject } from '@vercel/analytics';
    inject({ mode: dev ? 'development' : 'production' });
</script>

<slot />

<Footer/>