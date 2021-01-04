import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import AdminLayout from "../../components/admin-layout"
import axios from "axios";


const AccommodationLayout = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [accommodationData, setAccommodationData] = useState({})
    const router = useRouter()
    const { accommodationId } = router.query
    
    useEffect(async () => {
        try {
            const getAccomRes = await axios.get(
                `${process.env.NEXT_PUBLIC_BE_URL}/accommodations/${accommodationId}`,
                {
                    headers: { authorization: `Bearer ${localStorage.getItem('token')}` }
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
            return (
                <h1 className="title">Please wait...</h1>
            )
        } else {
            return (
                <h1 className="title">{accommodationData.name}</h1>
            )
        }
    }

    return (
        <div className="container main-content">
            <section className="hero">
                    <div className="hero-body">
                        <Content/>
                    </div>
            </section>
        </div>
    )
}

const Accommodation = () => {
    const content = <AccommodationLayout/>

    return <AdminLayout content={content} menu="accommodation-list" />
}

export default Accommodation