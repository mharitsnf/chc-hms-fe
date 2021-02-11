import { userValidation } from "../../globals/page-functions"
import AdminLayout from "../../components/admin-layout"
import { Grid, _ } from "gridjs-react";
import "gridjs/dist/theme/mermaid.css";
import { useEffect } from "react";

const CustomerListLayout = ({ cookie }) => {
    return (
        <div className="container main-content">
            <section className="hero">
                <div className="hero-body">
                    <h1 className="title">Customer List</h1>
                </div>
            </section>
            <div className="container">
                <Grid
                    server={{
                        url: `${process.env.NEXT_PUBLIC_BE_URL}/customers`,
                        headers: { authorization: `Bearer ${cookie.token}` },
                        then: data => data.data.map(customer => [
                            customer.customerType,
                            customer.picData.picName,
                            customer.picData.picTelp,
                            customer.picData.picEmail,
                            customer._id
                        ])
                    }}
                    columns={[ 'Tipe Customer', {
                        name: 'Nama',
                        formatter: cell => _(<a>{cell}</a>),
                        attributes: (cell, row, column) => {
                            return {
                                onClick: () => {
                                    
                                }
                            }
                        }
                    }, 'No. Telepon', 'Email', { name: 'id', hidden: true }]}
                    search={true}
                    pagination={{
                        enabled: true,
                        limit: 15,
                    }}
                />
            </div>
        </div>
    )
}

const CustomerList = ({ userCookie }) => {
    const content = <CustomerListLayout cookie={userCookie} />

    return (
        <AdminLayout content={content} cookie={userCookie} menu="customer-list" />
    )
}

export default CustomerList

export const getServerSideProps = async (ctx) => {
    return await userValidation(ctx)
}