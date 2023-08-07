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
            <!-- <li>
                <h3>twitter</h3>
            </li> -->
            <li>
                <h3
                    id="discord-handle"
                    on:click={() => cpyDiscHandle()}
                    on:keydown={() => cpyDiscHandle()}
                >
                    discord
                </h3>
            </li>
            <li>
                <a href="mailto:kai.niermann@gmail.com"><h3>email</h3></a>
            </li>
        </ul>
    </div>
    <!-- Blog button -->
    <a href="/blog">
        <h3>Blog posts</h3>
    </a>
</div>

<style lang="scss">
    .info-section-container {
        padding-left: 40px;
        display: flex;
        flex-direction: column;
        align-items: center;
        min-width: 300px;
        width: 300px;

        ul {
            list-style: none;
            padding: 0;
            margin: 0;
            li {
                margin: 0;
                width: fit-content;
            }
        }

        h1 {
            font-weight: 700;
            font-size: 50px;
            line-height: 61px;
            text-align: left;
            width: fit-content;
            @include gradient-text;
            margin-bottom: 0;
        }

        h3,
        a {
            cursor: pointer;
            margin: 0;
        }

        h3 {
            padding-left: 10px;
            border-left: 2px solid transparent;
            padding-right: 10px;
            border-right: 2px solid transparent;
        }

        h3:hover,
        a:hover {
            border-left: 2px solid var(--border);
            border-right: 2px solid var(--border);
        }

        @media (max-width: 1800px) {
            border-right: none;
            width: fit-content;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            padding-right: 100px;

            ul {
                display: flex;
                flex-direction: row;
                justify-content: space-evenly;
                align-items: center;
                width: 100%;
            }
        }
    }

    .info-title-section { 
        border-bottom: 1px solid var(--border);
        padding-bottom: var(--size-7);
    }

    a[href="/blog"], a[href="/blog"]:hover {
        text-decoration: none;
        color: var(--text-2);
        border-radius: 5px;
        padding: 5px;
        margin-top: 10px;
        margin-bottom: 10px;
        width: fit-content;
        border-left: none;
        border-right: none;
        border: none;
    }
</style>
