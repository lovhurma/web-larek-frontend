import { Model } from "../base/Model";
import { IProductModal, IProduct, IOrderData, FormErrors } from "../../types";

export class ProductModel extends Model<IProductModal> {
  items: IProduct[] 
  basket: IProduct [] 
  order: IOrderData 
  formErrors: FormErrors = {}

  // Добавление массива карточек 
  addproducts(cards: IProduct[]) {
    this.items = cards
    this.events.emit('items:changed')
  }
  // Метод для получения количества товаров в корзине
  getBasketAmount(): number {
    return this.basket.length
  }
  //Добавление товара(карточки) в корзину
  addToBasket(card: IProduct): void {
    this.basket.push(card)
  }
  //Удаление товара с корзины
  removeFromBasket(id:string): void {
    this.basket = this.basket.filter(item => item.id !== id)
  }
 //Метод для полной очистки корзины
  clearBasket(): void {
    this.basket = []
  }
  //Общая сумма(стоимость) товаров в корзине
  getBasketPrice() {
    this.basket.reduce((sum, next) => sum + next.price, 0)
  }
  //Метод для получения списка ID товаров в корзине
  getItems() {
  return this.basket.map(item => item.id)
  }
  //Метод для заполнения полей email, phone, address, payment
  addOrderField(field: keyof IOrderData, value: string): void {
    this.order[field] = value
  }
  //Валидация форм для окошка "заказ"
  validateOrder(): boolean {
    const errors: typeof this.formErrors = {} 
    if(!this.order.address) {
      errors.address = 'Необходимо указать адрес'
    }
    if(!this.order.payment) {
      errors.payment = 'Необходимо указать способ оплаты'
    }
    this.formErrors = errors
    this.events.emit('input:error', this.formErrors)
    // возвращается логическое значение, которое указывает, есть ли ошибки валидации. Если длина массива ключей объекта errors равна нулю, это означает, что ошибок нет, и метод возвращает true; в противном случае — false.
    return Object.keys(errors).length === 0
  }
  //Валидация форм для окошка "контакты"
  validateContacts(): boolean {
    const errors: typeof this.formErrors = {} 
    if(!this.order.email) {
      errors.address = 'Необходимо указать email'
    }
    if(!this.order.phone) {
      errors.payment = 'Необходимо указать номер телефона'
    }
    this.formErrors = errors
    this.events.emit('input:error', this.formErrors)

    return Object.keys(errors).length === 0
  }
  //Очистка данных покупателя
  cleanOrder(): void {
    this.order.address = ''
    this.order.email = ''
    this.order.phone = ''
    //Предпочитаемый вариант реализации, но я пока не понимаю, подходит ли он, так как payment-выбор кнопкуи
  // Object.keys(this.order).forEach(key => {
  //   if (key in this.order) { // Проверка на наличие поля
  //       this.order[key as keyof IOrderData] = undefined; // Безопасное обращение к полю
  //   }
  // }
}
  //Метод для проверки наличия товара в корзине. Метод some перебирает массив basket и проверяет, есть ли хотя бы один элемент, который удовлетворяет условию
  isProductInBasket(product: IProduct): boolean {
    return this.basket.some(item => item.id === product.id)
  }

}