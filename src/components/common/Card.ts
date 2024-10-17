import { IProduct } from "../../types";
import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";

interface ICardAction {
  onClick: (event: MouseEvent) => void
}

export interface ICard {
  id: string
  price: number
  title: string
}

//Общий класс, он же будет использоваться для корзины
export class Card extends Component<ICard> {
  _price: HTMLElement
  _title: HTMLElement
  button?: HTMLButtonElement

    constructor(container: HTMLElement, action?: ICardAction) {
    super(container)

    this._price = ensureElement<HTMLElement>('.card__price', this.container)
    this._title = ensureElement<HTMLElement>('.card__title', this.container)
    this.button = container.querySelector('.card__button')

    if(action?.onClick) {
      if(this.button) {
        this.button.addEventListener('click', action.onClick)
      } else {
        container.addEventListener('click', action.onClick)
      }
    }
  }

    set id(value: string) {
    this.container.dataset.id = value
  }

  set price(value: number) {
    this.setText(this._price, value ? `${value} синапсов` : 'Бесценно')
    if(this.button) {
      this.button.disabled = !value
    }
  }

  set title(value: string) {
    this.setText(this._title, value)
  }
}

//Карточка для каталога на главной
export class CardCatalog extends Card {

  _image: HTMLImageElement
  _category: HTMLElement

  constructor(container: HTMLElement, action?: ICardAction) {
    super(container, action)

    this._image = ensureElement<HTMLImageElement>('.card__image', this.container)
    this._category = ensureElement<HTMLElement>('.card__category', this.container)
  }

  set image(value: string) {
    this.setImage(this._image, value, this.title)
  }

  set category(value: string) {
    this.setText(this._category, value)
  }

}

//Карточка для превью
export class CardPreview extends CardCatalog {
  _description: HTMLElement

  constructor(container: HTMLElement, action?: ICardAction) {
    super(container, action)

    this._description = ensureElement<HTMLElement>('.card__text', this.container)
  }

  set description(value: string) {
    this.setText(this._description, value)
  }

}

// export class Card extends Component<IProduct> {
//   _price: HTMLElement
//   _title: HTMLElement
//   _description?: HTMLElement
//   _image?: HTMLImageElement
//   _category?: HTMLElement
//   _button?: HTMLButtonElement

//   constructor(container: HTMLElement, action?: ICardAction) {
//     super(container)

//     this._price = ensureElement<HTMLElement>('.card__price', container)
//     this._title = ensureElement<HTMLElement>('.card__title', container)

//     this._description = container.querySelector('.card__text')
//     this._image = container.querySelector('.card__image')
//     this._category = container.querySelector('.card__category')

//     if(action?.onClick) {
//       if(this._button) {
//         this._button.addEventListener('click', action.onClick)
//       } else {
//         container.addEventListener('click', action.onClick)
//       }
//     }
//   }

//   set id(value: string) {
//     this.container.dataset.id = value
//   }

//   set price(value: number) {
//     this.setText(this._price, value ? `${value} синапсов` : 'Бесценно')
//     if(this._button) {
//       this._button.disabled = !value
//     }
//   }

//   set title(value: string) {
//     this.setText(this._title, value)
//   }

//   set description(value: string) {
//     this.setText(this._description, value)
//   }

//   set image(value: string) {
//     this.setImage(this._image, value, this.title)
//   }

//   set category(value: string) {
//     this.setText(this._category, value)
//   }
// }