import { Model } from "../base/Model";
import { IProductModal } from "../../types";
import { IProduct, IOrderData } from "../../types";

export class ProductModel extends Model<IProductModal> {
  items: IProduct[] 
  // basket: IProduct [] 
  order: IOrderData 

  // Добавление массива карточек 
  addproducts(cards: IProduct[]) {
    this.items = cards
    this.events.emit('items:changed')
  }
  // Метод для получения количества товаров в корзине
  getBasketAmount(): number {
    return this.order.items.length
  }
  //Добавление товара(карточки) в корзину
  addToBasket(card: IProduct): void {
    this.order.items.push(card)
  }
  //Удаление товара с корзины
  removeFromBasket(id:string): void {
    this.order.items = this.order.items.filter(item => item.id !== id)
  }
 //Метод для полной очистки корзины
  clearBasket(): void {
    this.order.items = []
  }
  //Общая сумма(стоимость) товаров в корзине
  getBasketPrice() {
    this.order.items.reduce((sum, next) => sum + next.price, 0)
  }
  //Метод для получения списка ID товаров в корзине
  getItems() {
  return this.order.items.map(item => item.id)
  }
  //Метод для заполнения полей email, phone, address, payment
  addOrderField(field: keyof IOrderData, value: string): void {
    this.order[field] = value
  }
  //Валидация форм для окошка "контакты"
  validateContacts(): boolean {

  }
  //Валидация форм для окошка "заказ"
  validateOrder(): boolean {

  }
  //Очистка данных покупателя
  cleanOrder(): void {
    this.order.address = ''
    this.order.email = ''
    this.order.phone = ''
  }
  //Метод для проверки наличия товара в корзине
  isItem(): void {

  }
}