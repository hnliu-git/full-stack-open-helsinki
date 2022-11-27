
const Notificaiton = ({ message, style }) => {
    if (message === null) {
        return null
    }

    return (
        <div className="msg" style={style}>
            {message}
        </div>
    )
}

export default Notificaiton