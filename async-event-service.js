const UserCollection = [];
const ProductCollection = [];
const OrderCollection = [];

const UCotn = [];
const PrdCotn = [];
const OrdCotn = [];

class User {
  constructor(id, name, email) {
    this.id = id;
    this.name = name;
    this.email = email;
  }
}

class Product {
  constructor(id, name, image, price) {
    this.id = id;
    this.name = name;
    this.image = image;
    this.price = price;
  }
}

class Order {
  constructor(id, user_id, product_id, quantity) {
    this.id = id;
    this.user_id = user_id;
    this.product_id = product_id;
    this.quantity = quantity;
  }
}

const eventBus = (type, data) => {
  switch (type) {
    case "USER":
      // Here will be different consumer function that will get notify as soon as createUser emmit the event
      UCotn.push(data);
      break;
    case "PRODUCT":
      PrdCotn.push(data);
      break;
    case "ORDER":
      const userIdx = UCotn.findIndex((u) => u.user_id === data.user_id);
      const productIdx = PrdCotn.findIndex(
        (p) => p.product_id === data.product_id
      );
      if (userIdx === -1 || productIdx === -1) {
        console.log(
          "Abort Operation, In realtime this is simple not possible that user or product will be missing"
        );
      } else {
        const user = UCotn[userIdx];
        user.products.push(data.product_id);
        UCotn[userIdx] = user;
      }
      break;
    default:
      console.log("Invalid subscription");
  }
};

const createUserService = (name, email) => {
  return new Promise((resolve) => {
    const id = Date.now();
    const user = new User(id, name, email);
    UserCollection.push(user);
    eventBus("USER", { user_id: id, products: [] });
    resolve(user);
  });
};

const createProductService = (name, price, image) => {
  return new Promise((resolve) => {
    const id = Date.now();
    const product = new Product(id, name, image, price);
    ProductCollection.push(product);
    eventBus("PRODUCT", { product_id: id, name, image });
    resolve(product);
  });
};

const createOrderService = (user_id, product_id, quantity) => {
  return new Promise((resolve) => {
    const id = Date.now();
    const order = new Order(id, user_id, product_id, quantity);
    OrderCollection.push(order);

    eventBus("ORDER", { user_id, product_id });
    resolve(order);
  });
};

const getOrderedProductDetails = (user_id) => {
  return new Promise((resolve, reject) => {
    const userIndx = UCotn.findIndex((u) => u.user_id === user_id);
    if (userIndx === -1) {
      reject({ error: "Not exist" });
    } else {
      const user = UCotn[userIndx];
      const response = {
        user_id,
        products: [],
      };
      for (const prod_id of user.products) {
        const product = PrdCotn.find((el) => el.product_id === prod_id);
        if (product) {
          response.products.push(JSON.stringify(product));
        }
      }
      resolve(response);
    }
  });
};

const testSystem = async () => {
  const user = await createUserService("Mars", "mars@gmail.com");
  const product = await createProductService("Laptop", 40000, "laptop.jpg");
  const product2 = await createProductService("keyboard", 1200, "keyboard.jpg");
  const order = await createOrderService(user.id, product.id, 2);
  const order2 = await createOrderService(user.id, product2.id, 2);
  const info = await getOrderedProductDetails(user.id);
  console.log({ user, product, order, order2 });
  console.log({ info });
};

testSystem();
