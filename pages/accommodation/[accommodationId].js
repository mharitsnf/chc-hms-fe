import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import AdminLayout from "../../components/admin-layout"
import Loader from "../../components/loader"
import axios from "axios";
import Cookie from "cookie";
import { userValidation } from "../../globals/page-functions"

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

    return <AdminLayout content={content} cookie={userCookie} menu="accommodation-list" />
}

export default Accommodation

export const getServerSideProps = async (ctx) => {
    return await userValidation(ctx)
}