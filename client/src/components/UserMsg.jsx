import { useDispatch } from 'react-redux'
import { updateUserMsg } from '../store/actions/systemActions'

const UserMsg = ({ msg }) => {
    const dispatch = useDispatch()

    const closeModal = () => {
        dispatch(updateUserMsg({ txt: '', type: '' }))
    }

    return (
        <div className={`user-msg-modal ${msg.type}`}>
            <button onClick={closeModal}>x</button>
            <p>{msg.txt}</p>
        </div >
    )

}

export default UserMsg