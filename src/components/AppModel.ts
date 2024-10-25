import { Model } from "../components/base/Model";
import { IProductModal, IProduct, IOrderData, FormErrors, PaymentMethod, IOrderResponse } from "../types";

export class ProductModel extends Model<IProductModal> {
protected  items: IProduct[] 
protected  preview: IProduct = null
protected  basket: IProduct[] = []
protected  order: IOrderData = {}
protected  formErrors: FormErrors = {}

  // +Добавление массива карточек 
  addproducts(cards: IProduct[]) {
    this.items = cards
    this.events.emit('items:changed', {items: this.items})
  }
  // Получаю каталог карточек
  getallItems () {
    return this.items
  }
  //+Получаю данные карточки при клике на карточку в каталоге
  setPreview(card: IProduct) {
    this.preview = card
    this.events.emit('preview:changed', this.preview)
  }
  // +Метод для получения количества товаров в корзине
  getBasketAmount(): number {
    return this.basket.length
  }
  //+Добавление товара(карточки) в корзину
  addToBasket(card: IProduct): void {
    console.log('метод вызван')
    this.basket.push(card)
    this.events.emit('basket:changed', this.basket)
  }
  //+Удаление товара с корзины
  removeFromBasket(id:string): void {
    this.basket = this.basket.filter(item => item.id !== id)
    this.events.emit('basket:changed', this.basket)
  }
 //+Метод для полной очистки корзины
  clearBasket(): void {
    this.basket = []
    this.events.emit('basket:changed', this.basket)
  }
  //+Общая сумма(стоимость) товаров в корзине
  getBasketPrice() {
    return this.basket.reduce((sum, next) => sum + next.price, 0)
  }
  //+//+Метод для получения списка ID товаров в корзине
  getBasketId() {
    return this.basket.map(item => item.id)
  }

  getBasket() {
  // return this.basket.map(item => item.id)
  return this.basket
  }

  //Метод для заполнения полей email, phone, address, payment
  addOrderField(field: keyof IOrderData, value: string) {
    this.order[field] = value
    this.validateOrder()

  }
//Полечаю поля с оплатой для презентера(добавть в описание)
  getField() {
    return this.order.payment
  }

  getOrder() {
    return this.order
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
    if(!this.order.email) {
      errors.email = 'Необходимо указать email'
    }
    if(!this.order.phone) {
      errors.phone = 'Необходимо указать номер телефона'
    }
    this.formErrors = errors
    this.events.emit('error:changed', this.formErrors)
    // возвращается логическое значение, которое указывает, есть ли ошибки валидации. Если длина массива ключей объекта errors равна нулю, это означает, что ошибок нет, и метод возвращает true; в противном случае — false.
    return Object.keys(errors).length === 0
  }

  //+Метод для проверки наличия товара в корзине. Метод some перебирает массив basket и проверяет, есть ли хотя бы один элемент, который удовлетворяет условию
  isProductInBasket(product: IProduct): boolean {
    return this.basket.some(item => item.id === product.id)
  }

}