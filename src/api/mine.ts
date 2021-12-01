import service, { Response } from '@/utils/service';
import { request } from '@tarojs/taro';


type UserPublicType = Optional<{
  "companyAbbr": string
  "companyName": string
  "companyProfile": string
  "contactAddress": string
  "contactInformation": string
  "enable": boolean
  "id": number
  "imageUrl": string
  "mail": string
  "mobilePhone": string
  "name": string
  "position": string
  "qrCodeUrl": string
}>

export default {
  getByUserId(userId: number | string) {
    return service.get(`/scrm/customer/businessCard/getByUserId/${userId}`)
  },

  // 访问详情查询
  detailQuery(params: { ownerId: number; queryDate: string }) {
    return service.json('/scrm/customer/visitorRecord/detailQuery', params);
  },

  // 今日数据查询
  todayQuery(params: { ownerId: number; queryDate: string }) {
    return service.json('/scrm/customer/visitorRecord/todayQuery', params);
  },

  // 汇总数据查询
  totalQuery(params: { ownerId: number; queryDate: string }) {
    return service.json('/scrm/customer/visitorRecord/totalQuery', params);
  },

  // 打电话统计
  callCount(params: {
    callDate: string;
    ownerId: number;
    ownerName: string;
  }) {
    return service.json('/scrm/customer/visitorRecord/callCount', params);
  },

  // 分享统计
  shareCount(params: {
    customerId: number;
    customerName: string;
    ownerId: number;
    ownerName: string;
    shareDate: string;
    visitorDate: string;
  }) {
    return service.json('/scrm/customer/visitorRecord/shareCount', params);
  },

  // 访问人数统计
  visitorCount(params: {
    ownerId: number;
    ownerName: string;
    visitorDate: string
  }) {
    return service.json('/scrm/customer/visitorRecord/visitorCount', params)
  },

  getByUserIdForPublic(params: {
    appId: string | number;
    epId: string | number;
    userId: string | number;
  }): Promise<UserPublicType> {
    return request<Response<UserPublicType>>({
      method: 'GET',
      url: '/scrm/customer/businessCard/getByUserIdForPublic',
      data: params
    }).then(({ data }) => {
      if (data.success) {
        const user = data.data
        user.contactAddress = user.contactAddress && JSON.parse(user.contactAddress)
        user.contactInformation = user.contactInformation && JSON.parse(user.contactInformation)
        return user
      } else {
        return {}
      }
    }) as Promise<UserPublicType>
  }
}