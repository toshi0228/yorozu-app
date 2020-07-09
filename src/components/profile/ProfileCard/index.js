import React from 'react'
import { Card, Avatar } from 'antd'
import { Link } from 'react-router-dom'
import host from '../../../constants/url'
import routes from '../../../routes'

// ============================================================
// プランリストのカード部分
// ============================================================

const ProfileCard = ({ data }) => {
  return (
    <>
      <Link to={`${routes.profileDetail(data.yorozuId)}`}>
        <Card cover={<img alt="example" src={`${host.localhost()}${data.yorozuyaThumbnailImage}`} style={{ height: 200 }} />} hoverable>
          <Card.Meta
            avatar={<Avatar src={`${host.localhost()}${data.profileImage}`} />}
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
