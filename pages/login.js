import "bulma/css/bulma.css"
import { useState } from "react";

const LoginForm = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = (event) => {
        event.preventDefault()

        alert(`${username} ${password}`)
    }

    return (
        <div className="box">
            <div className="container is-fluid">
                <div className="block">
                    <p className="is-size-3 has-text-centered">Welcome</p>
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