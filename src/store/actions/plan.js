import { READ_PLAN_EVENTS, CREATE_PLAN_EVENT, CHECK_INPUT_PLAN_ITEM_EVENT, EDIT_PLAN_ITEM_EVENT } from '../actionTypes'
// import { READ_PLAN_EVENTS, CREATE_PLAN_EVENT, CHECK_INPUT_PLAN_ITEM_EVENT } from '../actionTypes'
import { postPlan, getProfileDetail, getPlan, patchPlan, patchPlanImage, patchPlanTag } from '../../services/ApiRequest'
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

// ======================================================================
// プランを取得する。(プランを編集する時に使う)
// ======================================================================

export const readEditPlan = (planItem) => {
  return {
    type: EDIT_PLAN_ITEM_EVENT,
    payload: planItem,
  }
}

// ======================================================================
// プランの更新を行う
// ======================================================================

// 同じ場所にhttpリクエストを行うのだが、image, tag, それ以外で三回の更新を行う
// imageは、formData, tagは配列,それ以外は文字列だから
export const updatePlan = (planItem) => (dispatch) => {
  // 画像を更新する処理
  // imgae => []なら、オブジェクトから削除する サーバー側でエラーになるので
  if (planItem.image.length === 0) {
    delete planItem.image
    patchPlan(planItem).then((res) => {
      console.log('更新成功')
      // タグの更新
      const formData = new FormData()
      formData.append('tag', planItem.tags)
      const tagData = {
        id: planItem['id'],
        tag: formData,
      }
      patchPlanTag(tagData).then((res) => {
        console.log('タグの更新成功')
      })
    })
    // 画像がある場合。画像を登録してから、もう一度それ以外のものプランデータを更新する
  } else {
    const formData = new FormData()
    formData.append('image', planItem.image[0], planItem.image[0].name)
    // urlにidデータも必要なのでidも送信する
    const imageData = {
      id: planItem['id'],
      formData,
    }
    patchPlanImage(imageData).then((res) => {
      // planItem.imageがあるとエラーになるので、削除する
      delete planItem.image
      patchPlan(planItem).then((res) => {
        console.log('更新成功')
        // console.log(res)
      })
    })
  }
}
