import './scss/styles.scss';
import { EventEmitter } from './components/base/events'
import { API_URL, CDN_URL } from './utils/constants';
import { ProductModel } from './components/common/AppModel';
import { LarekApi } from './components/common/ApiWebLarek';
import { cloneTemplate, ensureElement } from './utils/utils';
import { Page } from './components/common/Page';
import { Modal } from './components/common/Modal';
import { Basket } from './components/common/Basket';
import { Contacts, Order } from './components/common/Order';
import { CardCatalog } from './components/common/Card';

const api = new LarekApi(CDN_URL, API_URL)
const events = new EventEmitter()

// Чтобы мониторить все события, для отладки
events.onAll(({ eventName, data }) => {
  console.log(eventName, data);
})

//Все шаблоны
//'#' вместо '.' потому что в рамзетке id. В темплейты буду вставлять данные из модели
const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog')
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview')
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket')
const modalBasketTmpl = ensureElement<HTMLTemplateElement>('#basket')
const modalOrderTmpl = ensureElement<HTMLTemplateElement>('#order')
const modalContactsTmpl = ensureElement<HTMLTemplateElement>('#contacts')
const modalSuccessTmpl = ensureElement<HTMLTemplateElement>('#success')

// Модель данных приложения 
const model = new ProductModel({}, events)

// Глобальные контейнеры
const page = new Page(document.body, events)
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events)

// Переиспользуемые части интерфейса
const basket = new Basket(cloneTemplate<HTMLTemplateElement>(modalBasketTmpl),events)
const order = new Order(cloneTemplate<HTMLFormElement>(modalOrderTmpl), events)
const contacs = new Contacts(cloneTemplate<HTMLFormElement>(modalContactsTmpl), events)

// Дальше идет бизнес-логика
// Поймали событие, сделали что нужно
console.log( 'Список карточек1', model.getallItems())

//Получаем массив карточек с сервера
api.getItemsList()
  .then(model.addproducts.bind(model))
  .catch(err => {
    console.log(err)
  })

  console.log( 'Список карточек2', model.getallItems())

// Изменились элементы каталога(получены данные)
events.on('items:changed', () => {
  page.catalog = model.getallItems().map((item => {
    const card = new CardCatalog(cloneTemplate(cardCatalogTemplate), {
      onClick: () => events.emit('card:select', item)
    })
    return card.render({
      id: item.id,
      title: item.title,
      price: item.price,
      category: item.category,
      image: item.image
    })
  }))
})
