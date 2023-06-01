<script>
    import Nav from "$lib/components/Nav.svelte";
    import "../app.scss";
    import Footer from "../lib/components/Footer.svelte";
</script>

<slot />

<Footer/>

<style> 

@media (max-width: 750px) {
    .Footer {
        width: 750px;
    }
}

</style>