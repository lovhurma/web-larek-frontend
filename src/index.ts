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
import { CardCatalog, CardPreview } from './components/common/Card';
import { IProduct } from './types';

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

//Получаем массив карточек с сервера
api.getItemsList()
  .then(model.addproducts.bind(model))
  .catch(err => {
    console.log(err)
  })

// Изменились элементы каталога(получены данные)
//model.getAllItems() возвращает массив элементов, для каждого элемента (товара) из массива, map вызывает функцию, которая создает экземпляр класса CardCatalog. создаётся экземпляр карточки товара с обработчиком событий, который использует метод emit для вызова события card:select с текущим элементом.Результат (массив карточек) присваивается page.catalog, что позволяет обновить представление каталога на странице.
events.on('items:changed', () => {
  page.catalog = model.getallItems().map((item => {
    const card = new CardCatalog(cloneTemplate(cardCatalogTemplate), {
      onClick: () => events.emit('card:selected', item)
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

// Открытие карточки
// Пользователь выбрал карточку — передать данные для превью. Регистрирует событие preview:changed
events.on('card:selected', (item: IProduct) => {
  model.setPreview(item)
})
//Передаю данные в отображение, отрисовываю карточку в модалке
events.on('preview:changed', (item: IProduct) => {
  page.locked = true
  //Создаю шаблон карточки для превью и вешаю слушатель, при нажатии на кнопку, карточка будет добавляться в корзину
  const card = new CardPreview(cloneTemplate(cardPreviewTemplate), {
    onClick: () => events.emit('card:toBasket', item)
  })

  modal.render({
    content: card.render({
      id: item.id,
      title: item.title,
      price: item.price,
      category: item.category,
      image: item.image,
      description: item.description
    })
  })

})

// Добавление товара в корзину
events.on('card:toBasket', (item: IProduct) => {
  model.addToBasket(item)
  page.counter = model.getBasketAmount()
  modal.close()
})
