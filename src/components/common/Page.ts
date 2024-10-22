import { IProductData } from "../../types";
import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/events";

export class Page extends Component<IProductData> {
  protected  basketCounter: HTMLElement
  protected  basket: HTMLElement
  protected  wrapper: HTMLElement
  protected  productCatalog: HTMLElement

  constructor(container: HTMLElement, protected events: IEvents) {
    super(container)

    this.basketCounter = ensureElement<HTMLElement>('.header__basket-counter')
    this.basket = ensureElement<HTMLElement>('.header__basket')
    this.wrapper = ensureElement<HTMLElement>('.page__wrapper')
    this.productCatalog = ensureElement<HTMLElement>('.gallery')

    this.basket.addEventListener('click', ()=> {
      this.events.emit('basket:open')
    })
  }
  
  set counter(value: number) {
    this.setText(this.basketCounter, value)
  }

  set catalog(items: HTMLElement[]) {
    this.productCatalog.replaceChildren(...items)
  }

  set locked(value: boolean) {
    if(value) {
      this.wrapper.classList.add('page__wrapper_locked')
    } else {
      this.wrapper.classList.remove('page__wrapper_locked')
    }
  }
}