<script>
    import ExperienceSection from "./ExperienceSection.svelte";
    import InfoSection from "./InfoSection.svelte";
    import ProjectsSection from "./ProjectsSection.svelte";
</script>

<article>
    <div class="main-container">
        <InfoSection />
        <ProjectsSection />
        <ExperienceSection />
    </div>
</article>

<style>
    article {
        flex: 1;
    }

    .main-container {
        display: flex;
        flex-direction: horizontal;
    }

    @media (max-width: 1100px) {
        .main-container {
            flex-direction: column;
        }
    }
</style>