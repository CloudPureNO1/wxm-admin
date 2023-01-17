// import { ElMessage } from "element-plus";
// import axios from 'axios'
import BaseConfig from "./BaseConfig";
/* import Cookies from 'js-cookie'
 */
import router from "@/router";
import axios from "axios";

// 默认地址
axios.defaults.baseURL = BaseConfig.BASE_URL;

// Add a request interceptor
axios.interceptors.request.use(
  (config: any) => {
    // Do something before request is sent
    const accessToken = sessionStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.accessToken = accessToken;
    } else {
      router.push("/login"); // redirect login
    }
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);
/*
  响应结构
  某个请求的响应包含以下信息

{
  // `data` 由服务器提供的响应
  data:{},

  // `status` 来自服务器响应的 HTTP 状态码
  status:200,

  // `statusText` 来自服务器响应的 HTTP 状态信息
  statusText:'OK',

  // `headers` 服务器响应的头
  headers:{},

   // `config` 是为请求提供的配置信息
  config:{},
 // 'request'
  // `request` is the request that generated this response
  // It is the last ClientRequest instance in node.js (in redirects)
  // and an XMLHttpRequest instance the browser
  request:{}
} */
// Add a response interceptor
// axios.interceptors.response.use(
//   (response) => {
//     // Any status code that lie within the range of 2xx cause this function to trigger
//     // Do something with response data
//     // 参考响应结果
//     // axios 会在结果上添加一个data,  response.data.data 才是自己的数据 response.data.code 才是自己的状态
//     // token 不合法等，清楚token
//     // console.log('>>>>>>>>interceptors.response>>>',response)
//     if (
//       response.data &&
//       (response.data.code === "SCK-10005" ||
//         response.data.code === "SCK-10009" ||
//         response.data.code === "SCK-10010" ||
//         response.data.code === "SCK-10011" ||
//         response.data.code === "ACCESS-10001")
//     ) {
//       // console.log('>>>>>>>>interceptors=====error>>',response)
//       ElMessage({ type: "error", message: response.data.detailMsg });
//       const keys = Object.keys(sessionStorage);
//       if (keys.length !== 0) {
//         keys.forEach((key) => sessionStorage.removeItem(key));
//       }
//       router.push({ path: "/login" });
//     }
//      console.log('>>>>>>>>interceptors.response.data>>>',response,response.data)
//     return response.data;
//   },
//   (error) => {
//     console.error(error)
//     // Any status codes that falls outside the range of 2xx cause this function to trigger
//     // Do something with response error
//     // Using toJSON you get an object with more information about the HTTP error. error.toJSON()
//     return Promise.reject(error);
//   }
// );

/**
 * axios(config)
 * get(url[, config])
 * post(url[, data[, config]])
 *
为方便起见，为所有支持的请求方法提供了别名

axios.request(config)
axios.get(url[, config])
axios.delete(url[, config])
axios.head(url[, config])
axios.options(url[, config])
axios.post(url[, data[, config]])
axios.put(url[, data[, config]])
axios.patch(url[, data[, config]])
 */
const Http = {
  request: (config: any) => {
    return axios(config);
  },
  get: (url: string, config: any) => {
    return axios.get(url, config);
  },
  post: (url: string, data: any, config: any) => {
    return axios.post(url, data, config);
  },
};
export default Http;
/**
 * axios(config)
 *
 *  * // 获取远端图片
    axios({
      method:'get',
      url:'http://bit.ly/2mTM3nY',
      responseType:'stream'
    })
      .then(function(response) {
      response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'))
    });
 */

// 一、Using application/x-www-form-urlencoded format
// By default, axios serializes JavaScript objects to JSON. To send data in the application/x-www-form-urlencoded format instead, you can use one of the following options.

// （1）In a browser, you can use the URLSearchParams API as follows:
/*   eg:
    const params = new URLSearchParams();
    params.append('param1', 'value1');
    params.append('param2', 'value2');
    axios.post('/foo', params);
*/
// Note that URLSearchParams is not supported by all browsers (see caniuse.com), but there is a polyfill available (make sure to polyfill the global environment).

// （2）Alternatively, you can encode data using the qs library:
/* eg:
    const qs = require('qs');
    axios.post('/foo', qs.stringify({ 'bar': 123 }));
*/

// （3）Or in another way (ES6),
/* eg:
    import qs from 'qs';
    const data = { 'bar': 123 };
    const options = {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data: qs.stringify(data),
    url,
    };
    axios(options);
*/

// Form data
// （1）In node.js, you can use the form-data library as follows:
/* eg:
    const FormData = require('form-data');

    const form = new FormData();
    form.append('my_field', 'my value');
    form.append('my_buffer', new Buffer(10));
    form.append('my_file', fs.createReadStream('/foo/bar.jpg'));

    axios.post('https://example.com', form, { headers: form.getHeaders() })
*/

// （2）Alternatively, use an interceptor:
/* eg:
    axios.interceptors.request.use(config => {
    if (config.data instanceof FormData) {
        Object.assign(config.headers, config.data.getHeaders());
    }
    return config;
    });
*/

// Handling Errors
/* axios.get('/user/12345')
  .catch(function (error) {
    if (error.response) {
       The request was made and the server responded with a status code
       that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
       The request was made but no response was received
       `error.request` is an instance of XMLHttpRequest in the browser and an instance of
       http.ClientRequest in node.js
      console.log(error.request);
    } else {
       Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }
    console.log(error.config);
  }); */
