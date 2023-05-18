<nav>   
    <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
    </ul>
</nav>

<style lang="scss">
     // css that spaces the nav bar items evenly 
    nav {
        display: flex;
        justify-content: left;
        a {
            padding: 1rem;
            text-decoration: none;
            color: #000;
            &:hover {
                color: #fff;
                background-color: #000;
            }
        }
        
        // remove the default list styling
        li {
            list-style: none;
            display: inline-block;
        }
    }

</style>
