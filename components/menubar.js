import "bulma/css/bulma.css"

const Menubar = () => {
    return (
        <aside className="menu">
            <p className="menu-label">
                General
            </p>
            <ul className="menu-list">
                <li><a>Overview</a></li>
            </ul>
            <p className="menu-label">
                Front Office
            </p>
            <ul className="menu-list">
                <li><a>Accommodation</a></li>
                <li><a>History</a></li>
                <li><a>Customers</a></li>
            </ul>
            <p className="menu-label">
                Administration
            </p>
            <ul className="menu-list">
                <li><a>Employees</a></li>
            </ul>
        </aside>
    )
}

export default Menubar