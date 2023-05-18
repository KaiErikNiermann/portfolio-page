<script lang="ts" type="module">
    import ProjectCard from "./ProjectCard.svelte";

    let projects: Array<string> = [
        "Project 1",
        "Project 2",
        "Project 3"
    ]

</script>

<div id="project-section-container">
    <div class="project-title-section">
        <h1>Projects</h1>
    </div>
    <div class="project-card-section">
        {#each projects as project}
            <ProjectCard bind:project={project} />
        {/each}
    </div>
</div>

<style lang="scss">
    #project-section-container {
        display: flex;
        flex-direction: column;
        justify-content: right;
        align-items: center;
        min-width: calc(1100px - 400px);
        border: 1px solid white;
    }

    .project-title-section {
        h1 {
            font-weight: 700;
            font-size: 50px;
            line-height: 61px;

            background: linear-gradient(
                270deg,
                #ffffff 4.03%,
                #0500fa 109.47%,
                #ffffff 109.48%
            );
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;

            margin-block-end: 0;
        }
    }
</style>
