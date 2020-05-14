const UrlList = {
  top: () => '/',
  siginIn: () => '/sign_in',
  signUp: () => '/sign_up',
  // profileDetail: () => '/plan/detail/:id',
  profileDetail: () => '/plan/:id',
  // profileDetail: (data) => {
  //   return `/plan/detail/${data.yorozuId}`;
  // },
  createPlan: () => '/create_plan',
  messageList: () => '/message',
  createMessageList: () => '/message_list',
  messageRoom: () => '/message/rooms/:id',
  dashboard: () => '/dashboard',
  contracting: () => '/contracting',
  clientList: () => '/client_list',
  myPage: () => '/my_page',
}

export default UrlList
