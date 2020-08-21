import React from 'react'
import { connect } from 'react-redux'
import { Input, Row, Col } from 'antd'

import { search } from '../../../store/actions/profile'
import styles from './index.module.scss'

const SearchForm = (props) => {
  const search = (keyword) => {
    props.searchEvent({ keyword })
  }

  return (
    <>
      <Row>
        <Col>
          <Input.Search placeholder="検索" className={styles.searchForm} onSearch={(keyword) => search(keyword)}></Input.Search>
        </Col>
      </Row>
    </>
  )
}

const mapDispatchToProps = (dispatch) => ({
  searchEvent: (keyword) => dispatch(search(keyword)),
})

export default connect(null, mapDispatchToProps)(SearchForm)
