import React, {useState, useEffect} from 'react'
import axios  from "axios"



function Data(){
    const [user, setUser] = useState([])
    const [loading, setLoading] = useState(true)

    // 非同期でデータを取得する
    const data = () =>{
        const url = 'http://localhost:8080/'

        axios.get(url).then(res =>{
            const user =res.data
            setUser(user)
            setLoading(false)
        })
    }

    useEffect(()=>{
        data()
    },[])

    return(
        <div>
            <h1>{loading}</h1>
            <ul>
            {
                user.map(account =>{
                    return (
                    <li key={account.id}>
                        {account.id}:{account.email}:{account.username}
                    </li>)
                })
            }
            </ul>
        </div>
    )
}

export default Data