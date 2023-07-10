<script lang="ts" type="module">
    interface information {
        name: string;
        description: string;
        technologies: string[];
        startDate: string;
        endDate: string;
        link: string;
    }

    let hidden: boolean = false;
    export let information: information;
</script>

<div class="information-card">
    <div class="information-card-content">
        <div class="information-title-section">
            <div class="information-upper-title">
                <a href={information.link}><h1>{information.name}</h1></a>
                <button
                    class="information-card-button"
                    on:click={() => {
                        hidden = !hidden;
                    }}
                >
                    {#if hidden}
                        View
                    {:else}
                        Hide
                    {/if}
                </button>
            </div>
            <p>
                {#each information.technologies as tech}
                    {#if tech == information.technologies[information.technologies.length - 1]}
                        <strong>{tech}</strong>
                    {:else}
                        <strong>{tech + ", "}</strong>
                    {/if}
                {/each}
            </p>
        </div>
        <div
            class:information-card-description={!hidden}
            class:inactive={hidden}
        >
            <h3>Description</h3>
            <p>{information.description}</p>
        </div>
    </div>

    <div
        class:information-card-timeframe={!hidden}
        class:inactive-timeframe={hidden}
    >
        <p>{information.startDate}</p>
        <div id="line-sep" />
        <p>{information.endDate}</p>
    </div>
</div>

<style lang="scss">
    .information-card {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 25px 0;
    }

    .information-card-content {
        width: 500px;
        height: auto;
        background-color: #444;
        border-radius: 13px;
        font-size: small;

        h3,
        h1,
        p,
        .information-card-description {
            background-color: #171717;
            -webkit-text-fill-color: white;
            -webkit-background-clip: text;
            background-clip: text;
            padding-left: 20px;
            margin: 10px;
        }

        .information-upper-title,
        a {
            background-color: #171717;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            padding: 0 20px;
        }

        .information-upper-title {
            button {
                background-color: #171717;
                border: 2px solid #171717;
                border-radius: 13px;
                padding: 5px 10px;
                padding-left: 20px;
                padding-right: 20px;
                transition: 0.2s;
                cursor: pointer;

                &:hover {
                    background-color: #444;
                    border: 2px solid #444;
                }
            }
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

        h1,
        p {
            -webkit-text-fill-color: white;
            -webkit-background-clip: text;
            background-clip: text;
        }

        p,
        strong {
            background: #171717;
            padding-bottom: 0;
            padding-top: 0;
        }
    }

    .inactive-timeframe {
        visibility: hidden;
        #line-sep {
            display: none;
        }
        padding-left: 20px;
    }

    .inactive {
        display: none;
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
