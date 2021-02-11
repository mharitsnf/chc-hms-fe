import axios from "axios";
import "bulma/css/bulma.css"
import Router from "next/router";
import { useState } from "react";
import { useCookies } from "react-cookie";
import Cookie from "cookie"

const LoginForm = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [cookie, setCookie] = useCookies(['user'])

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
            const verifyRes = await axios.post(
                `${process.env.NEXT_PUBLIC_BE_URL}/auth/verify`,
                {
                    token: loginRes.data.data.token
                }
            )

            setCookie('user', JSON.stringify({
                token: loginRes.data.data.token,
                fullname: verifyRes.data.data.fullname,
                _id: verifyRes.data.data._id
            }), {
                path: '/',
                maxAge: 86400,
                sameSite: true
            })

            Router.push('/')
        } catch (error) {
            alert(error)
        }
    }

    const Copyright = () => {
        return <p className="has-text-centered has-text-weight-light is-size-7">Copyright Camp Hulu Cai</p>
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

export const getServerSideProps = async (ctx) => {
    try {
        const cookie = Cookie.parse(ctx.req.headers.cookie)
        if (cookie.user != undefined) {
            throw new Error('User has logged in')
        } else {
            return { props: { } }
        }
    } catch (error) {
        ctx.res.writeHead(302, { Location: '/' })
        ctx.res.end()
        return { props: { } }
    }
}