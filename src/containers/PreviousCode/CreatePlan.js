import React, { useState, useEffect, useReducer } from 'react';
import axios from 'axios';
import { createRootReducer } from '../../store';
import '../../styles/CreatePlan.scss';
import TagForm from '../../components/tagForm/index';

// import AppContext from '../contexts/AppContext';

// import planReducer from '../store/reducers/planReducer'

const CreatePlan = props => {
  console.log(props);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState('');
  const [tag, setTag] = useState('');
  const [tag1, setTag1] = useState('');
  const [tag2, setTag2] = useState('');
  const [tag3, setTag3] = useState('');
  const [tag4, setTag4] = useState('');
  const [tag5, setTag5] = useState('');
  const [tag6, setTag6] = useState('');

  // const value = useContext(AppContext);

  const [state, dispatch] = useReducer(createRootReducer, {});

  const register = () => {
    const tags = { tag1, tag2, tag3, tag4, tag5, tag6 };
    const planContent = {
      title,
      description,
      image,
      price,
      tags
    };
    axios.post('http://localhost:8080/create_plan', planContent);

    dispatch({ type: 'CREATE_PLAN', planContent });
  };

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

  useEffect(() => {
    console.log('createplanコンテナが呼び誰た');
  }, [state]);

  return (
    <div>
      <div className="event-create-wrapper">
        <div>イベント作成ページ</div>

        <p className="input-area-description">プランタイトル</p>
        <textarea
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />

        <p className="input-area-description">プラン内容</p>
        <textarea
          type="text"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />

        <p className="input-area-description">価格</p>
        <textarea
          type="text"
          value={price}
          onChange={e => setPrice(e.target.value)}
        />

        <p className="input-area-description">タグ</p>
        <textarea
          type="text"
          value={tag}
          onChange={e => setTag(e.target.value)}
        />

        <div className="tag-wrapper">
          <TagForm
            className="tag1 tag-form"
            label="タグ１"
            tag={tag1}
            setTag={setTag1}
          />
          <TagForm
            className="tag2 tag-form"
            label="タグ2"
            tag={tag2}
            setTag={setTag2}
          />
          <TagForm
            className="tag3 tag-form"
            label="タグ3"
            tag={tag3}
            setTag={setTag3}
          />
        </div>

        <div className="tag-wrapper">
          <TagForm
            className="tag1 tag-form"
            label="タグ4"
            tag={tag4}
            setTag={setTag4}
          />
          <TagForm
            className="tag2 tag-form"
            label="タグ5"
            tag={tag5}
            setTag={setTag5}
          />
          <TagForm
            className="tag3 tag-form"
            label="タグ6"
            tag={tag6}
            setTag={setTag6}
          />
        </div>

        <p className="input-area-description">画像</p>
        {/* <input type='file'/> */}
        <textarea
          type="text"
          value={image}
          onChange={e => setImage(e.target.value)}
        />

        {/* <div>aaa{value}aaa</div> */}

        <div className="register-btn" onClick={register}>
          登録
        </div>
      </div>
    </div>
  );
};

export default CreatePlan;
