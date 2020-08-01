import { READ_TAG_EVENTS } from '../actionTypes'
import { feachTags } from '../../services/ApiRequest'

// 7 31
// 0を削除するところから

export const readTagEvent = () => (dispatch) => {
  feachTags().then((res) => {
    // 空白のタグをの削除した、以前に全ユーザーが登録したtagが入る
    const registeredTagList = []
    res.data.forEach((registeredTag) => {
      // {id: "5a9eb972f", name: "",...}こんな感じでnameに空白があるとエラーが出るので、削除する
      if (registeredTag.name) {
        registeredTagList.push(registeredTag)
      }
    })

    dispatch(readTag({ ...registeredTagList }))
  })
}

export const readTag = (tagList) => {
  return {
    type: READ_TAG_EVENTS,
    payload: { ...tagList },
  }
}

// =====================================================================================
// 非同期の場合は、API通信を行って、そこから取得した値をとってから値をstoreに飛ばしたい。
// コンポネーント側でreadTagEvent()をした特に、action側で()()だから、コンポーネント側で
// readTagEvent()()にしないといけないと思ったが、最後の関数実行は、thunkがやっているのだ
// thunkは「必要になったときに処理を行う」という意味。つまり、API通信を行って値が届いたら行う
// というイメージだ
// イメージ
// store   <---- dispatch()
// storeにdispatchが届き、その値が関数だったら、処理を行うというイメージ
// このときに使われるのがthunk
// =====================================================================================

// =====================================================================================
// 非同期で押えるべきポイント
// storeに値を届ける場合は、dispatch()でないとstoreに値を届けられない
// storeにささった状態のオブジェクトは届く
// 同期の場合
// store<---- dispatch(オブジェクト)

// 非同期の場合
// store<---- dispatch(空のオブジェクト)
// APIでデータ取得(3秒後と仮定)
// もうdispatchはなくオブジェクトだけになる
// store<----オブジェクト

// これではよくないので
// APIでデータ取得(3秒後)もdispatchを発射したい
// イメージ

// ＊＊＊非同期
//                 =========  dispatch  ==========
// store<----------===  dispatch(オブジェクト)  ====
//                 ===============================
// store<----dispatch(オブジェクト)

// つまり、関数の中に関数をまるめこむ
// これで問題解決かと思いきやまだ問題が残る
// では、最後の関数を誰が実行するのだ

// ここでてくるのが、thunk
// 「必要になったときに処理を行うのがthunkの役目

// dispatch(type,payload)なら値は届く
// =====================================================================================
