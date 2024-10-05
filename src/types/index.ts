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

//МОДЕЛЬ ДАННЫХ
export interface IProductModal extends IProductData  {
  
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
  setItems(): void;

  // Метод для заполнения полей email, phone, address, payment 
  addOrderField(field: string, value: string): void;

  // Валидация форм для окошка "контакты"
  validateContacts(): boolean;

  // Валидация форм для окошка "заказ"
  validateOrder(): boolean;
  
  // Очистить корзину после покупки товаров
  cleanOrder(): boolean;
}

