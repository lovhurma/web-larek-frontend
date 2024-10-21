import { ensureElement } from "../../utils/utils"
import { Component } from "../base/Component"

interface ISuccessAction {
  onClick: () => void
}

interface ISucces {
  totalAmount: number
}

export class Success extends Component<ISucces> {
  protected totalAmount: HTMLElement
  protected closeBut: HTMLButtonElement

  constructor(protected container: HTMLElement, protected actions: ISuccessAction) {
    super(container)

    this.totalAmount = ensureElement<HTMLElement>('.order-success__description', this.container)
    this.closeBut = ensureElement<HTMLButtonElement>('.order-success__close')

    if(actions?.onClick) {
      this.closeBut.addEventListener('click', actions.onClick)
    }
  }

  set total(value: string) {
    this.setText(this.totalAmount, `Списано ${value} синапсов`)
  }

}