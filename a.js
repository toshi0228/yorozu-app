console.log(JSON.stringify([{ name: 'aa' }]));
var original = Promise.resolve(33);
console.log(original);
// import _ from 'lodash';

// const params = {
//   name: '名前',
//   title: 'タイトル',
//   image: '画像ファイル',
//   tags: ['タグ1', 'タグ2'], // 追加
// };

// _forEach(params, (value, key) => console.log(value));

// const formData = new FormData()
// Object.entries(params).forEach(([key, value]) => {
//   if (Array.isArray(value)) {
//     value.forEach((v, i) => {
//       formData.append(key + '[]', v)  // arrayデータを分割して入れ直す
//     })
//   } else {
//     formData.append(key, value)
//   }
// })

// _.forEach({ a: 1, b: 2 }, function (value, key) {
//   console.log(key);
// });
