<script lang="ts" type="module">
    interface information {
        name: string;
        description: string;
        technologies: string[];
        startDate: string;
        endDate: string;
        link: string;
    }

    export let information: information;
</script>

<div class="information-card">
    <div class="information-card-content">
        <div class="information-title-section">
            <a href="{information.link}"><h1>{information.name}</h1></a>
            <p>
            {#each information.technologies as tech}
                <strong>{tech + " | "}</strong>
            {/each}
            </p>
        </div>
        <h3>Description</h3>
        <p>{information.description}</p>
    </div>
    <div class="information-card-timeframe">
        <p><i>{information.startDate}</i></p>
        <div id="line-sep" />
        <p><i>{information.endDate}</i></p>
    </div>
</div>

<style lang="scss">
    .information-card {
        display: flex;
        align-items: center;
        padding: 25px 0;
    }

    .information-card-content {
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
    
    .information-title-section {
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

    .information-card-timeframe {
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