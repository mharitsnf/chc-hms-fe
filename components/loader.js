import Image from "next/image";

const Loader = (props) => {
    return (
        <section className="hero is-fullheight">
            <div className="hero-body is-justify-content-center">
                <Image src="/loader.gif" width="128" height="128" />
            </div>
        </section>
    )
}

export default Loader