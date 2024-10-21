import { IOrderData } from "../../types";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/events";
import { Form } from "./Form";


export class Order extends Form<IOrderData> {
protected  buttonСash: HTMLButtonElement
protected  buttonСard: HTMLButtonElement


  constructor(container: HTMLFormElement, events: IEvents) {
    super(container, events)

    this.buttonСash = ensureElement<HTMLButtonElement>('.button_alt[name=cash]', container)
    this.buttonСard = ensureElement<HTMLButtonElement>('.button_alt[name=rard]', container)

    this.buttonСash.addEventListener('click', () => {
      this.payment = 'cash'
      //payment для брокера
      this.onInputChange('payment', 'cash')
    })

    this.buttonСard.addEventListener('click', () => {
      this.payment = 'card'
      this.onInputChange('payment', 'card')
    })
  }

  set payment(value: string) {
    // Метод toggle() принимает только один класс для переключения. Опционально вторым аргументом можно передать boolean-значение: метод будет работать как add(), если передать true, и как remove(), если передать false.
    this.buttonСash.classList.toggle('button_alt-active', value === 'cash')
    this.buttonСard.classList.toggle('button_alt-active', value === 'card')    
  }

  set address(value: string) {
  (this.container.elements.namedItem('address') as HTMLInputElement).value = value
  }
}

export class Contacts extends Form<IOrderData> {

  constructor(container: HTMLFormElement, events: IEvents) {
    super(container, events)
  }

  set email(value: string) {
    (this.container.elements.namedItem('email') as HTMLInputElement).value = value
  }

  set phone(value: string) {
    (this.container.elements.namedItem('phone') as HTMLInputElement).value = value
  }
}