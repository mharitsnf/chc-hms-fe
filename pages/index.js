import axios from "axios";
import "bulma/css/bulma.css"
import AdminLayout from "../components/admin-layout";
import Cookie from "cookie";

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
        <AdminLayout content={content} menu="home"/>
    )
}

export default Home

export const getServerSideProps = async (ctx) => {
    try {
        const cookie = Cookie.parse(ctx.req.headers.cookie)
        const user = JSON.parse(cookie.user)

        const verifyRes = await axios.post(
            `${process.env.NEXT_PUBLIC_BE_URL}/auth/verify`,
            {
                token: user.token
            }
        )
        if (verifyRes.status != 200) {
            throw new Error('Not verified!')
        }
        return { props: { userCookie: user } }
    } catch (error) {
        ctx.res.writeHead(302, { Location: '/login' })
        ctx.res.end()
        return { props: {} }
    }
}