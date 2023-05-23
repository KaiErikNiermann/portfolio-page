<script lang="ts" type="module">
    interface Project {
        name: string;
        description: string;
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
        </div>
        <p>{project.description}</p>
    </div>
    <div class="project-card-timeframe">
        <p>{project.startDate}</p>
        <div id="line-sep" />
        <p>{project.endDate}</p>
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
        border: 1px solid white;
        background-color: #444;
        border-radius: 13px;
        font-size: small;

        h1, p {
            -webkit-text-fill-color: white;
            -webkit-background-clip: text;
            background-clip: text;
            padding-left: 20px;
        }

        p {
            padding: 20px;
        }
    }
    
    .project-title-section {
        border: 1px solid white;
        border-radius: 13px;
        padding: 10px 0;
        background: linear-gradient(270deg, #DB00FF 0%, #FF5C5C 100%);

        h1 {
            -webkit-text-fill-color: white;
            -webkit-background-clip: text;
            background-clip: text;
        }        
    }

    .project-card-timeframe {
        display: flex;
        flex-direction: column;
        align-items: center;
        height: fit-content;
        justify-content: space-evenly;
        border: 1px solid white;
    }

    #line-sep {
        width: 1px;
        height: 100px;
        background-color: white;
    }
</style>