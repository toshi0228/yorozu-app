import React from 'react'
import { Card, Icon, Avatar } from 'antd'
import { Link } from 'react-router-dom'
import host from '../../../constants/url'
import routes from '../../../routes'
import { SmileTwoTone, FrownOutlined } from '@ant-design/icons'
// import styles from './index.module.scss';

// ============================================================
// プランリストのカード部分
// ============================================================

const ProfileCard = ({ data }) => {
  return (
    <>
      <Link to={`${routes.profileDetail(data.yorozuId)}`}>
        <Card
          cover={<img alt="example" src={`${host.localhost()}${data.planThumbnailImage}`} style={{ height: 200 }} />}
          hoverable
          // actions={[<Icon type="twitter" />, <Icon type="instagram" />, <Icon type="facebook" />]}
        >
          <Card.Meta
            avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
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
