<script>
    import { browser } from "$app/environment";

    if (browser) {
        window.addEventListener("scroll", function() {
            const footer = document.getElementById("site-footer");
            if (footer) {
                const scrollPosition = window.scrollY;
                const windowHeight = window.innerHeight;
                const bodyHeight = document.body.scrollHeight;

                // Calculate the distance between the bottom of the viewport and the bottom of the page
                const distanceToBottom = bodyHeight - (scrollPosition + windowHeight);

                // Set the visibility of the footer based on the distance to the bottom
                footer.style.visibility = distanceToBottom > 100 ? "visible" : "hidden";
            }
        });
    }
</script>


<footer id="site-footer">
    <p>
        page made by
        <a
            href="https://github.com/KaiErikNiermann"
            target="_blank">@Kai Erik Niermann</a
        >
        using
        <a href="https://kit.svelte.dev" target="_blank"> SvelteKit </a>
        and TypeScript.
    </p>
</footer>


<style>
    footer {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 80px;
        width: 100vw;
        position: fixed;
        bottom: 0;
        left: 0;
        border-top: 2px solid var(--border);
        background-color: #171717;
    }

    p, a {
        font-weight: bold;
    }

    @media (max-width: 750px) {
        footer {
            width: 750px;
        }
}
</style>
