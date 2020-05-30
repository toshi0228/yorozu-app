const UrlList = {
  top: () => '/',
  siginIn: () => '/sign_in',
  signUp: () => '/sign_up',
  profileDetail: () => '/plan/:id',
  // profileDetail: () => '/plan/detail/:id',
  // profileDetail: (data) => {
  //   return `/plan/detail/${data.yorozuId}`;
  // },
  createPlan: () => '/create_plan',
  messageList: () => '/message',
  createMessage: () => '/message/rooms/:id',
  // messageRoom: () => '/message/rooms/:id',
  dashboard: () => '/dashboard',
  contracting: () => '/contracting',
  clientList: () => '/client_list',
  myPage: () => '/my_page',
}

export default UrlList
