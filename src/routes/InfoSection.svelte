<script lang="ts" type="module">
    function cpyDiscHandle() {
        navigator.clipboard.writeText("@Applesauce#5880");
        alert("Copied username to clipboard!");
    }
</script>

<div class="info-section-container">
    <div class="info-title-section">
        <h1>Kai Erik Niermann</h1>
        <ul>
            <li>
                <a href="https://github.com/KaiErikNiermann"><h3>github</h3></a>
            </li>
            <li>
                <a href="https://www.linkedin.com/in/kai-niermann-0794ab91/"
                    ><h3>linkedin</h3></a
                >
            </li>
            <li>
                <h3>twitter</h3>
            </li>
            <li>
                <h3
                    id="discord-handle"
                    on:click={() => cpyDiscHandle()}
                    on:keydown={() => cpyDiscHandle()}
                >
                    discord
                </h3>
            </li>
        </ul>
    </div>
</div>

<style lang="scss">
    .info-section-container {
        padding-left: 40px;
        margin: none;
        display: flex;
        flex-direction: column;
        align-items: left;
        justify-content: left;
        align-items: center;
        min-width: 300px;
        width: 300px;
        border-right: 2px solid #171717;

        ul {
            list-style: none;
            padding-left: 0;
            padding: 0;
            padding-inline-start: 0;
            margin-block-start: 0;
            margin-block-end: 0;
            li {
                margin-block-start: 0;
                margin-block-end: 0;
                width: fit-content;
            }
        }

        h1 {
            font-weight: 700;
            font-size: 50px;
            line-height: 61px;
            text-align: left;
            width: fit-content;

            background: linear-gradient(
                270deg,
                #ffffff 25%,
                #0400ff 109.47%,
                #ffffff 109.48%
            );
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;

            margin-block-end: 0;
        }

        h3,
        a {
            cursor: pointer;
            margin-bottom: 0;
            margin-block-start: 0;
        }

        h3 {
            padding-left: 10px;
            border-left: 2px solid transparent;

            padding-right: 10px;
            border-right: 2px solid transparent;
        }

        h3:hover,
        a:hover {
            border-left: 2px solid white;
            border-right: 2px solid white;
        }
    }

    @media (max-width: 1800px) {
        .info-section-container {
            border-right: none;
            width: fit-content;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            padding-right: 100px;
        }

        ul {
            display: flex;
            flex-direction: row;
            justify-content: space-evenly;
            align-items: center;
            width: 100%;
        }
    }
</style>
