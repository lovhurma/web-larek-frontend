//Данные получаемые при запросе списка продуктов
export interface IProductData {
  catalog: IProduct[]
  counter: number
}

//Данные о конкретном продукте в массиве с апи
export interface IProduct {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null
}

//Данные о пользователе
export interface IOrderData {
  payment?: string;
  email?: string;
  phone?: string;
  address?: string;
}

export interface IOrderForm {
  email: string;
  phone: string;
  adress: string;
}

//Сумма заказа и список ID купленных товаров(интерфейс корзины)
export interface IOrder {
  totalamount: number
  productListElement: IProduct[]
}

export interface IOrderResponse {
  id: string
}

//Тип FormErrors будет использоваться для описания объектов, которые могут содержать сообщения об ошибках, связанных с формами, где ключи соответствуют полям формы, определенным в IOrderData
export type FormErrors = Partial<Record<keyof IOrderData, string>>

//МОДЕЛЬ ДАННЫХ
export interface IProductModal  {
  
  //Добавление массива карточек
  addproducts(): IProduct[];

  // Метод для получения количества товаров в корзине
  getBasketAmount(): number;

  //Добавить товар(карточку) в корзину
  addToBasket(): void;

  //Удалить товар с корзины
  removeFromBasket(): void;
  
  // Метод для полной очистки корзины
  clearBasket(): void

  //Общая сумма(стоимость) товаров в корзине
  getBasketPrice(): void;

  // Метод для получения списка ID товаров в корзине 
  getItems(): void;

  // Метод для заполнения полей email, phone, address, payment 
  addOrderField(field: IOrderData, value: string): void;

  // Валидация форм для окошка "контакты"
  validateContacts(): boolean;

  // Валидация форм для окошка "заказ"
  validateOrder(): boolean;
  
  // Очистка данных покупателя
  cleanOrder(): boolean;

  // Метод для проверки наличия товара в корзине
  isProductInBasket(): boolean;
}

