import { Component } from "react";
import AdminLayout from "../../components/admin-layout";
import Loader from "../../components/loader"
import Router from "next/router";
import "bulma/css/bulma.css"
import "bulma-extensions/bulma-pageloader/dist/css/bulma-pageloader.min.css"

class AccommodationHistoryLayout extends Component {
    render() {
        return(
            <div className="container main-content">
                <div className="columns">
                    <div className="column">
                        <h1>Hello</h1>
                    </div>
                    <div className="column">
                        <h1>This is my accommodation history page</h1>
                    </div>
                </div>
            </div>
        )
    }
}

const AccommodationHistory = () => {

    const content = <AccommodationHistoryLayout/>

    return (
        <AdminLayout content={content} menu="accommodation-history"/>
    )
}

export default AccommodationHistory