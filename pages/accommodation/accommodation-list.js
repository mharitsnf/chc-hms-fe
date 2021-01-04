import "bulma/css/bulma.css"
import AdminLayout from "../../components/admin-layout";
import { Grid, _ } from "gridjs-react";
import { html } from "gridjs";
import "gridjs/dist/theme/mermaid.css";
import { Component } from "react";
import Router from "next/router";

class AccommodationListLayout extends Component {

    render() {
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
                            headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
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
}

const AccommodationList = () => {

    const content = <AccommodationListLayout />

    return (
        <AdminLayout content={content} menu="accommodation-list" />
    )
}

export default AccommodationList