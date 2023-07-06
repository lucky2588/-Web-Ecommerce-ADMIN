import React from 'react'
import { Outlet } from 'react-router'
import Header from '../header/Header'

import SideBar from '../sideBar/SideBar'




function Layout() {
    return (
        <>
      

   
            <Header />
           
            <SideBar />
            <Outlet />
           
        </>
    )
}

export default Layout