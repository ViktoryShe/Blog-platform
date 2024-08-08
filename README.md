Ссылка на сайт https://blogplatform-two.vercel.app/
# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

#1 - Начало
Наша задача в этом курсе - реализовать примитивную блог-платформу. В ходе выполения познакомимся с аутентификацией и валидацией форм.
Проект реализуем целиком с использованием react hooks.
Корневой URL для API: https://blog.kata.academy/api/
1. Реализуйте страницу со списком статей
2. Сделайте пагинацию. Пагинация статей должна быть на стороне сервера - при смене страницы отправляем новый запрос. Не забываем индикаторы загрузки и обработку ошибок.
3. Реализуйте страницу одной статьи. Обратите внимание, что полный текст статьи - это Markdown разметка, найдите подходящий модуль для вывода содержимого на экран.
Используйте react-router для навигации по страницам.
Страницы:
/ и /articles - список всех статей. При клике на заголовок - переход на страницу статьи. Кнопка лайка не активна, т.к. мы не авторизованы.
/articles/{slug} - Просмотр статьи с полным текстом.

#2 - Аутентификация
1. Создайте страницы входа и регистрации и настройте роутинг (используем react-router v5)
2. Сделайте форму регистрации
3. Сделайте форму логина
4. Сделайте отображение данных пользователя в шапке
5. Настройте клиентскую валидацию и обработку ошибок сервера (см ниже подробности)
6. Настройте, чтобы при перезагрузке страницы залогиненный пользователь сохранялся, сделайте функционал Log Out
7. Реализуйте страницу редактирования профиля (переход на эту страницу - по клику на имени/аватаре пользователя в шапке.
Страницы:
/sign-in - Страница входа.
/sign-up - Страница регистрации.
/profile - Страница редактирования информации пользователя (см. метод Update User). Переход на эту страницу происходит по клике на имени-аватарке в шапке.

Валидация
Для клиентской валидации форм воспользуемся библиотекой React Hook Form.
Регистрация (все поля обязательны):
email должен быть корректным почтовым адресом
username должен быть от 3 до 20 символов (включительно)
password должен быть от 6 до 40 символов (включительно)
password и repeat password должны совпадать
галочка согласия с обработкой персональных данных должна быть отмечена

Логин:
email должен быть не пустой, должен быть корректным почтовым адресом
password должен быть не пустой

Редактирование профиля:
username не должен быть пустым
email должен быть корректным почтовым адресом, не должен быть пустым
new password должен быть от 6 до 40 символом
avatar image должен быть корректным url
Серверные ошибки должны нормально подсвечивать соответствующие поля.

#3 - Статьи
1. Добавьте страницу создания статьи. Правила валидации - title, short description и text обязательны для заполнения.
2. Добавьте страницу редактирования статьи. Реиспользуйте форму, использующуюся при создании.
3. Добавьте кнопки редактирования/удаления на странице статьи. Сделайте подтверждение на действие удаления.
Страницы:
/new-article - Страница создания статьи. При переходе по этой ссылке без аутентификации - перебрасывает на страницу логина (см. паттерн Private Route)
/articles/{slug}/edit - Страница редактирования статьи.
На странице отображения статьи добавляем кнопки Edit и Delete. По нажатию на Edit происходит переход на страницу редактирования, по Delete - открытие модалки подтверждения и запрос на удаление статьи.

#4 - Завершение
1. Добавьте функционал лайков
2. Проверяем все на работоспособность и отсутствие ошибок
3. Проверяем отсутствие ошибок линтера
4. Заливаем на Vercel
5. Ссылку размещаем в README

Добавить
1.При регистрации пользователя и совпадении почты или логина должно появляться оповещение и не должно перебрасывать на стартовую страницу.
2.Аналогично с авторизацией.
3.В случае если на аватарку попадает битая ссылка, то должна появляться картинка-заглушка.
4.Path роутов нужно выносить в константы, это позволяет избегать случайных опечаток при использовании их в линках.
5.https://github.com/ViktoryShe/Blog-platform/blob/main/src/components/Card/Card.jsx#L25C1-L38C4 не используй функции обертки для создания верстки внутри компонентов. Либо переносишь сразу в return либо в отдельные компоненты. Условный рендеринг организуется там же в return.