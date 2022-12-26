
<h1>applesauce's page</h1>
<p>Page is a component that is used to render a page.</p>

<div id="main_content"> 
    <aside id="sidebar">
        <h2>sidebar</h2>
        <p>sidebar is a component that is used to render a sidebar.</p>
    </aside>

    <section id="main_section">
        <h2>main section</h2>
        <p>main section is a component that is used to render a main section.</p>
    </section>
</div>

<!-- set background color to black -->
<style>
    div#main_content {
        display: flex;
    }

    aside#sidebar {
        width: 25%;
        height: 100vh;
    }

    section#main_section {
        padding-left: 10px;
        border-left: 2px solid rgb(218, 218, 218);
        width: 75%;
        height: 100vh;
    }

    * {
        font-family: monospace;
        color: rgb(255, 255, 255);
    }
</style>

