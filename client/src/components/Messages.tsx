import Message from "./Message";



export default function Messages({ messages, user }) {


    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: 'center',
            width: "100%",

        }}>
            {messages.map(m => <Message user={user} message={m} key={m.user + m.message}></Message>)}
        </div>
    )
}
