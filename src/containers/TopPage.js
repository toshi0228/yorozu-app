import React from 'react'
import Header from './Header'
import Footer from './Footer'
import PlanList from './PlanList'

const TopePage = () =>{
    return(
        <div>
            <Header/>
            <PlanList />
            <Footer/>
        </div>
    )
}

export default TopePage