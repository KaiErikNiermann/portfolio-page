<script lang="ts">
    import PostSection from "./PostSection.svelte";
    import InfoSection from "./InfoSection.svelte";
    import Footer from "./footer.svelte";
    export let data;
</script>

<div class="main-div">
    <div class="main-container">
        <InfoSection />
        <div id="projects-and-experience">
            <PostSection {data} section_type={1} />
            <PostSection {data} section_type={0} />
        </div>
    </div>
    <Footer/>
</div>

<style>
    div.main-div {
        flex: 1;
    }

    .main-container,
    #projects-and-experience {
        display: flex;
        flex-direction: horizontal;
    }

    @media (max-width: 1400px) {
        .main-container,
        #projects-and-experience {
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

