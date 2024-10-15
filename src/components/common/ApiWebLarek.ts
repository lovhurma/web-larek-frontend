import { Api, ApiListResponse } from "../base/api";
  import { IProduct, IOrderResponse } from "../../types";

class LarekApi extends Api {
  readonly cdn: string

  constructor(cdn: string, baseUrl: string, options?: RequestInit) {  
  super(baseUrl, options)
  this.cdn = cdn
  }
  //Мap используется для создания нового массива из оригинальных объектов продуктов, гарантируя, что оригинальные данные останутся неизменными.
  getItemsList() {
    return this.get('/prodact')
    .then((data: ApiListResponse<IProduct>) => {
      return data.items.map(item => ({...item}))
    })
  }
  
  //Пока не совсем понимаю, зачем мне этот метод, сделала по аналогии с "ОНО ТЕБЕ НАДО"
  postOrder(order: IOrderResponse) {
    return this.post('/order', order)
    .then((data: IOrderResponse) => data)
  }
}