
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
export interface IForm {
  payment: string;
  address: string;
  email: string;
  phone: string;
}

//Данные получаемые при запросе всех продуктов
export interface IProductData {
  total: number
  items: IProduct[]
}

//Тип формы при заполнении покупателем способа оплаты и адресса 
export type TFormPayment = Pick <IForm, 'payment' | 'address'>

//Тип формы при заполнении покупателем данных(еmail и номер телефона)
export type TFormInfo = Pick <IForm, 'email' | 'phone'>