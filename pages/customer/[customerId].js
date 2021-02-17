import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { Grid, _ } from "gridjs-react";
import "gridjs/dist/theme/mermaid.css";
import CreatableSelect from "react-select/creatable"
import { userValidation } from "../../globals/page-functions";
import AdminLayout from "../../components/admin-layout";
import { Notification } from "../../components/notification"

const CustomerLayout = ({ cookie }) => {
    const [isEdit, setIsEdit] = useState(false)

    const [customerData, setCustomerData] = useState({})

    const [customerType, setCustomerType] = useState('FIT')
    const [picName, setPicName] = useState('')
    const [picTelp, setPicTelp] = useState('')
    const [picEmail, setPicEmail] = useState('')
    const [picAddress, setPicAddress] = useState('')
    const [hobby, setHobby] = useState('')
    const [hobbies, setHobbies] = useState([])

    const [companyName, setCompanyName] = useState('')
    const [companyTelp, setCompanyTelp] = useState('')
    const [companyEmail, setCompanyEmail] = useState('')
    const [companyAddress, setCompanyAddress] = useState('')

    const [isModalHidden, setIsModalHidden] = useState(true)

    const [isUpdateLoading, setIsUpdateLoading] = useState(false)

    const router = useRouter()
    const { customerId } = router.query

    const Aux = (props) => {
        return props.children
    }

    const resetState = data => {
        setCustomerType(data.customerType)
        setPicName(data.picData.picName)
        setPicTelp(data.picData.picTelp)
        setPicEmail(data.picData.picEmail)
        setPicAddress(data.picData.picAddress)
        setHobbies(data.picData.picHobbies.map((hobby) => {
            return createOption(hobby)
        }))

        if (data.customerType == 'Group') {
            setCompanyName(data.companyData.companyName)
            setCompanyTelp(data.companyData.companyTelp)
            setCompanyEmail(data.companyData.companyEmail)
            setCompanyAddress(data.companyData.companyAddress)
        }
    }

    useEffect(async () => {
        try {
            const getCustomerRes = await axios.get(
                `${process.env.NEXT_PUBLIC_BE_URL}/customers/${customerId}`,
                {
                    headers: { authorization: `Bearer ${cookie.token}` }
                }
            )
            if (getCustomerRes.status == 400) {
                throw new Error('unauthorized')
            }

            const custData = getCustomerRes.data.data
            setCustomerData(custData)
            resetState(custData)

        } catch (error) {
            console.log(error)
        }
    }, [])

    const createOption = (label) => ({
        label,
        value: label
    })

    const handleEditButton = (event) => {
        event.preventDefault()

        const newVal = !isEdit
        if (!newVal) {
            resetState(customerData)
        }

        setIsEdit(newVal)
    }

    const handleSelectChange = (value) => {
        setHobbies(value)
    }

    const handleSelectKeyDown = (event) => {
        if (!hobby) return
        switch (event.key) {
            case 'Enter':
            case 'Tab':
                event.preventDefault()
                setHobby('')
                setHobbies([...hobbies, createOption(hobby)])
        }
    }

    // Send edited data to the server
    const handleSubmitEdit = async (event) => {
        try {
            event.preventDefault()
            setIsUpdateLoading(true)

            let data = {
                picData: {
                    picName: picName,
                    picTelp: picTelp,
                    picEmail: picEmail,
                    picAddress: picAddress,
                    picHobbies: hobbies.map(value => {
                        return value.label
                    })
                }
            }

            if (customerType == 'Group') {
                data['companyData'] = {
                    companyName: companyName,
                    companyTelp: companyTelp,
                    companyEmail: companyEmail,
                    companyAddress: companyAddress
                }
            }

            let updateResult = await axios.put(
                `${process.env.NEXT_PUBLIC_BE_URL}/customers/${customerId}`,
                data,
                {
                    headers: { authorization: `Bearer ${cookie.token}` }
                }
            )

            if (updateResult.status != 200) {
                throw new Error(updateResult.message)
            }

            alert('Update successful!')

            router.reload()

            setIsUpdateLoading(false)
        } catch (error) {
            alert(error)
            router.reload()
        }
    }

    const ConfirmationModal = () => {

        const GroupReview = () => {
            if (customerType == 'Group') {
                return (
                    <Aux>
                        <div className="field is-horizontal">
                            <div className="field-label">
                                <label className="label">Company Name</label>
                            </div>
                            <div className="field-body">
                                <div className="field">
                                    <p>{companyName}</p>
                                </div>
                            </div>
                        </div>
                        <div className="field is-horizontal">
                            <div className="field-label">
                                <label className="label">Company Telp. No.</label>
                            </div>
                            <div className="field-body">
                                <div className="field">
                                    <p>{companyTelp}</p>
                                </div>
                            </div>
                        </div>
                        <div className="field is-horizontal">
                            <div className="field-label">
                                <label className="label">Company Email</label>
                            </div>
                            <div className="field-body">
                                <div className="field">
                                    <p>{companyEmail}</p>
                                </div>
                            </div>
                        </div>
                        <div className="field is-horizontal">
                            <div className="field-label">
                                <label className="label">Company Address</label>
                            </div>
                            <div className="field-body">
                                <div className="field">
                                    <p>{companyAddress}</p>
                                </div>
                            </div>
                        </div>
                    </Aux>
                )
            }

            return null
        }

        const ModalFooter = () => {
            if (isUpdateLoading) {
                return <progress className="progress is-small is-primary" max="100%" />
            } else {
                return (
                    <Aux>
                        <button className="button is-success" onClick={handleSubmitEdit}>Save changes</button>
                        <button className="button" onClick={event => {
                            handleEditButton(event)
                            setIsModalHidden(true)
                        }}>Cancel</button>
                    </Aux>
                )
            }
        }

        return (
            <div className={`modal ${isModalHidden ? '' : 'is-active'}`}>
                <div className="modal-background"></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">Review</p>
                    </header>
                    <section className="modal-card-body">
                        <div className="field is-horizontal">
                            <div className="field-label">
                                <label className="label">Customer Type</label>
                            </div>
                            <div className="field-body">
                                <div className="field">
                                    <p>{customerType}</p>
                                </div>
                            </div>
                        </div>
                        <div className="field is-horizontal">
                            <div className="field-label">
                                <label className="label">Name</label>
                            </div>
                            <div className="field-body">
                                <div className="field">
                                    <p>{picName}</p>
                                </div>
                            </div>
                        </div>
                        <div className="field is-horizontal">
                            <div className="field-label">
                                <label className="label">Telp. No.</label>
                            </div>
                            <div className="field-body">
                                <div className="field">
                                    <p>{picTelp}</p>
                                </div>
                            </div>
                        </div>
                        <div className="field is-horizontal">
                            <div className="field-label">
                                <label className="label">Email</label>
                            </div>
                            <div className="field-body">
                                <div className="field">
                                    <p>{picEmail}</p>
                                </div>
                            </div>
                        </div>
                        <div className="field is-horizontal">
                            <div className="field-label">
                                <label className="label">Address</label>
                            </div>
                            <div className="field-body">
                                <div className="field">
                                    <p>{picAddress}</p>
                                </div>
                            </div>
                        </div>
                        <div className="field is-horizontal">
                            <div className="field-label">
                                <label className="label">Hobbies</label>
                            </div>
                            <div className="field-body">
                                <div className="field">
                                    <p>{hobbies.map(value => { return value.label }).toString()}</p>
                                </div>
                            </div>
                        </div>
                        <GroupReview />
                    </section>
                    <footer className="modal-card-foot">
                        <ModalFooter/>
                    </footer>
                </div>
            </div>
        )
    }

    const FormButtons = () => {
        if (isEdit) {
            return (
                <div className="buttons">
                    <button className="button is-primary"
                        onClick={event => {
                            event.preventDefault()
                            setIsModalHidden(false)
                        }}
                    >Save</button>
                    <button className="button" onClick={handleEditButton}>Cancel</button>
                </div>
            )
        } else {
            return (
                <div className="buttons">
                    <button className="button is-info is-light" onClick={handleEditButton}>Edit</button>
                </div>
            )
        }
    }

    const GroupDetailsAndForm = ({ customerType }) => {
        if (customerType == 'Group') {
            return (
                <div className="column">
                    <div className="field is-horizontal">
                        <div className={`field-label is-normal`}>
                            <label className="label">Company Name</label>
                        </div>
                        <div className="field-body">
                            <div className="field">
                                <input className={`input ${isEdit ? '' : 'is-static'}`} readOnly={!isEdit} value={companyName} onChange={event => setCompanyName(event.target.value)} />
                            </div>
                        </div>
                    </div>
                    <div className="field is-horizontal">
                        <div className={`field-label is-normal`}>
                            <label className="label">Company Telp. No.</label>
                        </div>
                        <div className="field-body">
                            <div className="field">
                                <input className={`input ${isEdit ? '' : 'is-static'}`} type="tel" readOnly={!isEdit} value={companyTelp} onChange={event => setCompanyTelp(event.target.value)} />
                            </div>
                        </div>
                    </div>
                    <div className="field is-horizontal">
                        <div className={`field-label is-normal`}>
                            <label className="label">Company Email</label>
                        </div>
                        <div className="field-body">
                            <div className="field">
                                <input className={`input ${isEdit ? '' : 'is-static'}`} readOnly={!isEdit} value={companyEmail} onChange={event => setCompanyAddress(event.target.value)} />
                            </div>
                        </div>
                    </div>
                    <div className="field is-horizontal">
                        <div className={`field-label is-normal`}>
                            <label className="label">Company Address</label>
                        </div>
                        <div className="field-body">
                            <div className="field">
                                <input className={`input ${isEdit ? '' : 'is-static'}`} readOnly={!isEdit} value={companyAddress} onChange={event => setCompanyAddress(event.target.value)} />
                            </div>
                        </div>
                    </div>
                </div>
            )
        }

        return null
    }

    return (

        <div className="container main-content">

            <section className="hero">
                <div className="hero-body">
                    <h1 className="title">Customer Data</h1>
                </div>
            </section>

            <ConfirmationModal />

            {/* Customer form */}
            <div className="container">
                <div className="columns">
                    <div className="column">
                        <div className="field is-horizontal">
                            <div className={`field-label`}>
                                <label className="label">Customer Type</label>
                            </div>
                            <div className="field-body">
                                <div className="field">
                                    <p>{customerType}</p>
                                </div>
                            </div>
                        </div>
                        <div className="field is-horizontal">
                            <div className={`field-label is-normal`}>
                                <label className="label">Name</label>
                            </div>
                            <div className="field-body">
                                <div className="field">
                                    <div className="control">
                                        <input className={`input ${isEdit ? '' : 'is-static'}`} readOnly={!isEdit} value={picName} onChange={event => setPicName(event.target.value)} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="field is-horizontal">
                            <div className={`field-label is-normal`}>
                                <label className="label">Telp. No.</label>
                            </div>
                            <div className="field-body">
                                <div className="field">
                                    <div className="control">
                                        <input className={`input ${isEdit ? '' : 'is-static'}`} type="tel" readOnly={!isEdit} value={picTelp} onChange={event => setPicTelp(event.target.value)} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="field is-horizontal">
                            <div className={`field-label is-normal`}>
                                <label className="label">Email</label>
                            </div>
                            <div className="field-body">
                                <div className="field">
                                    <div className="control">
                                        <input className={`input ${isEdit ? '' : 'is-static'}`} readOnly={!isEdit} value={picEmail} onChange={event => setPicEmail(event.target.value)} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="field is-horizontal">
                            <div className={`field-label is-normal`}>
                                <label className="label">Address</label>
                            </div>
                            <div className="field-body">
                                <div className="field">
                                    <div className="control">
                                        <input className={`input ${isEdit ? '' : 'is-static'}`} readOnly={!isEdit} value={picAddress} onChange={event => setPicAddress(event.target.value)} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="field is-horizontal">
                            <div className={`field-label is-normal`}>
                                <label className="label">Hobbies</label>
                            </div>
                            <div className="field-body">
                                <div className="field">
                                    <div className="control">
                                        <CreatableSelect
                                            components={{ DropdownIndicator: null }}
                                            isDisabled={!isEdit}
                                            isClearable
                                            isMulti
                                            inputValue={hobby}
                                            onInputChange={(value) => setHobby(value)}
                                            onKeyDown={handleSelectKeyDown}
                                            onChange={handleSelectChange}
                                            menuIsOpen={false}
                                            value={hobbies}
                                            placeholder="Write hobby..."
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <GroupDetailsAndForm customerType={customerType} />
                </div>
                <FormButtons />
            </div>

            {/* Customer history */}
            <section className="hero">
                <div className="hero-body">
                    <h1 className="title">Customer History</h1>
                </div>
            </section>
            <Grid
                server={{
                    url: `${process.env.NEXT_PUBLIC_BE_URL}/accommodations`,
                    headers: { authorization: `Bearer ${cookie.token}` },
                    then: data => data.data.map(accommodation => [
                        accommodation.name,
                        accommodation.location,
                        accommodation.defaultCapacity,
                        accommodation.maxCapacity,
                        accommodation.category.name,
                        accommodation._id
                    ])
                }}
                columns={[{
                    name: 'Nama',
                    formatter: cell => _(<a>{cell}</a>),
                    attributes: (cell, row, column) => {
                        return {
                            onClick: () => {
                                // Router.push(`/accommodation/${row.cells[5].data}`)
                            }
                        }
                    }
                }, 'Lokasi', 'Kapasitas Normal', 'Kapasitas Maksimal', 'Kategori', { name: 'id', hidden: true }]}
                search={true}
                pagination={{
                    enabled: true,
                    limit: 15,
                }}
            />
        </div>
    )
}

const Customer = ({ userCookie }) => {
    const content = <CustomerLayout cookie={userCookie} />

    return <AdminLayout content={content} cookie={userCookie} menu="customer-list" />
}

export default Customer

export const getServerSideProps = async (ctx) => {
    return await userValidation(ctx)
}