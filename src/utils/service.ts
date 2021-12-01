import { redirectTo, request as TaroRequest } from '@tarojs/taro';
import axios from 'axios';
import { Toast } from 'antd-mobile';

type Option = TaroRequest.Option;

export type Response<T = any> = {
  msg: string;
  code?: number;
  pageNo?: number;
  pageSize?: number;
  success: boolean;
  totalCount?: number;
  data: T;
  errorMessage?: string;
};

interface WrapResponse<T> extends Promise<T> {
  notice(): Promise<T>;
  strict(): Promise<T>;
  extract(): Promise<T extends Response<infer D> ? D : T>;
}

function wrap<T = any>(options: Option) {
  const response = TaroRequest(options).then(({ data }) => data) as WrapResponse<Response<T>>;

  response.notice = async () => {
    // 如果有错误信息会toast提示
    const res = await response;
    if (!res.success && res.msg) {
      Toast.show({
        content: res.msg,
        icon: 'fail',
      });
    }
    return res;
  };

  response.strict = async () => {
    // 将success 为false的响应reject出去
    const res = await response;
    return res.success ? res : await Promise.reject(res);
  };

  response.extract = async () => {
    // 返回response.data
    const res = await response;
    return res.data;
  };

  response.then((res) => {
    // 统一接口判断未登录逻辑
    if (res.code && res.code === 401) {
      Toast.show({
        icon: 'fail',
        content: res.msg,
      });
      setTimeout(() => {
        // 未登录
        redirectTo({
          url: '/pages/login/index',
        });
      }, 2000);
    }
    return res;
  });

  return response;
}



export default {
  post<T = any>(url: Option['url'], data: Option['data']) {
    this.wrap
    return wrap<T>({
      url,
      data,
      method: 'POST',
    });
  },

  get<T = any>(url: Option['url'], data?: Option['data']) {
    return wrap<T>({
      url,
      data,
      method: 'GET',
    });
  },

  json<T = any>(url: Option['url'], data: Option['data']) {
    return wrap<T>({
      url,
      data,
      method: 'POST',
      header: {
        ContentType: 'application/json',
      },
    });
  },

  form(url: Option['url'], data: Option['data']) {
    const formData = new FormData();
    Object.keys(data).forEach((key) => formData.append(key, data[key]));
    return axios({
      url: url,
      method: 'POST',
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  loginForm(url: Option['url'], data: Option['data']) {
    const formData: string[] = [];
    Object.keys(data).forEach((key) => formData.push(`${key}=${encodeURIComponent(data[key])}`));
    return axios({
      url: url,
      method: 'POST',
      data: formData.join('&'),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
  }
}