## [Ссылка на диаграмму](https://drive.google.com/file/d/1WXmB3naiiE9HxNZhdMAzrtlU7IhWqUpB/view?usp=sharing)
## [Ссылка на видео](https://www.youtube.com/watch?v=YdYyYMFPa44&t=3s)
  `State` это некая модель описывающая состояние приложения до его изменения пользователем.  
  `Component` - это часть приложения на которой может происходить некое взаимодействие пользователя с интерфейсом и происходить события. Но мы не меняем состояние приложения на прямую, а создаем `Action`. `Action` не взаимодействует ни с чем на прямую, а является лишь объектом и взаимодействует со `store`, в котором и хранится наш `state`. Теперь чтобы что-то изменить в самом шаблоне приложения, нам нужно изменить сам `state` (состояние) в `store`. Но напрямую мы не можем этого делать, поэтому вводится такое понятие как `reducer`. `Reducer` - это всего лишь функция, которая на основе постуившего к ней `action` меняет объект `state`. И уже после изменения нашего `state` в `store` мы перерисовываем наш шаблон компонента. Вызывая функцию `createStore()` мы должны получить объект `store`, который умеет взаимодействовать с данными. Редакс в своем корне реализует паттерн `observer`.
  `Store` имеет 3 метода `dispatch, subscribe, getState`.  
  **`dispatch`** - говорит о том что нужно что-то изменить. Принимает `action` - это обычный объект, у которого одно обязательное поле `type`, в качестве значения которой указывается строка.  
  **`subscribe`** - все слушатели которые слушают этот объект, они должны что-то поменять. Принимет в себя `callback`, то есть функцию которая вызовется когда что-то произойдет. 
  **`getState`** - позволяет получить текущее состояние.  
  Когда в `store` прилетает `action` нужно поменять `state`, делать нам это нужно с помощью `reducers`. `reducers` для каждого компонента свой и его мы принимаем как параметр. `reducers` в свою очередь в качетсве параметров принимет изначальный `state` и `action`. Далее приблизительно обозначена работа `redux`:
```jsx
//// createStore.js
// В КАЧЕСТВЕ ПАРАМЕТРОВ ПОЛУЧАЕМ REDUCERS ДЛЯ ИЗМЕНЕНИЯ STATE
export function createStore(rootReducers, initialState) {
    let state = rootReducers(initialState, {type: '__INIT__'}); // НАЧАЛЬНОЕ СОСТОЯНИЕ
    const subscribers = []; // МАССИВ СЛУШАТЕЛЕЙ

    return {
        // action === {type: 'INCREMENT'}
        dispatch() {
            state = rootReducers(state, action); // ПРИСАИВАЕМ STATE РЕЗУЛЬТАТ ВЫПОЛНЕНИЯ ФУНКЦИИ REDUCERS

            subscribers.forEach(sub => sub()) // УВЕДОМЛЯЕМ ВСЕХ СЛУШАТЕЛЕЙ
        },
        subscriber(callback) {
            subscribers.push(callback);
        },
        getState() {
            return state;
        },
    };
}
//// index.js
const store = createStore(rootReducers, 0); // ВЫЗЫВАЯ STORE НУЖНО ПЕРЕДАТЬ ЕМУ REDUCERS И ИЗНАЧАЛЬНЫЙ STATE
```
> /redux/rootReducers.js  

  Для описания `reducers` необходимо создать новый файл и экспортировать функцию, которая принимает в себя `state` и `action`. Т.к. `action` принимает в себя свойство `type`, то мы можем по нему создать конструкцию `if else` для понимания того как нам изменить `state`. Если ни одно из условий не будет выполнено то мы просто вернем изначальное состояние.
```jsx
// index.js
addBtn.addEventListener("click", () => {
  store.dispatch(
    {
      type: 'INCREMENT'
    }
  )
});
```
  Т.к. `reducers` может быть много, а фукнция `createStore` принимает лишь один `reducer`, то следует воспользоваться методом в `redux`, который называется `combineReducers`. Он принимает в себя объект `reducers`.
```jsx
  export const rootReducer = combineReducers({
    counter: counterReducers,
    theme: themeReducers
  })
```
