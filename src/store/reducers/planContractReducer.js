import {
  PLAN_CONTRACT_EVENT,
  CHECK_MY_SENT_PLAN_CONTRACT_STATUS,
  READ_MY_SENT_PLAN_CONTRACT_EVENTS,
  READ_CONTRACT_PLAN_LIST_EVENTS,
  READ_PURCHASERS_LIST_EVENT,
  CHECK_CLIENT_PURCHASE_PLAN_EVENT,
  PLAN_APPROVAL_EVENT,
} from '../actionTypes'

// todo purchaserを取り出す

const DEFAULT_STATE = {
  // 自分のプランを購入した人の一覧(契約したい人)
  purchasersList: [],

  // 自分が契約しているプラン
  contractPlanList: [],

  //メッセージルームに移動した時に、自分宛に送ってくれた契約してくれたプランを確認する
  clientPurchasePlan: [],

  // 自分が送信した契約申請リスト
  mySentPlanContractList: [],
  // プランIdと契約申請の状態
  // 自分が送信した契約申請を送ったプランごとに、ステータスは、３つある (1)契約申請を送っている (2)契約申請を送って承認待ち (3)契約申請を送って承認あり
  // mySentPlanContractStatus: [],
  mySentPlanContractStatusAndPlanId: [],
}

const planContractReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    // =================================================================================
    // ログインユーザーがよろずやに届いたプラン契約の申請を行う
    // =================================================================================
    case PLAN_CONTRACT_EVENT:
      // 送信した後にサーバーから返ってくる契約申請したプランは.mySentPlanContractListの中にあるプランと少し形が違うので変更する
      //contractPlan: "d15e70f8-4610-4ab8-acf1-a32f717ca23d" -> contractPlan: {id: "d15e70f8-4610-4ab8-acf1-a32f717ca23d"}
      const planId = { id: action.payload.contractPlan }
      const newContractPlan = { ...action.payload, contractPlan: planId }

      // 自分が送信した契約申請リストに新しく送った契約したプランを追加する
      return { ...state, mySentPlanContractList: [...state.mySentPlanContractList, newContractPlan] }

    // =================================================================================
    // 自分が送信したプラン申請を取得する
    // =================================================================================
    case READ_MY_SENT_PLAN_CONTRACT_EVENTS:
      return { ...state, mySentPlanContractList: action.payload }

    // =================================================================================
    // 自分が契約しているプラン一覧を取得する
    // =================================================================================
    case READ_CONTRACT_PLAN_LIST_EVENTS:
      const contractPlanList = state.mySentPlanContractList.filter((mySentPlanContract) => {
        return mySentPlanContract.isApproval === true
      })

      // 作成日の加工 "2020-05-24T14:46:01.945895+09:00" -> 2020年10月23
      const _contractPlanList = contractPlanList.map((contractPlan) => {
        contractPlan['createdAt'] = contractPlan.createdAt.split('T')[0]
        const time = contractPlan['createdAt'].split('-')
        contractPlan['createdAt'] = `${time[0]}年${time[1]}月${time[2]}`
        return contractPlan
      })

      return { ...state, contractPlanList: _contractPlanList }

    // =================================================================================
    // 自分のプランを購入してくれた人のリスト
    // =================================================================================
    case READ_PURCHASERS_LIST_EVENT:
      // 作成日の加工 "2020-05-24T14:46:01.945895+09:00" -> 2020年10月23
      const purchasersList = action.payload.map((purchaser) => {
        purchaser['createdAt'] = purchaser.createdAt.split('T')[0]
        const time = purchaser['createdAt'].split('-')
        purchaser['createdAt'] = `${time[0]}年${time[1]}月${time[2]}`
        return purchaser
      })

      return { ...state, purchasersList: purchasersList }

    // =========================================================================================
    // よろず屋が、お客さんのプランリクエストの承認を行う
    // =========================================================================================
    case PLAN_APPROVAL_EVENT:
      // action.payload => 承認の変数,isApprovalがfalseからtrueに変化した値が入っている
      return { ...state, clientPurchasePlan: action.payload }

    // =========================================================================================
    // ログインユーザーのプランを購入してくれた人のリストから、messageRoomUserが契約してくれたプランがあるか確認
    // =========================================================================================
    case CHECK_CLIENT_PURCHASE_PLAN_EVENT:
      // action.payloadには、メッセージルームユーザーのよろずIDが入っている
      const clientPurchasePlan = state.purchasersList.find((purchaser) => {
        return purchaser.senderYorozuId === action.payload
      })

      return { ...state, clientPurchasePlan: clientPurchasePlan }

    // =================================================================================
    // プランページに移動した時に、ログインユーザーがプラン契約の申請を送信した事がある万屋か確認する
    // (リクエストを送信した事がある万屋ならには、契約申請ができないようにしたい)
    // =================================================================================
    case CHECK_MY_SENT_PLAN_CONTRACT_STATUS:
      // action.payload => プランオーナーのID
      // planContract.receiverYorozuId => 自分が契約申請を送ったよろずやのID
      // プランページごとの、自分が契約しているプランを取り出す
      const mySentPlanContractListOnPlanPage = state.mySentPlanContractList.filter((planContract) => {
        return planContract.receiverYorozuId === action.payload
      })

      // mySentPlanContractStatusAndPlanIdListの中身例
      // [{planId: "d15ed", status: "planContractNotApproved"},{planId: "993", status: "planContractApproved"}]
      const mySentPlanContractStatusAndPlanIdList = []

      // 契約してあるプランごとにステータスを確認する
      const mySentPlanContractCheck = (mySentPlanContract) => {
        try {
          if (mySentPlanContract.isApproval) {
            // 契約申請を送って承認あり
            const planStatusAndPlanId = { planId: mySentPlanContract.contractPlan['id'], status: 'planContractApproved' }
            mySentPlanContractStatusAndPlanIdList.push(planStatusAndPlanId)
          } else {
            // 契約申請を送っているが承認なし
            const planStatusAndPlanId = { planId: mySentPlanContract.contractPlan['id'], status: 'planContractNotApproved' }
            mySentPlanContractStatusAndPlanIdList.push(planStatusAndPlanId)
          }
        } catch {
          // 契約申請送っていない
          const planStatusAndPlanId = { planId: mySentPlanContract.contractPlan['id'], status: 'notSentPlanContract' }
          mySentPlanContractStatusAndPlanIdList.push(planStatusAndPlanId)
        }
      }

      // プランごとのプランに対して、ステータスをつける
      mySentPlanContractListOnPlanPage.forEach((mySentPlanContract) => {
        mySentPlanContractCheck(mySentPlanContract)
      })

      return { ...state, mySentPlanContractStatusAndPlanId: mySentPlanContractStatusAndPlanIdList }

    default:
      return state
  }
}

export default planContractReducer
