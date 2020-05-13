import React from 'react'
import { Card, Icon, Avatar } from 'antd'
import { Link } from 'react-router-dom'
// import routes from '../../../routes'
// import styles from './index.module.scss';

// ============================================================
// プランリストのカード部分
// ============================================================

const ProfileCard = ({ data }) => {
  return (
    <>
      <Link to={`/plan/${data.yorozuId}`}>
        <Card
          cover={<img alt="example" src={data.yorozuMainImage} style={{ height: 200 }} />}
          hoverable
          actions={[<Icon type="twitter" />, <Icon type="instagram" />, <Icon type="facebook" />]}
        >
          <Card.Meta title={data.yorozuyaName} description={data.profileDescription} style={{ height: 100, overflow: 'hidden' }} />
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
