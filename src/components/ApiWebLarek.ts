import { Api, ApiListResponse } from "./base/api";
  import { IProduct, IOrderResponse } from "../types";

export class LarekApi extends Api {
  readonly cdn: string

  constructor(cdn: string, baseUrl: string, options?: RequestInit) {  
  super(baseUrl, options)
  this.cdn = cdn
  }
  //Мap используется для создания нового массива из оригинальных объектов продуктов, гарантируя, что оригинальные данные останутся неизменными.
  getItemsList() {
    return this.get('/product')
    .then((data: ApiListResponse<IProduct>) => {
    return data.items.map(item => ({...item, 
      image: this.cdn + item.image
    }))

    })
  }
  
  //Метод используется для отправки заказа
  postOrder(order: IOrderResponse) {
    return this.post('/order', order)
    .then((data: IOrderResponse) => data)
  }
}