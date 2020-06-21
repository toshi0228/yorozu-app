import { READ_PLAN_EVENTS, CREATE_PLAN_EVENT } from '../actionTypes'
import { postPlan } from '../../services/ApiRequest'
import { postPlanRequest } from '../../services/ApiRequest'

// プランの承認
export const planRequest = (requestData) => (dispatch) => {
  console.log(`acttionがよばれた:${requestData}`)
  console.log(requestData)
  postPlanRequest(requestData).then((res) => {
    console.log('プランのリクエスト完了')
    console.log(res)
  })
}
// ======================================================================
// プラン登録
// ======================================================================

export const createPlan = (plan) => (dispatch) => {
  const formData = new FormData()
  // サーバーサイドのシリアライザと同じ名前にしないといけない
  // 第3引数は、Content-Dispositionヘッダに含めるファイル名を渡すことができる
  formData.append('yorozuyaProfileId', plan.yorozuId)
  formData.append('title', plan.title)
  formData.append('description', plan.description)
  formData.append('price', plan.price)
  formData.append('image', plan.image[0], plan.image[0].name)
  formData.append('tag', plan.tags)

  postPlan(formData)
    .then((res) => {
      console.log(res)
    })
    .catch((error) => {
      console.log(error)
    })
}

// .then((res) => {
//   console.log(res)
// })
// .catch((error) => {
//   console.log(error)
// })
// }
