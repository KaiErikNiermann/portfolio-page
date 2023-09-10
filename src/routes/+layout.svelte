<script>
    import Footer from "./footer.svelte";
    import PageTransition from './Transition.svelte'
    import 'open-props/style'
	import 'open-props/buttons'
    import "../app.scss";

    // @ts-ignore
    import { dev } from '$app/environment';
    import { inject } from '@vercel/analytics';
    inject({ mode: dev ? 'development' : 'production' });

    export let data
</script>

<div class="layout">
    <main>
        <PageTransition url={data.url}>
            <slot></slot>
        </PageTransition>
    </main>
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

    @media (max-width: 750px) {
        div.layout {
            width: 100%;
        }
    }
</style>