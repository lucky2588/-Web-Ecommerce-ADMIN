import React from 'react'
import { useDispatch, useSelector } from "react-redux"
import Forbiden from "./Forbiden";
import { Outlet } from "react-router-dom";
import { logout } from '../../app/slice/authSlice';
import { toast } from 'react-toastify';



function AuthorizeRoutes({ requireRoles }) {
    const dispatch = useDispatch();

    const { auth } = useSelector((state) => state.auth);

    const roles = auth.roles.map(role => role.name);
     // chỉ cần chứa 1 cái trong danh sách role thì trả về true
    const canAccess = requireRoles.some(role => roles.includes(role));


    if (!canAccess) {
        toast.error("You do not have permission to access this site")
        dispatch(logout())
        return <Forbiden />
    }

    return (
        <>
             {/* nếu đúng thì trả về các phần tử con trong nó  */}
            <Outlet />
        </>
    )


}

export default AuthorizeRoutes;