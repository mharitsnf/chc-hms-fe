
const Loader = (props) => {
    return <div className={`pageloader ${props.isActive? 'is-active' : ''}`}><span className="title">Pageloader</span></div>
}

export default Loader