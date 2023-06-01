<script lang="ts" type="module">
    interface Project {
        name: string;
        description: string;
        technologies: string[];
        startDate: string;
        endDate: string;
        link: string;
    }

    export let project: Project;
</script>

<div class="project-card">
    <div class="project-card-content">
        <div class="project-title-section">
            <a href="{project.link}"><h1>{project.name}</h1></a>
            <p>
            {#each project.technologies as tech}
                <strong>{tech + " | "}</strong>
            {/each}
            </p>
        </div>
        <h3>Description</h3>
        <p>{project.description}</p>
    </div>
    <div class="project-card-timeframe">
        <p><i>{project.startDate}</i></p>
        <div id="line-sep" />
        <p><i>{project.endDate}</i></p>
    </div>
</div>

<style lang="scss">
    .project-card {
        display: flex;
        align-items: center;
        padding: 25px 0;
    }

    .project-card-content {
        width: 500px;
        height: auto;
        background-color: #444;
        border-radius: 13px;
        font-size: small;

        h3, h1, p {
            -webkit-text-fill-color: white;
            -webkit-background-clip: text;
            background-clip: text;
            padding-left: 20px;
        }

        p {
            padding: 20px;
            padding-top: 0px;
        }
    }
    
    .project-title-section {
        border-radius: 13px;
        padding: 10px 0;
        background: #171717;

        h1 {
            -webkit-text-fill-color: white;
            -webkit-background-clip: text;
            background-clip: text;
        }        
    
        p {
            padding-bottom: 0;
            padding-top: 0;
        }
    }

    .project-card-timeframe {
        display: flex;
        flex-direction: column;
        align-items: center;
        height: fit-content;
        justify-content: space-evenly;
        padding-left: 20px;
    }

    #line-sep {
        width: 2px;
        height: 120px;
        background-color: #444444;
    }
</style>