import Cookie from "cookie";
import axios from "axios";
import AdminLayout from "../../components/admin-layout";
import { userValidation } from "../../globals/page-functions"

const CheckOutLayout = ({ cookie }) => {
    return (
        <div className="container main-content">
            <section className="hero">
                <div className="hero-body">
                    <h1 className="title">Check-Out</h1>
                </div>
            </section>
        </div>
    )
}

const CheckOut = ({ userCookie }) => {
    const content = <CheckOutLayout cookie={userCookie} />

    return (
        <AdminLayout content={content} cookie={userCookie} menu="check-out" />
    )
}

export default CheckOut

export const getServerSideProps = async (ctx) => {
    return await userValidation(ctx)
}