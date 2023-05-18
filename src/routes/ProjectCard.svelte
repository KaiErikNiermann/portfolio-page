<script lang="ts" type="module">
    export let project: string;
</script>

<div class="project-card">
    <div class="project-card-content">
        <h1>{project}</h1>
        <p>Project description</p>
    </div>
    <div class="project-card-timeframe">
        <p>end</p>
        <p>start</p>
    </div>
</div>

<style lang="scss">
    .project-card {
        display: flex;
        align-items: center;
    }

    .project-card-content {
        width: 400px;
        border: 1px solid white;
    }

    .project-card-timeframe {
        border: 1px solid white;
    }

</style>