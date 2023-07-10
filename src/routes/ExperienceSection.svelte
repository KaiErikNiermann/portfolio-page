<script lang="ts" type="module">
    interface ExperienceSectionProps {
        name: string;
        description: string;
        technologies: string[];
        startDate: string;
        endDate: string;
        link: string;
    }
    
    import ExperienceCard from "./InformationCard.svelte";
    
    import experience from "./Experience.json";
 
    const my_experience: ExperienceSectionProps[] = experience.experience;
</script>

<div class="experience-section-container">
    <div class="experience-title-section">
        <h1>Experience</h1>
    </div>
    <div class="experience-card-section">
        {#each my_experience as information}
            <ExperienceCard bind:information />
        {/each}
    </div>
</div>

<style lang="scss">
    .experience-section-container {
        display: flex;
        flex-direction: column;
        justify-content: right;
        align-items: center;
        min-width: calc(1100px - 400px);
    }

    .experience-title-section {

        h1 {
            font-weight: 700;
            font-size: 50px;
            line-height: 61px;

            @include gradient-text;

            margin-block-end: 0;
        }
    }

    .experience-title-section {
        padding-right: 100px;
    }
</style>