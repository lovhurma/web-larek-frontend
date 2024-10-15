import './scss/styles.scss';
import { EventEmitter } from './components/base/events'
import { ProductModel } from './components/common/AppModel';

const event = new EventEmitter()

const model = new ProductModel({}, event)

// const array1 = 
//     {
//       "id": "854cef69-976d-4c2a-a18c-2aa45046c390", 
//       "description": "Если планируете решать задачи в тренажёре, берите два.",
//       "image": "/5_Dots.svg", 
//       "title": "+1 час в сутках",
//       "category": "софт-скил",
//       "price": 750 
//       }
// const array2 = 
//     {
//       "id": "854cef69-976d-4c2a-a18c-2aa45046c390", 
//       "description": "Если планируете решать задачи в тренажёре, берите два.",
//       "image": "/5_Dots.svg", 
//       "title": "+1 час в сутках",
//       "category": "софт-скил",
//       "price": 750 
//       }
// const test = [array1, array2]

const test = [
  {
      "id": "854cef69-976d-4c2a-a18c-2aa45046c390", 
      "description": "Если планируете решать задачи в тренажёре, берите два.",
      "image": "/5_Dots.svg", 
      "title": "+1 час в сутках",
      "category": "софт-скил",
      "price": 750 
      }, 
      {
        "id": "854cef69-976d-4c2a-a18c-2aa45046c390", 
        "description": "Если планируете решать задачи в тренажёре, берите два.",
        "image": "/5_Dots.svg", 
        "title": "+1 час в сутках",
        "category": "софт-скил",
        "price": 750 
        }, 
]

const baskettest1 = {
  "id": "854cef69-976d-4c2a-a18c-2aa45046c390", 
  "description": "Если планируете решать задачи в тренажёре, берите два.",
  "image": "/5_Dots.svg", 
  "title": "+1 час в сутках",
  "category": "софт-скил",
  "price": 750 
  }

  const baskettest2 = {
    "id": "854cef69-976d-4c2a-a18c-2aa45046c390", 
    "description": "Если планируете решать задачи в тренажёре, берите два.",
    "image": "/5_Dots.svg", 
    "title": "+1 час в сутках",
    "category": "софт-скил",
    "price": 750 
    }

  model.addproducts(test)
  //Проверка работы метода добавление карточек каталога
  console.log(model.items)
  //Превью
  model.setPreview(baskettest1)
  console.log(model.preview)
  //Добавление в корзину
  model.addToBasket(baskettest2)
  model.addToBasket(baskettest1)
  console.log(model.basket)
  //Общее кол-во товара
  console.log(model.getBasketAmount())
  //Стоимость товаров  - не работает
  console.log(model.getBasketPrice())
  //Спсиок id товаров в корзине
  console.log(model.getItems())  
  //Есть ли товар в корзине
  console.log(model.isProductInBasket(baskettest2))
  //Удаление товара
  model.removeFromBasket("854cef69-976d-4c2a-a18c-2aa45046c390")
  console.log(model.isProductInBasket(baskettest2))
  //Полная очистка корзины
  model.clearBasket()
  console.log(model.getBasketAmount())

  //Тест валидатора
  console.log('Testing validateOrder...');
  const isValid = model.validateOrder();
  console.log('Is order valid?', isValid); // Должно отражать ошибку

  // Тест форм
  console.log('Initial Order:', model.order);
  model.addOrderField('address', '123 Main St');
  console.log('Updated Order:', model.order); // Проверка текущего состояния



