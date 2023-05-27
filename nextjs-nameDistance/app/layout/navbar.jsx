import ''

export default function Navbar() {
    return (
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
            <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="/index.html">Tech Demo</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/about.html">About</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href = "/futurePlans.html">Future Plans</a>
                </li>
            </ul>
            </div>
        </div>
    </nav>
    )

}

