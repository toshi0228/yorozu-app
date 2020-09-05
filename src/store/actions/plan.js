import {
  CREATE_PLAN_EVENT,
  CHECK_INPUT_PLAN_ITEM_EVENT,
  EDIT_PLAN_ITEM_EVENT,
  UPDATE_PLAN_EVENT,
  FIN_READ_UPDATE_PLAN_EVENT,
  READY_CREATE_PLAN_EVENT,
  DELETE_PLAN_EVENT,
} from '../actionTypes'
// import { READ_PLAN_EVENTS, CREATE_PLAN_EVENT, CHECK_INPUT_PLAN_ITEM_EVENT } from '../actionTypes'
import { postPlan, getProfileDetail, patchPlan, patchPlanImage, patchPlanTag, deletePlan } from '../../services/ApiRequest'
import { readProfile } from './profile'

// ======================================================================
// プラン登録
// ======================================================================
export const createPlan = (plan) => (dispatch) => {
  // plan.titleがないのに、actionが呼ばれることがあるので、タイトルがなければリターンする
  if (plan.title === '') {
    return
  }

  const formData = new FormData()
  // サーバーサイドのシリアライザと同じ名前にしないといけない
  // 第3引数は、Content-Dispositionヘッダに含めるファイル名を渡すことができる
  formData.append('yorozuyaProfileId', plan.yorozuId)
  formData.append('title', plan.title)
  formData.append('description', plan.description)
  formData.append('price', plan.price)
  formData.append('image', plan.image[0])
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
      console.log('エラー')
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
// プランを作成ボタンを押した時に使う。プランの入力項目を一度空白にする
// ======================================================================

export const readyCreatePlan = () => {
  return {
    type: READY_CREATE_PLAN_EVENT,
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
  // ーーー画像を更新
  // imgae => []なら、オブジェクトから削除する サーバー側でエラーになるので
  if (planItem.image.length === 0) {
    //関数の内部の流れ => (1)title,price, discriptionの更新  (2)タグの更新を内部で指定
    noImagePlanUpdate(planItem, dispatch)

    // 画像がある場合。画像を登録してから、imageUpdateの内部でplanUpdate()を行なっている
  } else {
    //関数の内部の流れ => (1)画像の更新 (2)title,price, discriptionの更新  (3)タグの更新を内部で指定
    planUpdate(planItem, dispatch)
  }
}

// ======================================================================
// プランのtitle,price, discriptionの更新 updatePlanで使われる関数
// image, tagは更新されない
// ======================================================================
const noImagePlanUpdate = (planItem, dispatch) => {
  // imageがあるとエラーになるので削除する tagsに関してはエラーにならないが一応消す
  delete planItem.image
  // delete planItem.tags
  patchPlan(planItem).then((res) => {
    //ーーータグの更新
    tagUpdate(planItem, dispatch)
  })
}

// ======================================================================
// 画像の更新 updatePlanで使われる関数
// ======================================================================

const planUpdate = (planItem, dispatch) => {
  const formData = new FormData()
  formData.append('image', planItem.image[0], planItem.image[0].name)

  // urlにidデータも必要なのでidも送信する
  const imageData = {
    id: planItem['id'],
    formData,
  }
  patchPlanImage(imageData).then((res) => {
    //画像を更新したとに、title,price, discriptionの更新
    noImagePlanUpdate(planItem, dispatch)
  })
}

// ======================================================================
// タグの更新 updatePlanで使われる関数
// ======================================================================
const tagUpdate = (planItem, dispatch) => {
  // planItem.tagsは、配列なのでFormDataを使う
  const formData = new FormData()
  formData.append('tag', planItem.tags)

  // urlでidが必要なのでidも入れる
  const tagData = {
    id: planItem['id'],
    tag: formData,
  }

  // タグの更新が成功したら,そのapiの仕様上プランのIDが帰ってくる(特今のところ使わない)
  patchPlanTag(tagData).then(() => {
    // ここまでの関数の内部の流れ => (1)画像の更新 (2)title,price, discriptionの更新  (3)タグの更新を内部で指定
    // タグが更新されたら、プランの更新が終了したことを以下のコードで伝える
    dispatch(changeStatusPlan())
  })
}

// ======================================================================
// プランが更新されたら,(タグがプラン更新の最後のプロセスなのでtagUpdateで使われる)
// isUpdatePlan:falseは、
// ======================================================================
const changeStatusPlan = () => {
  return {
    type: UPDATE_PLAN_EVENT,
  }
}

// ======================================================================
// 更新したプラン(実際,createPlanPageでprofileを取得する)を取得したら、
// isUpdatePlan: falseにする
// ======================================================================
export const finReadUpdatePlan = () => {
  return {
    type: FIN_READ_UPDATE_PLAN_EVENT,
  }
}

// ======================================================================
// プランを削除するアクション
// ======================================================================
export const removePlan = (planId) => (dispatch) => {
  deletePlan(planId).then((res) => {
    dispatch(remove(planId))
  })
}

export const remove = (planId) => {
  return {
    type: DELETE_PLAN_EVENT,
    payload: planId,
  }
}
