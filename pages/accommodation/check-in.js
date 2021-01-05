import Cookie from "cookie";
import axios from "axios";
import AdminLayout from "../../components/admin-layout";

const CheckInLayout = ({ cookie }) => {
    return (
        <div className="container main-content">
            <section className="hero">
                <div className="hero-body">
                    <h1 className="title">Check-In</h1>
                </div>
            </section>
        </div>
    )
}

const CheckIn = ({ userCookie }) => {
    const content = <CheckInLayout cookie={userCookie} />

    return (
        <AdminLayout content={content} menu="check-in" />
    )
}

export default CheckIn

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
        console.log(error)
        ctx.res.writeHead(302, { Location: '/login' })
        ctx.res.end()
        return { props: {} }
    }
}