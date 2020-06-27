import React from 'react'
import { connect } from 'react-redux'
import { Input } from 'antd'

import { search } from '../../../store/actions/profile'

const SearchForm = (props) => {
  console.log(props)

  const search = (keyword) => {
    props.searchEvent({ keyword })
  }

  return (
    <>
      <Input.Search placeholder="検索" style={{ width: 480 }} onSearch={(keyword) => search(keyword)}></Input.Search>
    </>
  )
}

const mapDispatchToProps = (dispatch) => ({
  searchEvent: (keyword) => dispatch(search(keyword)),
})

export default connect(null, mapDispatchToProps)(SearchForm)
