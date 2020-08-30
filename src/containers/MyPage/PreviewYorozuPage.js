import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Row, Col, Empty } from 'antd'

import LeftSide from '../../components/profile/detailProfile/LeftSide'
import RightSide from '../../components/profile/detailProfile/RightSide'

import { feachProfileDetail } from '../../store/actions/profile'
import { fetchYorozuId } from '../../store/actions/account'
import { fetchReviewScore } from '../../store/actions/review'

// ======================================================================
// 自身のプラン preview
// ======================================================================

const PreviewYorozuPage = (props) => {
  // よろずIDを取得する (※プロフィールを登録した後に、リロードした時に、エラーになるので)
  useEffect(() => {
    props.readYorozuIdEvent(props.authToken)
  }, [])

  // プロフィールを取得する
  useEffect(() => {
    if (props.yorozuId) {
      props.readProfileDetailEvent(props.yorozuId)
      props.readReviewScoreEvent(props.yorozuId)
    }
  }, [])

  // ==============================================================================
  // まだ,プロフィールを登録していなくて、yorozuIdをもっていなければ、データはないと表示される
  // ==============================================================================
  const togglePreviewPage = () => {
    if (props.yorozuId) {
      return (
        <Row type="flex" justify="center" style={{ paddingTop: 32 }}>
          {/* 右サイド プラン一覧  pcの時,割合12/24*/}
          <Col xs={24} md={16} lg={16}>
            <LeftSide data={props.profile} />
          </Col>

          {/* 左と左の空白 これがあることでレしポンスデザインとの時に役立つ */}
          <Col xs={0} md={1}></Col>

          {/* 右サイドバー pcの時,割合5/24 */}
          <Col xs={24} md={7} lg={7}>
            <RightSide data={props.profile} />
          </Col>
        </Row>
      )
    } else {
      return (
        <>
          <Row style={{ marginTop: 32 }}>
            <Col>
              <h3 style={{ color: '#DB6E60' }}>
                まだ、表示できるデータがございません
                <br />
                プロフィールとプランを作成しましょう!
              </h3>
            </Col>
          </Row>
          <Row style={{ minHeight: 280 }}>
            <Col>
              <Empty
                imageStyle={{
                  height: 240,
                }}
              />
            </Col>
          </Row>
        </>
      )
    }
  }

  return <>{togglePreviewPage()}</>
}

const mapStateToProps = (state) => ({
  profile: state.profile,
  authToken: state.account.authToken.access,
  yorozuId: state.account.yorozuId,
})

const mapDispatchToProps = (dispatch) => ({
  // 万屋の詳細ページを取得する(プランや、よろずやユーザーの情報等)
  readProfileDetailEvent: (id) => dispatch(feachProfileDetail(id)),

  // よろずIDを取得する
  readYorozuIdEvent: (authToken) => dispatch(fetchYorozuId(authToken)),

  // 万屋のreviewScoreを取得する
  readReviewScoreEvent: (yorozuId) => dispatch(fetchReviewScore(yorozuId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(PreviewYorozuPage)

// =====================================================================================
// 2020/4/28
// connectは特定のComponentに対して、Reactのcontextで保持しているStoreを提供する役割を担っている。
// ※providerで、Storeのデータを渡しているからできること
// connextの第一引数は、Storeから必要なStateを取り出し、その値をreturnすれば勝手に
// Componentのpropsに値を渡してくれる。
// これで、不要なStateをコンポーネントに渡さないですむ。
// connectの第二引数には、Storeのdispatchメソッドが渡ってくるので、それをpropsに渡す
// =====================================================================================

// =====================================================================================
// 2020/4/28
// connect()()に関して
// connect()を実行したら、wrapWithConnectという関数を返す。のでそれを実行するためにもう一度関数を
// 実行するので()()
// let wrapWithConnect = connect(); => storeから、stateとdispatchの値を持った関数
// App = wrapWithConnect(PlanDetailPage);
// =====================================================================================

// =====================================================================================

// =====================================================================================
// dispatchは、storeに向かって発射される
// storeは、stateとreduerを持っているもの
// dispatchしたら、storeに向かう。そして、storeのreducerに渡る
// reducerで受け取る際は,dispatchの値を引数名をactionとして受け取る storeがよしなにやっているのだろう
// =====================================================================================

// =====================================================================================
// dispatchは、Storeに生えているメソッドのため、reactコンポーネントからActionとdispatchさせるため
// にはStoreが必要。
// =====================================================================================

// =====================================================================================
// connectは、特定のComponentに対して、reactのcontextで保持しているStoreを提供
// つまり、connect関数内なら、関数の mapStateToProps,mapStateToPropで引数のstateやdispatchを
// 受け取ることができるのだろう
// イメージは、関数の中で関数がある。つまりstore値を持った関数の中で、コンポーネントを動かす感じ
// 関数内関数を使うことで、クラスと同じことができる 値を内部で持つことができる
// =====================================================================================

// =====================================================================================
// func()()の形は一回関数を実行したら、関数を返すので2回関数を呼び出す。
// connect()()は、1度目の関数で、mapStateToPropsとmapDispatchToPropsの値をまとめるものが
// retutnされるのだろう そしてそのまとまった関数の塊はコンポーネント関数に、porpsとして渡るのだろう
// =====================================================================================

// =====================================================================================
// returnの省略
// 戻り値がそのままなら returnを書かなくてもいい
// オブジェクトリテラルのように複数行の文を返す場合は、{}の代わりに()で関数を括うと、
// ひとまとまりの文として認識されます。
// =====================================================================================

// =====================================================================================
// connect(mapStateToProps, mapDispatchToProps)(PlanDetailPage);
// pythonで書くならこんな感じ？
// def connect(mapStateToProps, mapDispatchToProps):

//  const connectData = mapStateToProps +mapDispatchToProps

// def renderCpmponent(store):
//     return components + mapStateToProps +mapDispatchToProps

//  return renderCpmponent(connectData)

// =====================================================================================

// =====================================================================================
// reduxthunkはmidlewareで、actionが関数なら、dispactchを渡すというだけか
// =====================================================================================

// const mapStateToProps = (state) => {
//   return {
//     plan: state.plan,
//   };
// };

// const mapDispatchToProps = (dispatch) => ({
//   postPlanEvent: (planContent) => dispatch(postPlanEvent(planContent)),
// });

// // const mapDispatchToProps = dispatch => {
// //   return {
// //     postPlanEvent: planContent => {
// //       return dispatch(postPlanEvent(planContent));
// //     }
// //   };
// // };

// export default connect(mapStateToProps, mapDispatchToProps)(CreatePlanPage);
