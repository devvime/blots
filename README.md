# Blots.js

Simple SPA base configurantion with Page.js, Mustache.js and Jquery.

### Dependencies

- **[Page.js](https://www.npmjs.com/package/page)**
- **[Mustache.js](https://www.npmjs.com/package/mustache)** 
- **[jQuery.js](https://www.npmjs.com/package/jquery)** 

### Install

Installation

```
npm i blots
```

### Config

```js
import blots from 'blots'

const html = document.querySelector('body')
```

Need to add a .htaccess file to the project

```
<IfModule mod_rewrite.c>

  Options +FollowSymLinks
  RewriteEngine On

  RewriteCond %{SCRIPT_FILENAME} !-d
  RewriteCond %{SCRIPT_FILENAME} !-f

  RewriteRule ^.*$ ./index.html

</IfModule>
```

In the html file add the tag <base href="/"> inside the <head>

### Create routes

```js
blots.route('/', (ctx, next) => {
    html.appendChild(blots.createElement(`
        <H1>Hello World!</H1>
    `))
})
```

Using url paramiters

```js
blots.route('/user/:name', (ctx, next) => {
    html.appendChild(blots.createElement(`
        <H1>Hello ${ctx.params.name}!</H1>
    `))
})
```

Change page 404 not found

```js
blots.route('*', function(ctx, next) {
    html.appendChild(blots.createElement(`<p>Page not found!</p>`))
})
```

Init routes

```js
blots.start()
```

Basic consiguration result

```js
import { blots } from 'blots'

const html = document.querySelector('body')

blots.route('/', (ctx, next) => {
    html.appendChild(blots.createElement(`
        <H1>Hello World!</H1>
    `))
})

blots.route('/user/:name', (ctx, next) => {
    html.appendChild(blots.createElement(`
        <H1>Hello ${ctx.params.name}!</H1>
    `))
})

blots.route('*', function(ctx, next) {
    html.appendChild(blots.createElement(`<p>Page not found!</p>`))
})

blots.start()
```

### Using templates and Mustache.js

Create in html file

```html
<template id='my-tpl'>
    <div>
        <p>Name: Steve</p>
        <p>E-mail: steve@mail.com</p>
        <p>Age: 26</p>
    <div>
</template>
```

Render template

```js
const component = document.querySelector('#my-tpl').innerHTML

blots.route('/users', (ctx, next) => {
    blots.draw('#content', component) //blots.draw('target', 'html') #target = '.class' || '#id' || 'tag'
})
```

Send json data

```js
const component = document.querySelector('#my-tpl').innerHTML

blots.route('/users', (ctx, next) => {
    blots.draw('#content', component, {
        name: 'Steve',
        email: 'steve@mail.com',
        age: 26
    })
})
```

Get json data in html file

```html
<template id='my-tpl'>
    <div>
        <p>Name: {{ name }}</p>
        <p>E-mail: {{ email }}</p>
        <p>Age: {{ age }}</p>
    <div>
</template>
```

List array and objects

```js
const component = document.querySelector('#my-tpl').innerHTML

blots.route('/users', (ctx, next) => {
    blots.draw('#content', component, {
        users: [{
            name: 'Steve',
            email: 'steve@mail.com',
            age: 26
        },
        {
            name: 'Ana',
            email: 'ana@mail.com',
            age: 22
        },
        {
            name: 'Jorge',
            email: 'jorge@mail.com',
            age: 33
        }]
    })
})
```

Get List array and objects in html file

```html
<template id='my-tpl'>
    {{#users}}
    <div>
        <p>Name: {{ name }}</p>
        <p>E-mail: {{ email }}</p>
        <p>Age: {{ age }}</p>
    <div>
    {{/users}}
</template>
```

### Using classes in routes

```js
import MyClass form 'myClass'

blots.route('/', (ctx, next) => new MyClass.index(ctx, next))
```

