import { useState } from 'react'
import { socket } from '../socket'
import axios from 'axios'
type pageStatus = 'register' | 'login'
export default function Login({ setUser }) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [pageState, setPageState] = useState<pageStatus>('login')
    //const { setUser } = useContext(UserContext)
    async function handleSubmit(e) {
        e.preventDefault()
        const res = await axios.post('/users/' + pageState, { username, password })
        console.log(res)
        setUser(res.data)

    }
    return (
        <div className=" row justify-content-center mt-5 mx-0 ">
            <h1 className='text-center'>{pageState === 'register' ? 'Register' : 'Login'}</h1>
            <form onSubmit={handleSubmit} className='col-6 col-lg-4 '>
                <div className="mb-1">
                    <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                    <input type="text" value={username} onChange={e => { setUsername(e.target.value) }} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">Enter Your Name</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Password</label>
                    <input type="password" value={password} onChange={e => { setPassword(e.target.value) }} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">Enter Your Password</div>
                </div>

                <p className='text-muted mb-3'>Already have account? <span onClick={() => {
                    if (pageState === 'register') { setPageState("login") }
                    if (pageState === 'login') { setPageState("register") }
                }} style={{ cursor: "pointer" }} className='fw-bold text-decoration-underline cursor-pointer '>{pageState === 'register' ? "Sign In" : "Register"}</span></p>
                <button type="submit" className="btn btn-success">Submit</button>
            </form>
        </div >

    )
}
