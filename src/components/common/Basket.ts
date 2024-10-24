import { IOrder } from "../../types";
import { createElement, ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/events";


export class Basket extends Component<IOrder> {
  protected productListElement: HTMLElement
  protected totalamount: HTMLElement
  protected button: HTMLButtonElement

  constructor(container: HTMLElement, protected events: IEvents) {
    super(container)

    this.productListElement = ensureElement<HTMLElement>('.basket__list', this.container)
    this.totalamount = container.querySelector('.basket__price')
    this.button = container.querySelector('.basket__button')

    if(this.button) {
      this.button.addEventListener('click', () =>{
        events.emit('basket:order')
      })
    }

    this.list = [];
  }

  set list(items: HTMLElement[]) {
    if(items.length) {
      this.productListElement.replaceChildren(...items)
      this.button.removeAttribute('disabled')
    } else {
      this.productListElement.replaceChildren(createElement<HTMLElement>('p', {textContent: 'Корзина пуста'}))
      this.button.setAttribute('disabled', 'disabled')
    }
  }

  set total(value: number) {
    this.setText(this.totalamount, `${value} синапсов`)
  }
}