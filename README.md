# Colossus Test

Welcome to the Colossus Front-End test!
Please read carefully all the README before starting the test.

Good luck.

## Important!!

* Fork this repository and work on your fork. Do not clone this repository directly as you won't have push permissions.
* Commit and push as often as possible while you work.
* This test should take up to 2 hours. We'll check what is pushed in your forked repository after that time.
* If you need more time to make additions after the 2 hours, you can do that but it's really important that you commit and push what you've done by the end of the first 2 hours.
* This repository has been setup to give you a starting point for an Angular 4.x application. You're free to convert it into different version if you preferred (always 2+).

## Task

Your task is to create a shopping cart.

Display the following information:
* List of items
  - Image
  - Label
  - Reference
  - Cost
* Description of item
  - Image
  - Label
  - Reference
  - Cost
  - Brand
  - Model
  - Description
  - Items available
- Cart (list of items selected)
  - Items selected
    - Image
    - Label
    - Cost
    - Quantity of item
  - Total cost
  - Total items

Create the following pages:
* `/items`
* `/items/:ref`
* `/checkout`

Implement the following functionality:
* View a list of items
* View full description of individual item
* Add item to cart
* Remove item from cart
* Increase/Decrease quantity of item in the cart
* Display total cost & total number of items
* Delete All items
* Purchase items / Checkout

## Environment Setup

### Install global packages

> Install [Node](https://nodejs.org/en/download/)


> Install [Angular CLI](https://cli.angular.io/) as global package
>
> `npm install -g @angular/cli`


> Install local packages
>
> `npm install`

---

### Start Development

> Run Local Server
`npm start`

> Run Unit Test
`npm test`

> Run End to End Test
`npm run e2e`

---

## API

Get and send all information via the below API endpoints.

> ###### Base API url
> ```
> https://colossustest.herokuapp.com/api
> ```

> List of items
> ```
> GET /items.json
> ```

> Description of item
> ```
> GET /items/[:ref].json
> ```

> Purchase list of items
> ```
> POST /items.json
> ```

> Resquest parameters
> ```
> {
>  total_cost: 10,
>  total_items: 3,
>  items_ref: [10001,10003,10003]
> }
> ```

---


## Styling

Points are awarded for a nice layout.

We don't require any particular format or design, we want you to demonstrate your design skills.

You will be require to use SASS preprocessors. Creating a modular theme with variables will be a plus.

[Bootstrap](http://getbootstrap.com/) framework is already included as a dependency, feel free to use this or instead use your own preferred styles.

[Font Awesome](https://fontawesome.com/icons) Icon library is include and ready to use.

## Tests

As Testing is an important part of the development process, we don't require to write Unit or End to End Tests.
However, will be taken into consideration.
