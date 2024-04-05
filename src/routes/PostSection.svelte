<script lang="ts" type="module">
    export let data: { posts: App.Post[] } = { posts: [] };
    export let section_type: number;
</script>

<div class="post-section-container">
    <div class="post-card-section">
        <h1 id="post-title">{section_type === 1 ? "Projects" : "Experience"}</h1>
        <ul class="posts">
            {#each data.posts as post}
                {#if post.post_type == section_type}
                    <li class="post">
                        <a href={post.github === null ? `${post.slug}` : post.github} class="title">
                            {#if post.github !== null}
                                <i class="fa-brands fa-github"></i>
                            {/if}
                            {post.title}
                        </a>
                        <div class="post-metadata">
                            <p class="date">{post.date}</p>
                            <p class="categories">{post.categories.join(", ")}</p>
                        </div>
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

    div.post-metadata {
        display: flex;
        justify-content: left;
        margin-top: var(--size-2);
        p {
            margin-right: var(--size-2);
        }
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
        font-size: 25px;
        text-transform: capitalize;
    }

    .date {
        color: var(--text-2);
    }

    .description {
        margin-top: var(--size-3);
    }
</style>