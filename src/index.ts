import './scss/styles.scss';
import { EventEmitter } from './components/base/events'
import { ProductModel } from './components/common/AppModel';

const event = new EventEmitter()

const model = new ProductModel({}, event)


