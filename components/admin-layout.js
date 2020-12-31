import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import "bulma/css/bulma.css"

const AdminLayout = (props) => {
    const [isClosed, setIsClosed] = useState(true)

    useEffect(() => {
        console.log(props.menu)
    })

    return (
        <div>
            <div className="container">
                <nav className="navbar is-hidden-desktop" role="navigation" aria-label="main navigation">
                    <div className="navbar-brand">
                        <Link href="/">
                            <a className="navbar-item">
                                CHC HMS
                            </a>
                        </Link>

                        <div className={`navbar-burger ${isClosed ? '' : 'is-active'}`} onClick={() => setIsClosed(!isClosed)}>
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                        </div>
                    </div>

                    <div className={`navbar-menu ${isClosed ? '' : 'is-active'}`}>
                        <div className="navbar-start">
                            <div className="navbar-item has-dropdown is-hoverable">
                                <a className="navbar-link">
                                    General
                                </a>
                                <div className="navbar-dropdown">
                                    <Link href="/">
                                        <a className="navbar-item">
                                            Home
                                        </a>
                                    </Link>
                                </div>
                            </div>
                            <div className="navbar-item has-dropdown is-hoverable">
                                <a className="navbar-link">
                                    Accommodation
                                </a>
                                <div className="navbar-dropdown">
                                    <Link href="/accommodation/accommodation-list">
                                        <a className="navbar-item">
                                            Accommodation List
                                        </a>
                                    </Link>
                                    <Link href="/accommodation/accommodation-history">
                                        <a className="navbar-item">
                                            Accommodation History
                                        </a>
                                    </Link>
                                </div>
                            </div>
                            <div className="navbar-item has-dropdown is-hoverable">
                                <a className="navbar-link">
                                    Customer
                                </a>
                                <div className="navbar-dropdown">
                                    <Link href="/customer/customer-list">
                                        <a className="navbar-item">
                                            Customer List
                                        </a>
                                    </Link>
                                </div>
                            </div>
                            <div className="navbar-item has-dropdown is-hoverable">
                                <a className="navbar-link">
                                    Administration
                                </a>
                                <div className="navbar-dropdown">
                                    <Link href="/administration/employee-list">
                                        <a className="navbar-item">
                                            Employee List
                                        </a>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
                <div className="columns">
                    <div className="column is-3">
                        <aside className="menu is-hidden-touch">
                            <div className="is-flex is-justify-content-center">
                                <Image src="/samplelogo.png" height="256" width="256" />
                            </div>
                            {/* General section */}
                            <p className="menu-label">
                                General
                            </p>
                            <ul className="menu-list">
                                <li><Link href="/"><a className={props.menu === 'home' ? 'is-active' : ''}>Home</a></Link></li>
                            </ul>
                            {/* Accommodation section */}
                            <p className="menu-label">
                                Accommodation
                            </p>
                            <ul className="menu-list">
                                <li><Link href="/accommodation/accommodation-list"><a className={props.menu === 'accommodation-list' ? 'is-active' : ''}>Accommodation List</a></Link></li>
                                <li><Link href="/accommodation/accommodation-history"><a className={props.menu === 'accommodation-history' ? 'is-active' : ''}>Accommodation History</a></Link></li>
                            </ul>
                            {/* Customer section */}
                            <p className="menu-label">
                                Customer
                            </p>
                            <ul className="menu-list">
                                <li><Link href="/customer/customer-list"><a className={props.menu === 'customer-list' ? 'is-active' : ''}>Customer List</a></Link></li>
                            </ul>
                            {/* Administration section */}
                            <p className="menu-label">
                                Administration
                            </p>
                            <ul className="menu-list">
                                <li><Link href="/administration/employee-list"><a className={props.menu === 'employee-list' ? 'is-active' : ''}>Employee List</a></Link></li>
                            </ul>
                        </aside>
                    </div>
                    <div className="column is-9">
                        {props.content}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminLayout