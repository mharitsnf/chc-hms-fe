import Cookie from "cookie"
import axios from "axios"

export const userValidation = async (ctx) => {
    try {
        const cookie = Cookie.parse(ctx.req.headers.cookie)
        const user = JSON.parse(cookie.user)

        const verifyRes = await axios.post(
            `${process.env.NEXT_PUBLIC_BE_URL}/auth/verify`,
            {
                token: user.token
            }
        )
        
        if (verifyRes.status != 200) {
            throw new Error('Not verified!')
        }

        return { props: { userCookie: user } }
    } catch (error) {
        ctx.res.writeHead(302, { Location: '/login' })
        ctx.res.end()
        return { props: {} }
    }
}