

export default function Message({ message, user }) {
    return (
        <div style={{
            width: "350px",
            backgroundColor: user === message.user ? '#5A96E3' : "#E1AEFF",
            alignSelf: user === message.user ? 'end' : "start",
            margin: "15px 0",
            padding: "12px 20px ",
            borderRadius: "8px"
        }}>
            <h3 style={{
                padding: "0",
                margin: "0"
            }}>{message.user}</h3>
            <p style={{
                padding: "0",
                margin: "0"
            }}>{message.message}</p></div>
    )
}
