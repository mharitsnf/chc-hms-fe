import ReactDOM from "react-dom";
import { useRef } from "react";

export const Notification = (props) => {

    const component = useRef(null)

    const handleDelete = () => {
        ReactDOM.unmountComponentAtNode(component.current)
    }

    return (
        <div className="notification" ref={component}>
            <button className="delete" onClick={handleDelete}></button>
            {props.children}
        </div>
    )
}