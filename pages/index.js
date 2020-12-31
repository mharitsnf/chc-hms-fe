import "bulma/css/bulma.css"
import AdminLayout from "../components/admin-layout";

const HomeLayout = () => {
    return (
        <div className="container main-content">
            <div className="columns">
                <div className="column">
                    <h1>Hello</h1>
                </div>
                <div className="column">
                    <h1>This is my home page</h1>
                </div>
            </div>
        </div>
    )
}

const Home = () => {

    const content = <HomeLayout/>

    return (
        <AdminLayout content={content} menu="home"/>
    )
}

export default Home