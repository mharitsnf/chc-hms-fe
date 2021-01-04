import axios from "axios";
import "bulma/css/bulma.css"
import Router from "next/router";
import { useState } from "react";

const LoginForm = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (event) => {
        try {
            event.preventDefault()
            const loginRes = await axios.post(
                `${process.env.NEXT_PUBLIC_BE_URL}/auth/token`,
                {
                    username: username,
                    password: password
                }
            )
            localStorage.setItem('token', loginRes.data.data.token)
            Router.push('/')
        } catch (error) {
            
        }
    }

    return (
        <div className="box">
            <div className="container is-fluid">
                <div className="block">
                    <p className="is-size-3 has-text-centered">{process.env.NEXT_PUBLIC_HELLO}</p>
                </div>
                <div className="columns is-centered">
                    <div className="column">
                        <form onSubmit={handleSubmit}>
                            <div className="field">
                                <label className="label">Username</label>
                                <div className="control">
                                    <input required className="input" type="text" placeholder="Username" value={username} onChange={ (event) => setUsername(event.target.value) }/>
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Password</label>
                                <div className="control">
                                    <input required className="input" type="password" placeholder="Text input" value={password} onChange={ (event) => setPassword(event.target.value) }/>
                                </div>
                            </div>
                            <div className="field">
                                <div className="control has-text-centered">
                                    <button className="button is-primary" type="submit">Sign In</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="block">
                    <Copyright/>
                </div>
            </div>
        </div>
    )
}

const Copyright = () => {
    return <p className="has-text-centered has-text-weight-light is-size-7">Copyright Camp Hulu Cai</p>
}

const Login = () => {
    return (
        <section className="hero is-fullheight">
            <div className="hero-body has-background-light is-justify-content-center">
                <LoginForm/>
            </div>
        </section>
    )
}

export default Login