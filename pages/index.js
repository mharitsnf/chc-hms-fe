import "bulma/css/bulma.css"
import AdminLayout from "../components/admin-layout";
import { userValidation } from "../globals/page-functions"

const HomeLayout = ({ cookie }) => {
    return (
        <div className="container main-content">
            <section className="hero">
                <div className="hero-body">
                    <h1 className="title">Overview</h1>
                </div>
            </section>
        </div>
    )
}

const Home = ({ userCookie }) => {

    const content = <HomeLayout cookie={userCookie}/>

    return (
        <AdminLayout content={content} cookie={userCookie} menu="home"/>
    )
}

export default Home

export const getServerSideProps = async (ctx) => {
    return await userValidation(ctx)
}