//Данные получаемые при запросе списка продуктов
export interface IProductData {
  total: number
  items: IProduct[]
}

//Данные о конкретном продукте в массиве
export interface IProduct {
  id: string;
  description?: string;
  image: string;
  title: string;
  category: string;
  price: number | null
}

//Данные о пользователе
export interface IOrderData {
  payment: string;
  email: string;
  phone: string;
  address: string;
}

//Сумма заказа и список ID купленных товаров(интерфейс корзины)
export interface IOrder {
  totalamount: number
  items: IProduct['id'][]
}

// export interface IProductmodal  {
//   getAllproducts(): IProduct[]
//   openModal(): void
// }

