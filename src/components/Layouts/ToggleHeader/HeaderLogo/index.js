import React from 'react'
import { connect } from 'react-redux'

import { Link } from 'react-router-dom'
import routes from '../../../../routes'

import { resetProfileList } from '../../../../store/actions/profile'
import styles from './index.module.scss'

const HeaderLogo = ({ resetProfileListEvent }) => {
  return (
    <>
      <Link to={routes.top()}>
        <h2
          className={styles.logoArea}
          onClick={() => {
            resetProfileListEvent()
          }}
        >
          Yorozuuuu
        </h2>
      </Link>
    </>
  )
}

const mapDispatchToProps = (dispatch) => ({
  // ロゴを押したときに、profileListの読み込みをリセットする islLoadingをfalseにする
  resetProfileListEvent: () => dispatch(resetProfileList()),
})

export default connect(null, mapDispatchToProps)(HeaderLogo)
