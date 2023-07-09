<script lang="ts">
    import ExperienceSection from "./ExperienceSection.svelte";
    import InfoSection from "./InfoSection.svelte";
    import ProjectsSection from "./ProjectsSection.svelte";

</script>

<article>
    <div class="main-container">
        <InfoSection />
        <div id="projects-and-experience">
            <ProjectsSection />
            <ExperienceSection />
        </div>
    </div>
</article>

<style>
    article {
        flex: 1;
    }

    .main-container, #projects-and-experience {
        display: flex;
        flex-direction: horizontal;
    }

    @media (max-width: 1400px) {
        .main-container, #projects-and-experience {
            flex-direction: column;
        }
    }
    
    @media (max-width: 1800px) {
        .main-container {
            flex-direction: column; 
            justify-content: center;
            align-items: center;
        }
    } 

    @media (max-width: 750px) {
        .main-container {
            width: 750px;
        }
    }
    
</style>
