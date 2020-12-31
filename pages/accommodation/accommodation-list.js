import "bulma/css/bulma.css"
import AdminLayout from "../../components/admin-layout";

const AccommodationListLayout = () => {
    return (
        <div className="container main-content">
            <div className="columns">
                <div className="column">
                    <h1>Hello</h1>
                </div>
                <div className="column">
                    <h1>This is my accommodation list page</h1>
                </div>
            </div>
        </div>
    )
}

const AccommodationList = () => {

    const content = <AccommodationListLayout/>

    return (
        <AdminLayout content={content} menu="accommodation-list"/>
    )
}

export default AccommodationList