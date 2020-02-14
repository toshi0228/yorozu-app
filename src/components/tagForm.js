import React from 'react'
import '../styles/tagForm.scss'


const TagForm = ()=> {
    
    return(
        <div className="tag-form" >
            <label className='tag-label' htmlFor='tag'>タグ</label>
            <input id='tag' type="text"/>
        </div>
    )
}

export default TagForm