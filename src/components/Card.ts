import { IProduct } from "../types";
import { ensureElement } from "../utils/utils";
import { Component } from "../components/base/Component";

interface ICardAction {
  onClick: (event: MouseEvent) => void
}

//Общий класс, он же будет использоваться для корзины
export class Card extends Component<IProduct> {
  protected _price: HTMLElement
  protected _title: HTMLElement
  protected _button?: HTMLButtonElement
  protected _index?: HTMLElement;

    constructor(container: HTMLElement, action?: ICardAction) {
    super(container)

    this._price = ensureElement<HTMLElement>('.card__price', container)
    this._title = ensureElement<HTMLElement>('.card__title', container)
    //Через ensureElement<HTMLElement> index не работал, почему?
    this._index = container.querySelector('.basket__item-index')
    this._button = container.querySelector('.card__button')


    if(action?.onClick) {
      if(this._button) {
        this._button.addEventListener('click', action.onClick)
      } else {
        container.addEventListener('click', action.onClick)
      }
    }
  }

  set button (label: string) {
    if (this._button) {
        this._button.textContent = label
    }
  }

  set index(value: number) {
    this.setText(this._index, value);
  }

    set id(value: string) {
    this.container.dataset.id = value
  }

  set price(value: number) {
    this.setText(this._price, value ? `${value} синапсов` : 'Бесценно')
    if(this._button) {
      this._button.disabled = !value
    }
  }

  set title(value: string) {
    this.setText(this._title, value)
  }
}

//Карточка для каталога на главной
export class CardCatalog extends Card {

  protected _image: HTMLImageElement
  protected _category: HTMLElement
  protected _categoryColor = <Record<string, string>> {
    "софт-скил": "soft",
    "другое": "other",
    "дополнительное": "additional",
    "кнопка": "button",
    "хард-скил": "hard"
  }

  constructor(container: HTMLElement, action?: ICardAction) {
    super(container, action)

    this._image = ensureElement<HTMLImageElement>('.card__image', container)
    this._category = ensureElement<HTMLElement>('.card__category', container)
  }


  set image(value: string) {
    this.setImage(this._image, value, this.title)
  }

  set category(value: string) {
    this.setText(this._category, value)
    this._category.className = `card__category card__category_${this._categoryColor[value]}`
  }

}

//Карточка для превью
export class CardPreview extends CardCatalog {
  _description: HTMLElement

  constructor(container: HTMLElement, action?: ICardAction) {
    super(container, action)

    this._description = ensureElement<HTMLElement>('.card__text', container)
  }

  set description(value: string) {
    this.setText(this._description, value)
  }

}
