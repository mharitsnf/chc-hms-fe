import { userValidation } from "../../globals/page-functions"
import AdminLayout from "../../components/admin-layout"
import EditCustomerModal from "../../components/add-customer-modal"
import { Grid, _ } from "gridjs-react";
import "gridjs/dist/theme/mermaid.css";
import { useState } from "react";
import Router from "next/router";

const CustomerListLayout = ({ cookie }) => {
    const [customerId, setCustomerId] = useState('')
    const [selectedType, setSelectedType] = useState('FIT')

    return (
        <div className="container main-content">
            <section className="hero">
                <div className="hero-body">
                    <h1 className="title">Customer List</h1>
                </div>
            </section>

            <EditCustomerModal
                cookie={cookie}
                customerId={customerId}
                setCustomerId={setCustomerId}
            />

            {/* Content */}
            <div className="field">
                <label className="label">Customer type </label>
                <div className="control">
                    <div className="select">
                        <select onChange={(event) => setSelectedType(event.target.value)}>
                            <option value='FIT'>FIT</option>
                            <option value='Group'>Group</option>
                        </select>
                    </div>
                </div>
            </div>
            <Grid
                server={{
                    url: `${process.env.NEXT_PUBLIC_BE_URL}/customers?customerType=${selectedType}`,
                    headers: { authorization: `Bearer ${cookie.token}` },
                    then: data => data.data.map(customer => [
                        customer.customerType,
                        customer.picData.picName,
                        customer.picData.picTelp,
                        customer.picData.picEmail,
                        customer._id
                    ])
                }}
                columns={['Tipe Customer', {
                    name: 'Nama',
                    formatter: cell => _(<a>{cell}</a>),
                    attributes: (cell, row, column) => {
                        return {
                            onClick: (event) => {
                                event.preventDefault()
                                Router.push(`/customer/${row.cells[4].data}`)
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