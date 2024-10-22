import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/events";

interface IModal {
  content: HTMLElement
}

export class Modal extends Component<IModal> {
  closeButton: HTMLButtonElement
  _content: HTMLElement

  constructor(protected container: HTMLElement, protected events: IEvents) {
    super(container)

    this.closeButton = ensureElement<HTMLButtonElement>('.modal__close', container)
    this._content = ensureElement<HTMLElement>('.modal__content', container)

  }

  set content(value: HTMLElement) {
    this._content.replaceChildren(value)
  }

  open() {
    this.container.classList.add('modal_active')
    this.events.emit('modal:open')
  }

  close() {
    this.container.classList.remove('modal_active')
    this.content = null
    this.events.emit('modal:close')
  }

  render(data: IModal): HTMLElement {
    super.render(data)
    this.open()
    return this.container
  }
}