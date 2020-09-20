// ============================================================
// Account
// ============================================================
export const SIGN_IN_ACCOUNT = 'SIGN_IN_ACCOUNT'
export const SIGN_OUT = 'SIGN_OUT'
export const READ_LOGIN_USER_PROFILE_EVENT = 'READ_LOGIN_USER_PROFILE_EVENT'
export const FAILURE_SIGIN_IN_EVENT = 'FAILURE_SIGIN_IN_EVENT'
export const FAILURE_SIGIN_UP_EVENT = 'FAILURE_SIGIN_UP_EVENT'
// ログインページや新規登録ページを開いたときに、isSignInFailureをfalseにする
export const RESET_ERROR_MESSAGE_EVENT = 'RESET_ERROR_MESSAGE_EVENT'
// yorozuIdの読み込み
export const READ_YOROZUID_EVENT = 'READ_YOROZUID_EVENT'
// メールアドレスの取得
export const READ_MAIL_ADDRESS_EVENT = 'READ_MAIL_ADDRESS_EVENT'

// ============================================================
// Application
// ============================================================
export const START_LOADING = 'STOP_LOADING'

// ============================================================
// Plan
// ============================================================
// プランに新規作成
export const CREATE_PLAN_EVENT = 'CREATE_PLAN_EVENT'
// 新規ボタンを押したときに、入力項目を空白にする
export const READY_CREATE_PLAN_EVENT = 'READY_CREATE_PLAN_EVENT'
// プランの登録画面で空白項目がないか確認する
export const CHECK_INPUT_PLAN_ITEM_EVENT = 'CHECK_INPUT_PLAN_ITEM_EVENT'
// プランの編集画面で使う
export const EDIT_PLAN_ITEM_EVENT = 'EDIT_PLAN_ITEM_EVENT'
// プランの更新をしたら isUpdatePlan: falseが => isUpdatePlan: trueになる
export const UPDATE_PLAN_EVENT = 'UPDATE_PLAN_EVENT'
// 更新したプラン(実際,createPlanPageでprofileを取得する)を取得したら、isUpdatePlan: falseにする
export const FIN_READ_UPDATE_PLAN_EVENT = 'FIN_READ_UPDATE_PLAN_EVENT'
// プランの削除
export const DELETE_PLAN_EVENT = 'DELETE_PLAN_EVENT'

// ============================================================
// Tag
// ============================================================
// タグを登録する時に、選択肢に出すために最初タグを読み出す
export const READ_TAG_EVENTS = 'READ_TAG_EVENTS'

// ============================================================
// Profile
// ============================================================
// プランページに移動した時に、前のデータが残っていることがあるので初期化する
export const PROFILE_DETAIL_INITIALIZE_EVENT = 'PROFILE_DETAIL_INITIALIZE_EVENT'
export const READ_PROFILE_EVENTS = 'READ_PROFILE_EVENTS'
export const READ_PROFILE_DETAIL_EVENT = 'READ_PROFILE_DETAIL_EVENT'
export const READ_ACCOUNT_ID_EVENT = 'READ_ACCOUNT_ID_EVENT'
export const SEARCH_PROFILE_EVENT = 'SEARCH_PROFILE_EVENT'
export const RESET_PROFILE_LIST_EVENT = 'RESET_PROFILE_LIST_EVENT'
// プロフィールの登録
// export const CREATE_PROFILE_EVENT = 'CREATE_PROFILE_EVENT'
// プロフィールの項目を取得
export const READ_PROFILE_ITEM_EVENT = 'READ_PROFILE_ITEM_EVENT'
// プロフィールの更新
export const UPDATE_PROFILE_EVENT = 'UPDATE_PROFILE_EVENT'
// プロフィール更新終了 updateProfile trueからfalseにする
export const FIN_UPDATE_PROFILE_EVENT = 'FIN_UPDATE_PROFILE_EVENT'
// 登録ボタンを押した時に入力項目の確認をする
export const CHECK_INPUT_ITEM_EVENT = 'CHECK_INPUT_ITEM_EVENT'
// プロフィールの登録を完了 isToRegister trueからfalseにする
// これをやらないと、永年に登録処理を行ってしまうので
export const FIN_REGISTER_PROFILE_EVENT = 'FIN_REGISTER_PROFILE_EVENT'

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
export const READ_MESSAGE_ROOM_USER_YOROZUID_EVENT = 'READ_MESSAGE_ROOM_USER_YOROZUID_EVENT'
// 送信したメッセージと受信したメッセージを読み込み終わった時に行う処理
export const READ_TOPPAGE_MESSAGE_LIST_EVENT = 'READ_TOPPAGE_MESSAGE_LIST_EVENT'

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

// ============================================================
// payment 決済処理
// ============================================================
// sripeから発行された顧客情報、カード情報のトークンを取得する
export const READ_PAYMENT_CUSTOMER = 'READ_PAYMENT_CUSTOMER'
// sripeから発行された顧客情報、カード情報のトークンを取得を失敗(まだ登録指定ない)
export const READ_PAYMENT_CUSTOMER_ERROR = 'READ_PAYMENT_CUSTOMER_ERROR'
// クレジットカードの情報を登録した時の処理
export const CREATE_PAYMENT_CUSTOMER = 'CREATE_PAYMENT_CUSTOMER'
