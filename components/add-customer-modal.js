import { useEffect, useState } from "react";
import CreatableSelect from "react-select/creatable"
import axios from "axios"

const EditCustomerModal = ({ cookie, customerId, setCustomerId }) => {
    const [disabled, setDisabled] = useState(true)
    const [hobbies, setHobbies] = useState([])
    const [hobby, setHobby] = useState('')
    const [customerData, setCustomerData] = useState(null)

    const createOption = (label) => ({
        label,
        value: label
    })

    const handleKeyDown = (event) => {
        if (!hobby) return
        switch (event.key) {
            case 'Enter':
            case 'Tab':
                setHobbies([...hobbies, createOption(hobby)])
                setHobby('')
                event.preventDefault()
        }
    }

    const handleChange = (value) => {
        setHobbies(value)
    }

    useEffect(async () => {
        try {
            if (customerId != '') {
                let searchRes = await axios.get(
                    `${process.env.NEXT_PUBLIC_BE_URL}/customers/${customerId}`,
                    {
                        headers: {
                            authorization: `Bearer ${cookie.token}`
                        }
                    }
                )

                setHobbies(searchRes.data.data.picData.picHobbies.map((hobby) => {
                    return createOption(hobby)
                }))
                setCustomerData(searchRes.data.data)

            } else {
                setHobbies([])
                setCustomerData(null)
            }
        } catch (error) {
            console.log(error)
        }
    }, [customerId])

    return (
        <div className={`modal ${customerId != '' ? 'is-active' : ''}`}>
            <div className="modal-background"></div>
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">Customer Details</p>
                    <button className="delete" aria-label="close"
                        onClick={(event) => {
                            event.preventDefault()
                            setCustomerId('')
                        }}
                    />
                </header>
                <section className="modal-card-body">
                    <div className="container">
                        <fieldset disabled={disabled}>
                            {/* Customer Type */}
                            <div className="field">
                                <label className="label">Customer Type</label>
                                <div className="control">
                                    <div className="select">
                                        <select
                                            onChange={(event) => {
                                                if (customerData) {
                                                    customerData.customerType = event.target.value
                                                }
                                            }}
                                            value={customerData ? customerData.customerType : ""}
                                        >
                                            <option value="" />
                                            <option value="FIT">FIT</option>
                                            <option value="Group">Group</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Customer Name */}
                            <div className="field">
                                <label className="label">Name</label>
                                <div className="control">
                                    <input
                                        className="input" type="text"
                                        placeholder="Full name"
                                        value={customerData ? customerData.picData.picName : ""}
                                        onChange={(event) => {
                                            if (customerData) {
                                                customerData.picData.picName = event.target.value
                                            }
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Phone */}
                            <div className="field">
                                <label className="label">Phone No.</label>
                                <div className="control">
                                    <input
                                        className="input" type="text"
                                        placeholder="Full name"
                                        value={customerData ? customerData.picData.picTelp : ""}
                                        onChange={(event) => {
                                            if (customerData) {
                                                customerData.picData.picTelp = event.target.value
                                            }
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div className="field">
                                <label className="label">Email</label>
                                <div className="control">
                                    <input
                                        className="input" type="text"
                                        placeholder="Full name"
                                        value={customerData ? customerData.picData.picEmail : ""}
                                        onChange={(event) => {
                                            if (customerData) {
                                                customerData.picData.picEmail = event.target.value
                                            }
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Address */}
                            <div className="field">
                                <label className="label">Address</label>
                                <div className="control">
                                    <input
                                        className="input" type="text"
                                        placeholder="Full name"
                                        value={customerData ? customerData.picData.picAddress : ""}
                                        onChange={(event) => {
                                            if (customerData) {
                                                customerData.picData.picAddress = event.target.value
                                            }
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Hobbies list */}
                            <div className="field">
                                <label className="label">Hobbies</label>
                                <div className="control">
                                    <CreatableSelect
                                        isDisabled={disabled}
                                        isClearable
                                        isMulti
                                        components={{ DropdownIndicator: null }}
                                        inputValue={hobby}
                                        onInputChange={(value) => setHobby(value)}
                                        onKeyDown={handleKeyDown}
                                        onChange={handleChange}
                                        menuIsOpen={false}
                                        value={hobbies}
                                        placeholder="Write hobby..."
                                    />
                                </div>
                            </div>
                        </fieldset>
                    </div>
                </section>
                <footer className="modal-card-foot" />
            </div>
        </div>
    )
}

export default EditCustomerModal