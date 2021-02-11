import AdminLayout from "../../components/admin-layout";
import { Grid, _ } from "gridjs-react";
import "gridjs/dist/theme/mermaid.css";
import { useState } from "react";
import { userValidation } from "../../globals/page-functions"

const SearchCustomerContent = ({ cookie, setCustomerId, closeCustomerModal }) => {
    return (<Grid
        server={{
            url: `${process.env.NEXT_PUBLIC_BE_URL}/customers`,
            headers: { authorization: `Bearer ${cookie.token}` },
            then: data => data.data.map(customer => [
                customer.customerType,
                customer.picData.picName,
                customer.picData.picEmail,
                customer.picData.picTelp,
                customer._id
            ])
        }}
        columns={['Tipe', {
            name: 'Nama',
            formatter: cell => _(<a>{cell}</a>),
            attributes: (cell, row, column) => {
                return {
                    onClick: (event) => {
                        setCustomerId(row.cells[4].data)
                        closeCustomerModal(event)
                    }
                }
            }
        }, 'Email', 'No. Telepon', { name: 'id', hidden: true }]}
        search={true}
        pagination={{
            enabled: true,
            limit: 10
        }}
    />)
}

const CheckInLayout = ({ cookie }) => {
    const [customerId, setCustomerId] = useState(null)
    const [modalContent, setModalContent] = useState(null)
    const [customerModal, setCustomerModal] = useState(false)

    const openCustomerModal = (event) => {
        event.preventDefault()        
        switch (event.target.name) {
            case 'search-customer':
                setModalContent(
                    <SearchCustomerContent
                        cookie={cookie}
                        setCustomerId={setCustomerId}
                        closeCustomerModal={closeCustomerModal}
                    />
                )
                break
        
            default:
                break
        }
        setCustomerModal(true)

    }

    const closeCustomerModal = (event) => {
        event.preventDefault()
        setCustomerModal(false)
        setModalContent(null)
    }

    return (
        <div className="container main-content">
            <section className="hero">
                <div className="hero-body">
                    <h1 className="title">Check-In</h1>
                </div>
            </section>
            <div className={`modal ${customerModal ? 'is-active' : ''}`}>
                <div className="modal-background"></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">Search Customer</p>
                        <button className="delete" aria-label="close" onClick={closeCustomerModal}></button>
                    </header>
                    <section className="modal-card-body">
                        <div className="container">{modalContent}</div>
                    </section>
                    <footer className="modal-card-foot"/>
                </div>
            </div>
            <div className="container">
                <form>
                    <div className="field">
                        <label className="label">Customer</label>
                        <p>Customer: {customerId}</p>
                        <div className="buttons">
                            <button className="button" name="search-customer" onClick={openCustomerModal}>Search Customer</button>
                            <button className="button" name="add-customer">Add Customer</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

const CheckIn = ({ userCookie }) => {
    const content = <CheckInLayout cookie={userCookie} />

    return (
        <AdminLayout content={content} cookie={userCookie} menu="check-in" />
    )
}

export default CheckIn

export const getServerSideProps = async (ctx) => {
    return await userValidation(ctx)
}