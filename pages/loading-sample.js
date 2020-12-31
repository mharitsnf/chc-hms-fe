import { Component } from "react";
import Router from "next/router";
import "bulma-extensions/bulma-pageloader/dist/css/bulma-pageloader.min.css"


class LoadingSample extends Component {
    state = {
        isLoading: true
    }

    componentDidMount() {
        try {
            const token = localStorage.getItem('token')
            if (!token) throw new Error('Unauthorized')
            else this.setState({ isLoading: false })
        } catch (error) {
            Router.push('/login')
        }
    }

    render() {
        let isActive = this.state.isLoading ? 'is-active' : ''

        return (
            <div>
                <div className={`pageloader ${isActive}`}><span className="title">Pageloader</span></div>
                <h1>Heellllwoowow</h1>
            </div>
        )
    }
}

export default LoadingSample