import { READ_PLAN_EVENTS, CREATE_PLAN_EVENT, CHECK_INPUT_PLAN_ITEM_EVENT, FIN_REGISTER_PLAN_EVENT } from '../actionTypes'
// import { READ_PLAN_EVENTS, CREATE_PLAN_EVENT, CHECK_INPUT_PLAN_ITEM_EVENT } from '../actionTypes'
import { postPlan, getProfileDetail } from '../../services/ApiRequest'
import { readProfile } from './profile'

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
      // プロフィールを登録した後に、登録したprofileデータの詳細を取得する(プランデータやscoreデータも取得できる)
      // また、プレビューのデータも以下の作業を行うことで更新される
      const yorozuId = res.data
      getProfileDetail(yorozuId).then((res) => {
        dispatch(readProfile(res.data))
      })

      // プランの登録の場合
      dispatch(setCreatePlan(res))
    })
    .catch((error) => {
      console.log(error)
    })
}

const setCreatePlan = (createPlan) => {
  return {
    type: CREATE_PLAN_EVENT,
    payload: createPlan,
  }
}

// ======================================================================
// プランの登録画面で、インプット項目に空白がないか確認
// ======================================================================
export const checkPlanItem = (planItem) => {
  return {
    type: CHECK_INPUT_PLAN_ITEM_EVENT,
    payload: planItem,
  }
}
