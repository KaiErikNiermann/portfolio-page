<footer>
    <p>
        website made by
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
        min-height: 100px;
        width: 100vw;
        background-color: #171717;
    }

    p {
        font-weight: bold;
        background-color: #171717;
    }

    @media (max-width: 750px) {
        footer {
            width: 750px;
        }
}
</style>
