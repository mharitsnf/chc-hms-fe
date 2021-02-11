import { userValidation } from "../../globals/page-functions"
import AdminLayout from "../../components/admin-layout"
import { Grid, _ } from "gridjs-react";
import "gridjs/dist/theme/mermaid.css";
import { useEffect, useState } from "react";

const CustomerListLayout = ({ cookie }) => {
    const [customer, setCustomer] = useState({})
    const [detailsModal, setDetailsModal] = useState(false)
    const [selectedType, setSelectedType] = useState('FIT')

    const openModal = (customerId) => {
        setCustomer({ id: customerId})
        setDetailsModal(true)
    }

    const closeModal = () => {
        setCustomer({})
        setDetailsModal(false)
    }

    useEffect(() => {
        console.log(customer)
    }, [customer])

    return (
        <div className="container main-content">
            <section className="hero">
                <div className="hero-body">
                    <h1 className="title">Customer List</h1>
                </div>
            </section>

            {/* Modal */}
            <div className={`modal ${detailsModal ? 'is-active' : ''}`}>
                <div className="modal-background"></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">Search Customer</p>
                        <button className="delete" aria-label="close" onClick={closeModal}></button>
                    </header>
                    <section className="modal-card-body">
                        <div className="container"></div>
                    </section>
                    <footer className="modal-card-foot"/>
                </div>
            </div>

            {/* Content */}
            <div className="container">
                <div className="field is-horizontal">
                    <div className="field-label is-normal">
                        <label className="label">Customer type </label>
                    </div>
                    <div className="field-body">
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
                                onClick: () => {
                                    openModal(row.cells[4].data)
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