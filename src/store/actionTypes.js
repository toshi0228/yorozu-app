// ============================================================
// Account
// ============================================================
export const SIGN_IN_ACCOUNT = 'SIGN_IN_ACCOUNT'
export const SIGN_OUT = 'SIGN_OUT'
export const SET_ACCOUNT = 'SET_ACCOUNT'
export const SET_ACCOUNT_ERRORS = 'SET_ACCOUNT_ERRORS'
export const READ_LOGIN_USER_PROFILE_EVENT = 'READ_LOGIN_USER_PROFILE_EVENT'

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
export const CREATE_PROFILE_EVENT = 'CREATE_PROFILE_EVENT'
export const READ_ACCOUNT_ID_EVENT = 'READ_ACCOUNT_ID_EVENT'
export const SEARCH_PROFILE_EVENT = 'SEARCH_PROFILE_EVENT'
export const PROFILE_RRESET_EVENT = 'PROFILE_RRESET_EVENT'

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
// /message/rooms/●●●/のパスに来た時に、この●●●のyorozuIdを取得する
export const READ_MESSAGE_ROOM_USER_YOROZUID_EVENT = 'READ_MESSAGE_ROOM_USER_YOROZUID_EVENT  '

// ============================================================
// review
// ============================================================
// 自分が送信したreviewを取得
export const READ_MY_SENT_REVIEW = 'READ_MY_SENT_REVIEW'
//reviewを送信する
export const SEND_REVIEW_EVENT = 'SEND_REVIEW_EVENT'
// reviewの上書き処理
export const PATCH_REVIEW_EVENT = 'PATCH_REVIEW_EVENT'
// プランページに移動した時、プランオーナーに送ったreviewを確認する
export const CHECK_MY_SENT_REVIEW_EVENT = 'CHECK_MY_SENT_REVIEW_EVENT'
// プランページに移動した時に、よろずやのreviewの点数を取得する
export const READ_REVIEW_SCORE_EVENT = 'READ_REVIEW_SCORE_EVENT'
// reviewの点数の変更
export const CHANGE_REVIEW_SCORE_EVENT = 'CHANGE_REVIEW_SCORE_EVENT'

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
// 自分NOプランを購入してくれた人のリスト
export const READ_PURCHASERS_LIST_EVENT = 'READ_PURCHASERS_LIST_EVENT'
// ログインユーザーのプランを購入してくれた人のリストから、messageRoomUserが契約してくれたプランがあるか確認
export const CHECK_CLIENT_PURCHASE_PLAN_EVENT = 'CHECK_CLIENT_PURCHASE_PLAN_EVENT'
// よろず屋が、お客さんのプランリクエストの承認を行う
export const PLAN_APPROVAL_EVENT = 'PLAN_APPROVAL_EVENT'
