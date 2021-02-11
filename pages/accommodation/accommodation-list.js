import "bulma/css/bulma.css"
import AdminLayout from "../../components/admin-layout";
import { Grid, _ } from "gridjs-react";
import "gridjs/dist/theme/mermaid.css";
import { useEffect } from "react";
import Router from "next/router";
import { userValidation } from "../../globals/page-functions"

const AccommodationListLayout = ({ cookie }) => {
    
    return (
        <div className="container main-content">
            {/* Content */}
            <section className="hero">
                <div className="hero-body">
                    <h1 className="title">Accommodation List</h1>
                </div>
            </section>
            <div className="container">
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
                                    Router.push(`/accommodation/${row.cells[5].data}`)
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
        </div>
    )
}

const AccommodationList = ({ userCookie }) => {

    const content = <AccommodationListLayout cookie={userCookie} />

    return (
        <AdminLayout content={content} cookie={userCookie} menu="accommodation-list" />
    )
}

export default AccommodationList

export const getServerSideProps = async (ctx) => {
    return await userValidation(ctx)
}