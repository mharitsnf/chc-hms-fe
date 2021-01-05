import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import AdminLayout from "../../components/admin-layout"
import Loader from "../../components/loader"
import axios from "axios";
import Cookie from "cookie";

const AccommodationLayout = ({ cookie }) => {
    const [isLoading, setIsLoading] = useState(true)
    const [accommodationData, setAccommodationData] = useState({})
    const router = useRouter()
    const { accommodationId } = router.query

    useEffect(async () => {
        try {
            const getAccomRes = await axios.get(
                `${process.env.NEXT_PUBLIC_BE_URL}/accommodations/${accommodationId}`,
                {
                    headers: { authorization: `Bearer ${cookie.token}` }
                }
            )
            if (getAccomRes.status == 400) {
                throw new Error('unauthorized')
            }
            setAccommodationData(getAccomRes.data.data)
            setIsLoading(false)
        } catch (error) {
            if (error.message == 'unauthorized') {

            }
        }
    }, [])

    const Content = () => {
        if (isLoading) {
            return <Loader/>
        } else {
            return (
                <div className="container main-content">
                    <section className="hero">
                        <div className="hero-body">
                            <h1 className="title">{accommodationData.name}</h1>
                        </div>
                    </section>
                </div>
            )
        }
    }

    return <Content />
}

const Accommodation = ({ userCookie }) => {
    const content = <AccommodationLayout cookie={userCookie} />

    return <AdminLayout content={content} menu="accommodation-list" />
}

export default Accommodation

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