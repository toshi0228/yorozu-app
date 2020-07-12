import { postPayment } from '../../services/ApiRequest'

export const payment = (token) => (dispatch) => {
  postPayment(token).then((res) => {
    console.log('payment処理')
    console.log(res)
  })
}
