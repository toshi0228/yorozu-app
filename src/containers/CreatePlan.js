import React,{useState,useEffect, useReducer} from 'react'
import axios from 'axios'

import Header from './Header';
import Footer from './Footer';
import {rootReducer} from '../store'

import '../styles/CreatePlan.scss'
import TagForm from '../components/tagForm';

// import planReducer from '../store/reducers/planReducer'

const CreatePlan = () => {

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [image, setImage] = useState("")
    const [price, setPrice] = useState("")
    const [tag, setTag] = useState("")

    const [state, dispatch] = useReducer(rootReducer, {})

    const register = () =>{
        const planContent = {title, description, image, price, tag}
        axios.post('http://localhost:8080/create_plan', planContent)

        dispatch({ type:'CREATE_PLAN', planContent})
    }



    // const register  =  async() =>{

    //     let formData = {eventTitle, eventDescription}

    //     // ログイン成功処理
    //     try {
    //         const response = await axios.post('http://localhost:8080/hookForm', formData)
    //         let res = response.data
            
    //         dispatch({ type:'CREATE_PLAN', res})
    //         console.log('登録できました')

    //     // ログイン失敗処理
    //     } catch {
    //         console.log('登録できなかったです')
    //     }

    //     setEventTitle('')
    //     setEventDescription('')
    // }

    useEffect(()=>{
        console.log("@@@")
        console.log(state)
        console.log("@@@")
    }, [state])


    return(
        <div>
            <Header/>

            <div className="event-create-wrapper">

                <div>イベント作成ページ</div>

                <p className="input-area-description">プランタイトル</p>
                <textarea type='text' value={title} onChange={e => setTitle(e.target.value)}/>


                <p className="input-area-description">プラン内容</p>
                <textarea type='text' value={description} onChange={e => setDescription(e.target.value)}/>


                <p className="input-area-description">価格</p>
                <textarea type='text' value={price} onChange={e => setPrice(e.target.value)}/>


                <p className="input-area-description">タグ</p>
                <textarea type='text' value={tag} onChange={e => setTag(e.target.value)}/>


                <p className="input-area-description">画像</p>
                {/* <input type='file'/> */}
                <textarea type='text' value={image} onChange={e => setImage(e.target.value)}/>

                <div className="register-btn" onClick={register}>登録</div>

    
                <ul className="tag-wrapper">
                    <li className="tag1"><TagForm/></li>
                    <li className="tag2"><TagForm/></li>
                    <li className="tag3"><TagForm/></li>
                </ul>

            </div> {/* --->event-create-wrapper */}


            <Footer/>
        </div>
    )
}



export default CreatePlan