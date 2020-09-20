const hostList = {
  // localhost: () => 'http://localhost:80',
  //   aws: () => 'http://54.178.94.145',
  // 本番用apiリクエスト
  localhost: () => 'https://yourozu.work',
}

export default hostList

// console.log('process.env.NODE_ENVの情報')
// console.log(process.env.NODE_ENV)
// console.log('development')
// console.log("production")
