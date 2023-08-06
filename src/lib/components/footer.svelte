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
        flex-shrink: 0;
        min-height: 80px;
        width: 100%;
        border-top: 2px solid var(--border);
        background-color: #171717;
    }

    p,
    a {
        font-weight: bold;
    }

    @media (max-width: 750px) {
        footer {
            width: 750px;
        }
    }
</style>

