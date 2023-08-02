<script lang="ts" type="module">
    export let data: { posts: App.Post[] } = { posts: [] };
    export let section_type: number;
</script>

<div class="post-section-container">
    <div class="post-card-section">
        <h1 id="post-title">{section_type === 1 ? "Projects" : "Experience"}</h1>
        <ul class="posts">
            {#each data.posts as post}
                {#if post.project == section_type}
                    <li class="post">
                        <a href={post.github === null ? post.slug : post.github} class="title">{post.title}</a>
                        <p class="date">{post.date}</p>
                        <p class="description">{post.description}</p>
                    </li>
                {/if}
            {/each}
        </ul>
    </div>
</div>

<style lang="scss">
    .post-section-container {
        display: flex;
        flex-direction: column;
        justify-content: right;
        align-items: center;
        min-width: 700px;
    }
    h1 {
        font-weight: 700;
        font-size: 50px;
        line-height: 61px;

        @include gradient-text;

        margin-block-end: 0;
    }

    .posts {
        display: grid;
        gap: 2rem;
    }

    .post {
        max-inline-size: var(--size-content-3);
    }

    .post:not(:last-child) {
        border-bottom: 1px solid var(--border);
        padding-bottom: var(--size-7);
    }

    .title {
        font-size: var(--font-size-fluid-1);
        text-transform: capitalize;
    }

    .date {
        color: var(--text-2);
    }

    .description {
        margin-top: var(--size-3);
    }
</style>