
export const Notification = ({ data, isHidden, setIsHidden }) => {
    return (
        <div className={`notification ${data.type} ${isHidden ? 'is-hidden' : ''}`}>
            <button className="delete" onClick={event => setIsHidden(true)}></button>
            {data, content}
        </div>
    )
}