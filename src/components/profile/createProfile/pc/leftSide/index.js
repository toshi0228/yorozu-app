import React from 'react'
import { Row, Col } from 'antd'

import host from '../../../../../constants/url'
import styles from './index.module.scss'

// ======================================================================
// createProfilePageの左側 プロフィールで登録した画像を見れる
// ======================================================================

// createProfilePageから、registeredProfileが渡ってくる
export const LeftSide = ({ registeredProfile }) => {
  // ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
  // よろずやの名前 data.profileDetail.yorozuyaNameがundifindなら、初期値をリセットする
  // ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
  const toggleYorozuyaName = () => {
    if (registeredProfile.yorozuyaName) {
      return <h3 className={styles.name}>{registeredProfile.yorozuyaName}</h3>
    } else {
      return <h3 className={styles.name}>○ ○ ○屋</h3>
    }
  }

  // ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
  // プロフィール画像 props.registeredProfile.profileImageが
  // undifinなら初期値をセットする
  // ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
  const toggleProfileImage = () => {
    if (registeredProfile.profileImage) {
      return <img style={{ height: 150, width: 150, borderRadius: '50%' }} src={registeredProfile.profileImage} />
    } else {
      return (
        <div className={styles.profileNoImage}>
          <div style={{ fontSize: 16 }}>No Image</div>
        </div>
      )
    }
  }
  // ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
  // よろずやのサムネール画像 props.registeredProfile.yorozuyaThumbnailImageが
  // undifinなら、初期値をリセットする
  // ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
  const toggleThumbnailImage = () => {
    if (registeredProfile.yorozuyaThumbnailImage) {
      return <img style={{ height: 208, width: '100%' }} src={registeredProfile.yorozuyaThumbnailImage} />
    } else {
      //   return <img style={{ height: 208, width: '100%' }} src="https://toyoake-seinenbu.com/wp/wp-content/uploads/2018/11/sample_img.gif" />
      return (
        <div className={styles.thumbnailNoImage}>
          <div style={{ fontSize: 16 }}>No Image</div>
        </div>
      )
    }
  }

  return (
    <>
      {/* よろずやの名前 */}
      {toggleYorozuyaName()}

      {/* プロフィール画像 */}
      <Row type="flex" justify="center" style={{ marginTop: 64 }}>
        <p style={{ marginTop: 8 }}>※現在使われているプロフィール画像</p>
        <Col>{toggleProfileImage()}</Col>
      </Row>

      {/* サムネール画像 */}
      <Row type="flex" justify="center" style={{ marginTop: 64 }}>
        <p style={{ marginTop: 8 }}>※現在使われているサムネール画像</p>
        <Col>{toggleThumbnailImage()}</Col>
      </Row>
    </>
  )
}

export default LeftSide
