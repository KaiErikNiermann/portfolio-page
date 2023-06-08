<script lang="ts" type="module">
    interface Project {
        name: string;
        description: string;
        technologies: string[];
        startDate: string;
        endDate: string;
        link: string;
    }
    
    import ProjectCard from "./InformationCard.svelte";
    
    import projects from "./Projects.json";
 
    const my_projects: Project[] = projects.projects;
</script>

<div id="project-section-container">
    <div class="project-title-section">
        <h1>Projects</h1>
    </div>
    <div class="project-card-section">
        {#each my_projects as information}
            <ProjectCard bind:information />
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
        // border-right: 2px solid #171717;
    }

    .project-title-section {
        h1 {
            font-weight: 700;
            font-size: 50px;
            line-height: 61px;
            padding-right: 30px;

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

    .project-title-section {
        padding-right: 100px;
    }
    @media (max-width: 1800px) {
        #project-section-container {
            border-right: none;
            align-items: center;
            justify-content: center;
            
        }
    }
</style>
