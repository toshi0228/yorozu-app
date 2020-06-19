// ============================================================
// Account
// ============================================================
export const SIGN_IN_ACCOUNT = 'SIGN_IN_ACCOUNT'
export const SIGN_OUT = 'SIGN_OUT'
export const SET_ACCOUNT = 'SET_ACCOUNT'
export const SET_ACCOUNT_ERRORS = 'SET_ACCOUNT_ERRORS'

// ============================================================
// Application
// ============================================================
export const START_LOADING = 'STOP_LOADING'

// ============================================================
// Plan
// ============================================================
export const CREATE_PLAN_EVENT = 'CREATE_PLAN'
export const READ_PLAN_EVENTS = 'READ_PLAN_EVENTS'

// ============================================================
// Tag
// ============================================================
export const READ_TAG_EVENTS = 'READ_TAG_EVENTS'

// ============================================================
// Profile
// ============================================================
// プランページに移動した時に、前のデータが残っていることがあるので初期化する
export const PROFILE_DETAIL_INITIALIZE_EVENT = 'PROFILE_DETAIL_INITIALIZE_EVENT'
export const READ_PROFILE_EVENTS = 'READ_PROFILE_EVENTS'
export const READ_PROFILE_DETAIL_EVENT = 'READ_PROFILE_DETAIL_EVENT'
export const CREATE_PROFILE_EVENTS = 'CREATE_PROFILE_EVENTS'

// ============================================================
// message
// ============================================================
// 受信したメッセージを読み込むイベント
export const READ_MESSAGE_EVENTS = 'READ_MESSAGE_EVENTS'
// メッセージルームに移動したときのイベント(送信者のyorozuIdによって、受信箱のメッセージをリストを変更する)
export const READ_ROOMMESSAGE_EVENTS = 'READ_ROOMMESSAGE_EVENTS'
// 自分が送信したメッセージを取得する
export const READ_MY_SEND_MESSAGE_EVENTS = 'READ_MY_SEND_MESSAGE_EVENTS'
// メッセージルームでメールを送信した時の処理
export const SEND_MESSAGE_EVENT = 'SEND_MESSAGE_EVENT'

// ============================================================
// request
// ============================================================
// 自分宛に届いたプランリクエストの一覧を取得する
export const READ_PLAN_REQUEST_EVENTS = 'READ_PLAN_REQUEST_EVENTS'
// 自分が送信したプランリクエストの一覧を取得する
export const READ_MY_PLAN_REQUEST_EVENTS = 'READ_MY_PLAN_REQUEST_EVENTS'
// よろず屋が、お客さんのプランリクエストの承認を行う
export const PLAN_APPROVAL_EVENT = 'PLAN_APPROVAL_EVENT'
// メッセージルームページのユーザーよって、プランリクエストのユーザーを取得する
export const READ_ROOMMESSAGE_USER_PLAN_REQUEST_EVENT = 'READ_ROOMMESSAGE_USER_PLAN_REQUEST_EVENT'
// プランページに移動した時に、ログインユーザーがプランリクエストの状態を確認する
// (リクエストを送信した事がある万屋ならには、プランリクエストをできないようにしたい)
// 自分が送ったプランリクエストの状態 1. プランリクエストを送信してない 2.承認されていない 3.承認された
export const CHECK_MY_SENT_PLAN_REQUEST_STATUS = 'CHECK_MY_SENT_PLAN_REQUEST_STATUS'

// ============================================================
// contract
// ============================================================
// プランの契約を送信
export const PLAN_CONTRACT_EVENT = 'PLAN_CONTRACT_EVENT'
// 自分が送信したプランリクエストの一覧を取得する
export const READ_MY_SENT_PLAN_CONTRACT_EVENTS = 'READ_MY_SENT_PLAN_CONTRACT_EVENTS'
// 自分が契約しているプランの一覧を取得する
export const READ_CONTRACT_PLAN_LIST_EVENTS = 'READ_CONTRACT_PLAN_LIST_EVENTS'
// プランページに移動した時に、ログインユーザーがプランリクエストの状態を確認する
// 自分が送ったプラン契約の申請状態 1. 契約送信を送信してない 2.承認されていない 3.承認された
export const CHECK_MY_SENT_PLAN_CONTRACT_STATUS = 'CHECK_MY_SENT_PLAN_CONTRACT_STATUS'
