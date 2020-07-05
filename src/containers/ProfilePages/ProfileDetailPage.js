import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Row, Col } from 'antd'

import LeftSide from '../../components/profile/detailProfile/LeftSide'
import RightSide from '../../components/profile/detailProfile/RightSide'
import { feachProfileDetail } from '../../store/actions/profile'
import { feachMySentPlanContract } from '../../store/actions/planContract'
import { readMysentReview, fetchReviewScore } from '../../store/actions/review'

const ProfileDetailPage = (props) => {
  useEffect(() => {
    // propsの中のpropsからidが渡ってきて、そこから受け取ったidによって画像を変える
    const { id } = props.params.match.params
    props.readProfileDetailEvent(id)
    props.readReviewScoreEvent(id)
    // トークンがない場合は、エラーになるので取得しない
    if (props.authToken) {
      // 自分が送信したプラン契約申請(本契約)一覧を取得する
      props.readMySentPlanContractEvent(props.authToken)
    }
  }, [])

  // 自分が送信したレビューを取得する
  useEffect(() => {
    // トークンがり、なおかつまだレビューを取得していなければ、取得する
    if (props.authToken && props.mySentReview.isLoading != true) {
      props.readMysentReviewEvent(props.authToken)
    }
  }, [])

  return (
    <>
      <Row>
        <Col offset={3}>
          <h2>詳細ページ</h2>
        </Col>
      </Row>

      <Row type="flex" justify="center" style={{ paddingTop: 30 }}>
        {/* 右サイド プラン一覧  割合12/24*/}
        <Col span={12} md={12}>
          <LeftSide data={props.data} />
        </Col>
        {/* 右サイドバー 割合6/24 */}
        <Col span={6}>
          <RightSide data={props.data} />
        </Col>
      </Row>
    </>
  )
}

const mapStateToProps = (state) => ({
  data: state.profile,
  authToken: state.account.authToken.access,
  mySentReview: state.review,
})

const mapDispatchToProps = (dispatch) => ({
  // 万屋の詳細ページを取得する(プランや、よろずやユーザーの情報等)
  readProfileDetailEvent: (id) => dispatch(feachProfileDetail(id)),
  // 自分が送信したプラン契約の申請一覧を取得する
  readMySentPlanContractEvent: (authToken) => dispatch(feachMySentPlanContract(authToken)),
  // 自分が送信したreviewを取得する
  readMysentReviewEvent: (authToken) => dispatch(readMysentReview(authToken)),
  // 万屋のreviewScoreを取得する
  readReviewScoreEvent: (yorozuId) => dispatch(fetchReviewScore(yorozuId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDetailPage)

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
