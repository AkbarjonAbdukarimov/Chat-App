import { useState } from 'react'
import { socket } from '../socket'

export default function Login() {
    const [input, setInput] = useState('')
    //const { setUser } = useContext(UserContext)
    function handleSubmit(e) {
        e.preventDefault()

        socket.connect()
        socket.emit('new-user', { user: input })
        //setSocket(io('http://localhost:5000'))
    }
    return (
        <div className=" row justify-content-center mt-5 mx-0 ">
            <form onSubmit={handleSubmit} className='col-6 col-lg-4 '>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                    <input type="text" value={input} onChange={e => { setInput(e.target.value) }} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">Enter Your Name</div>
                </div>

                <button type="submit" className="btn btn-success">Submit</button>
            </form>
        </div>

    )
}
