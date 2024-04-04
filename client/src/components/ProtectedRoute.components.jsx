import { useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'

const ProtectedRoute = () => {
    const userInfo = useSelector(state => state.user)
    const authorized = Boolean(userInfo)
    return(
        authorized ? <Outlet/> : <Navigate to="/"/>
    )
}

export default ProtectedRoute