const UrlList = {
  top: () => '/',
  siginIn: () => '/sign_in',
  signUp: () => '/sign_up',
  profileDetail: (yorozuId) => `/plan/${yorozuId}`,
  messageList: () => '/message',
  // createMessage: () => '/message/rooms/:id',
  createMessage: (yorozuId) => `/message/rooms/${yorozuId}`,
  dashboard: () => '/dashboard',
  myPage: () => '/channel/featured',
  card: () => '/card',
}

export default UrlList

// ==================================================================
// 2020 6 12
// こんな物を作りたい時にどうするか？ 最後のパスがそれぞれで変わる時
// http://localhost:3000/plan/dora
// http://localhost:3000/plan/nobita

// 単純に書くなら
// component
// <Link to={`/plan/${data.yorozuId}`}> */
// profileDetail: () => '/plan/:id',
// <Route path={routes.profileDetail()} render={withLayout(ProfileDetailPage)} />

// 汎用的に書くなら以下のように書く
// <Link to={`${routes.profileDetail(data.yorozuId)}`}>
// <Route path={routes.profileDetail(':id')} render={withLayout(ProfileDetailPage)} />
// profileDetail: (yorozuId) => `/plan/${yorozuId}`,

// ポイント
// 引数で最初に':id'を渡す事
// <Route path={routes.profileDetail(':id')}>
// つまり、これを初期の引数で渡す事で以下のようになり
// profileDetail: (id) => `/plan/${id}`,
// 上記のものは、以下のものと同じものになる
// profileDetail: () => '/plan/:id',
// ==================================================================
