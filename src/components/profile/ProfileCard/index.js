import React from 'react'
import { Card, Avatar } from 'antd'
import { Link } from 'react-router-dom'

import routes from '../../../routes'
import styles from './index.module.scss'

// ============================================================
// プランリストのカード部分 PC部分
// ============================================================

const ProfileCard = ({ data }) => {
  return (
    <>
      <Link to={`${routes.profileDetail(data.yorozuId)}`}>
        <Card cover={<img alt="example" src={data.yorozuyaThumbnailImage} className={styles.card} />} hoverable>
          <Card.Meta
            avatar={<Avatar src={data.profileImage} />}
            title={data.yorozuyaName}
            description={data.profileDescription}
            style={{ height: 100, overflow: 'hidden' }}
          />
        </Card>
      </Link>
    </>
  )
}

export default ProfileCard

// リンクを作るとエラーになる
// <Link to="/"> */}
// <Icon type="twitter" />
// </Link>
