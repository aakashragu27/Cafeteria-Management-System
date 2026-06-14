import React from "react";
import { useState } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Header from "./Header/Header";
import Landing from "./Home/Landing";
import Menu from "./menu/Menu";
import Footer from "./Footer/Footer";
import Event from "./Events/Event";
import Order from "./Order/OrderNow";


function App() {

  const [cartItems, setCartItems] = useState([]);
  const [orderDetails, setOrderDetails] = useState(null);
  const [orderFormData, setOrderFormData] = useState({
    name: '',
    email: '',
    phone: '',
    option: '',
    date: ''
  });

  const addToCart = (itemName) => {
    setCartItems([...cartItems, itemName]);
  };



  return (
    <HashRouter>
      <Header cartItems={cartItems}></Header>
      <Routes>
        <Route path="/" element={<Landing />}></Route>
        <Route path="/menu" element={<Menu addToCart={addToCart} cartItems={cartItems} setCartItems={setCartItems}/>} />
        <Route path="/events" element={<Event />} />
        <Route path="/order" element={<Order cartItems={cartItems} setCartItems={setCartItems} orderDetails={orderDetails} setOrderDetails={setOrderDetails} orderFormData={orderFormData} setOrderFormData={setOrderFormData} />} />
      </Routes>
      <Footer></Footer>
    </HashRouter>

  );
}

export default App;

// import React, { useState } from "react";
// import Item from "./menu/menuItems/Item";
// import Order from "./Order/OrderNow";
// import { BrowserRouter, Routes, Route, Router } from "react-router-dom";



// function App() {
//   const [cartItems, setCartItems] = useState([]);

//   const items = [
//     {
//       id: 1,
//       name: "Pizza",
//       price: "$10",
//       description: "Delicious pizza with all the toppings.",
//     },
//     {
//       id: 2,
//       name: "Burger",
//       price: "$8",
//       description: "Juicy burger with all the fixings.",
//     },
//     {
//       id: 3,
//       name: "Tacos",
//       price: "$6",
//       description: "Tasty tacos with your choice of meat.",
//     },
//   ];

//   const addToCart = (itemName) => {
//     setCartItems([...cartItems, itemName]);
//   };

//   return (
//      <BrowserRouter>
//      <Routes>
//       <Route path="/" element={items.map((item) => (
//         <Item
//           key={item.id}
//           id={item.id}
//           name={item.name}
//           price={item.price}
//           description={item.description}
//           addToCart={addToCart}
//         />
//       ))}> </Route>
//       <Route path="/cart" element={<Order cartItems={cartItems}/>}></Route>
//      </Routes>
//      </BrowserRouter>
//   );
// }

// export default App;
