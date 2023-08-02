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


<div class="layout">
    <main>
        <slot />
    </main>
    
    <Footer/>
</div>

<style>
    
</style>