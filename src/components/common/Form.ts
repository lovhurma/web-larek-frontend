import { IForm } from "../../types";
import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/events";


export class Form<T> extends Component<IForm> {
  protected submitButton: HTMLButtonElement
  protected errorsElements: HTMLElement

  constructor(protected container: HTMLFormElement, protected events: IEvents) {
    super(container)

    this.submitButton = ensureElement<HTMLButtonElement>('button[type=submit]', this.container)
    this.errorsElements = ensureElement<HTMLElement>('.form__errors', this.container)

    this.container.addEventListener('input', (e: Event) =>{
//  e.target ссылается на элемент, на котором произошло событие. Поскольку это событие input, целевым элементом будет то поле ввода, в которое пользователь ввел данные.
// С помощью as HTMLInputElement мы сообщаем TypeScript, что этот элемент следует рассматривать как экземпляр HTMLInputElement, что позволяет получить доступ к его свойствам, таким как value и name.
      const target = e.target as HTMLInputElement
      //Почему keof T?
      const field = target.name as keyof T
      //Извлекаем текущее знаение value
      const value = target.value
      this.onInputChange(field, value)
    })

    this.container.addEventListener('submit', (e: Event) =>{
      e.preventDefault()
      this.events.emit(`${this.container.name}:submit`)
    })
  }

  //Вызывается при изменении значения в поле, передавая информацию о поле и новом значении.
  protected onInputChange(field: keyof T, value: string) {
    //В брокeре событий будут соотвутствующие слушатели, пример: order.adress:change
    this.events.emit('orderInput:change', {
      field, 
      value
    })
  }
  //Оператор ! инвертирует значение value. Если value равно true, !value будет false, и кнопка будет активно доступной. И наоборот
  set valid(value: boolean) {
    this.submitButton.disabled = !value
  }

  set errors(value: string) {
    this.setText(this.errorsElements, value)
  }
// Partial<T> позволяет использовать часть свойств типа T. Это означает, что любые свойства данного типа могут быть опциональными.
// IFormS - это интерфейс, который описывает состояние формы, включая свойства valid, errors. Объединение с помощью & требует наличия всех свойств из IForm. Вопрос, почему нельзя просто сделать state: IForm
  render(state: Partial<T> & IForm) {
    //Здесь мы извлекаем свойства valid и errors из объекта state, а все остальные свойства помещаем в объект inputs
    const { valid, errors, ...inputs } = state
    super.render({valid, errors})
    // копирует значения функций, перечисленных в inputs, в объект текущего экземпляра this. Это позволяет динамически обновлять свойства экземпляра класса, исходя из переданного состояния. Каждый раз, когда у нас есть новые данные для формы (например, значения полей ввода), они могут быть представлены в объекте inputs.?????????
    Object.assign(this, inputs)
    return this.container
  }
  
}