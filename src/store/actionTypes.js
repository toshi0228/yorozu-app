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
// よろず屋が、お客さんのプランリクエストの承認を行う
export const PLAN_APPROVAL_EVENT = 'PLAN_APPROVAL_EVENT'
// メッセージルームページのユーザーよって、プランリクエストのユーザーを取得する
export const READ_ROOMMESSAGE_USER_PLAN_REQUEST_EVENT = 'READ_ROOMMESSAGE_USER_PLAN_REQUEST_EVENT'
