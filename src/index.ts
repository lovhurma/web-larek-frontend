import './scss/styles.scss';
import { EventEmitter } from './components/base/events'
import { API_URL, CDN_URL } from './utils/constants';
import { ProductModel } from './components/AppModel';
import { LarekApi } from './components/ApiWebLarek';
import { cloneTemplate, ensureElement } from './utils/utils';
import { Page } from './components/Page';
import { Modal } from './components/common/Modal';
import { Basket } from './components/common/Basket';
import { Contacts, Order } from './components/Order';
import { Card, CardCatalog, CardPreview } from './components/Card';
import { IOrderData, IOrderResponse, IProduct } from './types';
import { ISucces, Success } from './components/common/Success';

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
const contacts = new Contacts(cloneTemplate<HTMLFormElement>(modalContactsTmpl), events)

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
  // page.locked = true
  // Проверяем, находится ли продукт в корзине
  const isInBasket = model.isProductInBasket(item);
  //Создаю шаблон карточки для превью и вешаю слушатель, при нажатии на кнопку, карточка будет добавляться/удаляться
  const card = new CardPreview(cloneTemplate(cardPreviewTemplate), {
    onClick: () => {
      if (isInBasket) {
          // если в корзине, удаляем из корзины
          events.emit('basket:remove', item);
      } else {
          // если не в корзине, добавляем в корзину
          events.emit('card:toBasket', item);
      }
  }
  })

  modal.render({
    content: card.render({
      id: item.id,
      title: item.title,
      price: item.price,
      category: item.category,
      image: item.image,
      description: item.description,
      button: isInBasket ? 'Удалить из корзины' : 'В корзину',
    })
  })

})

// Добавление товара в корзину
events.on('card:toBasket', (item: IProduct) => {
  model.addToBasket(item)
  page.counter = model.getBasketAmount()
  modal.close()
})

//Открытие корзины
events.on('basket:open', () => {
  //Создаю кароточку и рендерю
  //создаю переменную для счетчика
  let i = 1
  const basketItems = model.getBasket().map((item) => {
    const card = new Card(cloneTemplate(cardBasketTemplate), {
      onClick: () => events.emit('basket:remove', item)
    })
    return card.render({
      price: item.price,
      title: item.title,
      //каждый номер карточки будет увеличен на 1
      index: i++
    })
    })
    //Отрисовываю модалку
    modal.render({
      content: basket.render({
        list: basketItems,
        total: model.getBasketPrice()
      }
      )
    })
  })


// Удаление с корзины
events.on('basket:remove', (item: IProduct) => {
  model.removeFromBasket(item.id)
  page.counter = model.getBasketAmount()
  let i = 1
  const basketItems = model.getBasket().map((item) => {
    const card = new Card(cloneTemplate(cardBasketTemplate), {
      onClick: () => events.emit('basket:remove', item)
    })
    return card.render({
      price: item.price,
      title: item.title,
      //каждый номер карточки будет увеличен на 1
      index: i++
    })
    })
    //Отрисовываю модалку
    modal.render({
      content: basket.render({
        list: basketItems,
        total: model.getBasketPrice()
      }
      )
    })
})

//Оформление заказа
events.on('basket:order', () => {
  modal.render({
    content: order.render({
      valid: false,
      errors: [],
      address: '',
      payment: null
    })
  })
})

// Изменилось состояние валидации формы(вызывается при звполнении формы)???
events.on('error:changed', (errors: Partial<IOrderData>) => {
  const { email, phone, address, payment } = errors
  order.valid = !payment && !address
  contacts.valid = !email && !phone
  order.errors = Object.values({address, payment}).filter(i => !!i).join('; ');
  contacts.errors = Object.values({phone, email}).filter(i => !!i).join('; ')
})

// Изменились введенные данные
events.on('orderInput:change', (data: { field: keyof IOrderData, value: string }) => {
  model.addOrderField(data.field, data.value)
  if(data.field === 'payment') {
    order.payment = model.getField()
  }
})

//Заполнение контактов
events.on('order:submit', () => {
  modal.render({
    content: contacts.render(
      {
        valid: false,
        errors: []
      }
    ),
  })
})

events.on('contacts:submit', () => {
  // Получаем данные о заказе
  const order = model.getOrder()
  // Обновляем сумму (total)
  order.total = model.getBasketPrice()
  // Получаем массив id из корзины
  const items = model.getBasketId()
  // Формируем итоговый объект для отправки на сервер
  const payload: IOrderResponse = {
  payment: order.payment,
  email: order.email,
  phone: order.phone,
  address: order.address,
  total: order.total,
  items: items
}
  api.postOrder(payload)
  .then((result) => {
    console.log(payload)
    events.emit('order:success', result)
  })
})

events.on('order:success', (result: ISucces) => {
  const success = new Success(cloneTemplate(modalSuccessTmpl), {
    onClick: () => {
      modal.close()
      model.clearBasket()
      page.counter = model.getBasketAmount()
      order.disableButtons()
    }
  })

  modal.render({
    content: success.render({
      total: model.getBasketPrice()
    })
  })
})

// Блокирую прокрутку страницы если открыта модалка
events.on('modal:open', () => {
  page.locked = true;
});

// Разблокирую прокрутку страницы если закрыта модалка
events.on('modal:close', () => {
  page.locked = false;
});


