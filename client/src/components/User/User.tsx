import { Avatar } from '@mui/material'
import IUser from '../../interfaces/IUser'
import "./User.css"
export default function User({ user }: { user: IUser | undefined }) {
    if (user) return (
        <div className='user-conteiner py-3 px-4 d-flex  align-items-center'  >
            <Avatar className='me-3' alt="Profile Picture" >{user.username[0].toUpperCase()}</Avatar>
            <h3 className='m-0 p-0'>{user.username}</h3>
        </div>
    )
    return;
}
