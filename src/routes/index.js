const UrlList = {
  top: () => '/',
  memberTop: () => '/member',
  siginIn: () => '/sign_in',
  signUp: () => '/sign_up',
  profileDetail: () => '/plan/detail/:id',
  // profileDetail: (data) => {
  //   return `/plan/detail/${data.yorozuId}`;
  // },
  createPlan: () => '/create_plan',
  messageList: () => '/message',
  messageRoom: () => '/message/rooms/:id',
  dashboard: () => '/project',
  contracting: () => '/contracting',
  myPage: () => '/my_page',
};

export default UrlList;
