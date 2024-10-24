import { IOrderData } from "../types";
import { ensureElement } from "../utils/utils";
import { IEvents } from "./base/events";
import { Form } from "./common/Form";


export class Order extends Form<IOrderData> {
protected  buttonСash: HTMLButtonElement
protected  buttonСard: HTMLButtonElement


  constructor(container: HTMLFormElement, events: IEvents) {
    super(container, events)

    this.buttonСash = ensureElement<HTMLButtonElement>('.button_alt[name=cash]', container)
    this.buttonСard = ensureElement<HTMLButtonElement>('.button_alt[name=card]', container)

    this.buttonСash.addEventListener('click', () => {
      this.onInputChange('payment', 'cash')
    })

    this.buttonСard.addEventListener('click', () => {
      this.onInputChange('payment', 'card')
    })
  }

  set payment(value: string) {
    // Метод toggle() принимает только один класс для переключения. Опционально вторым аргументом можно передать boolean-значение: метод будет работать как add(), если передать true, и как remove(), если передать false.
    this.buttonСash.classList.toggle('button_alt-active', value === 'cash')
    this.buttonСard.classList.toggle('button_alt-active', value === 'card')    
  }

  disableButtons() {
    this.buttonСard.classList.remove('button_alt-active')
    this.buttonСash.classList.remove('button_alt-active')
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