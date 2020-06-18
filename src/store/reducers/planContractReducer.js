import { PLAN_CONTRACT_EVENT, CHECK_MY_SENT_PLAN_CONTRACT_STATUS, READ_MY_SENT_PLAN_CONTRACT_EVENTS } from '../actionTypes'

const DEFAULT_STATE = {
  // 自分宛に届いたいプランリクエスストの一覧
  // receivePlanRequestList: [],

  // 自分が送信したプランリクエスト
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
      return { ...state, mySentPlanContractList: [{ ...action.payload }] }
    // =================================================================================
    // 自分が送信したプラン申請を取得する
    // =================================================================================
    case READ_MY_SENT_PLAN_CONTRACT_EVENTS:
      return { ...state, mySentPlanContractList: action.payload }

    // =================================================================================
    // プランページに移動した時に、ログインユーザーがプラン契約の申請を送信した事がある万屋か確認する
    // (リクエストを送信した事がある万屋ならには、契約申請ができないようにしたい)
    // =================================================================================
    case CHECK_MY_SENT_PLAN_CONTRACT_STATUS:
      console.log('CHECK_MY_SENT_PLAN_CONTRACT_STATUSまできた')

      // action.payload => プランオーナーのID
      // planContract.receiverYorozuId => 自分が契約申請を送ったよろずやのID
      // プランページごとの、自分が契約しているプランを取り出す
      const mySentPlanContractListOnPlanPage = state.mySentPlanContractList.filter((planContract) => {
        return planContract.receiverYorozuId === action.payload
      })

      // mySentPlanContractStatusAndPlanIdListの中身例
      // {planId: "d15ed", status: "planContractNotApproved"},{planId: "993", status: "planContractApproved"}
      const mySentPlanContractStatusAndPlanIdList = []

      // 契約してあるプランごとにステータスを確認する
      const mySentPlanContractCheck = (mySentPlanContract) => {
        try {
          if (mySentPlanContract.isApproval) {
            // 契約申請を送って承認あり
            const planStatusAndPlanId = { planId: mySentPlanContract.contractPlan['id'], status: 'planContractApproved' }
            mySentPlanContractStatusAndPlanIdList.push(planStatusAndPlanId)
            // return { ...state, mySentPlanContractStatusAndPlanId: planStatusAndPlanId }
          } else {
            // 契約申請を送っているが承認なし
            const planStatusAndPlanId = { planId: mySentPlanContract.contractPlan['id'], status: 'planContractNotApproved' }
            mySentPlanContractStatusAndPlanIdList.push(planStatusAndPlanId)
            // return { ...state, mySentPlanContractStatusAndPlanId: planStatusAndPlanId }
          }
        } catch {
          // 契約申請送っていない
          const planStatusAndPlanId = { planId: mySentPlanContract.contractPlan['id'], status: 'notSentPlanContract' }
          mySentPlanContractStatusAndPlanIdList.push(planStatusAndPlanId)
          // return { ...state, mySentPlanContractStatusAndPlanId: 'notSentPlanContract' }
        }
      }

      mySentPlanContractListOnPlanPage.forEach((mySentPlanContract) => {
        mySentPlanContractCheck(mySentPlanContract)
      })
      // console.log('----------')
      // console.log(mySentPlanContractStatusAndPlanIdList)

      // 契約申請がある場合
      // mySentPlanContract => {senderYorozuId: "nobita", receiverYorozuId: "shizuka", isApproval: true,....}
      // 契約申請がない場合
      // mySentPlanContract => undifind

      // もし、契約申請を送った事があるならisSentPlanRequesの中身は、契約申請のデータが入っている(tryの方に行く)
      // もし送った事がなければ、isSentPlanRequesはundifindになり、catchの方に行く

      // try {
      //   if (mySentPlanContract.isApproval) {
      //     // 契約申請を送って承認あり
      //     const planStatusAndPlanId = { planId: mySentPlanContract.contractPlan['id'], status: 'planContractApproved' }
      //     return { ...state, mySentPlanContractStatusAndPlanId: planStatusAndPlanId }
      //   } else {
      //     // 契約申請を送っているが承認なし
      //     const planStatusAndPlanId = { planId: mySentPlanContract.contractPlan['id'], status: 'planContractNotApproved' }
      //     return { ...state, mySentPlanContractStatusAndPlanId: planStatusAndPlanId }
      //   }
      // } catch {
      //   // 契約申請送っていない
      //   return { ...state, mySentPlanContractStatusAndPlanId: 'notSentPlanContract' }
      // }

      return { ...state, mySentPlanContractStatusAndPlanId: mySentPlanContractStatusAndPlanIdList }

    default:
      return state
  }
}

export default planContractReducer
