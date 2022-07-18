import React, { useEffect, useState } from "react";
import { PayPalButtons,PayPalScriptProvider } from "@paypal/react-paypal-js";
import Products from "./components/Products/Products";
import Navbar from "./components/Navbar/Navbar";
import { commerce } from "./lib/commerce";
import Cart from "./components/Cart/Cart";
import { BrowserRouter as Router} from "react-router-dom";
import { Routes ,Route } from 'react-router-dom';
import Checkout from "./components/CheckoutForm/Checkout/Checkout";

//we will ve switching between the routes depending upon on our needs.
//for backend development purposes.

//creation of App Component


const App = () =>
{
   const [products,setProducts]=useState([]);
   const [cart,setCart]=useState([]);
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

   const fetchProducts=async() =>
   {
      const {data}=await commerce.products.list();
      setProducts(data);
   }

   const fetchCart = async() =>
   {
      setCart(await commerce.cart.retrieve())
   }
   
   const handleAddtoCart = async(productId,quantity) =>
   {
       const item=await commerce.cart.add(productId,quantity);
       setCart(item.cart);
   }
   //now we need to handle operations on cart items
   const handleUpdateCartQty = async(productId,quantity) =>
   {
      const {cart} = await commerce.cart.update(productId,{quantity});
      setCart(cart);
   }
   const handleRemoveFromCart = async(productId) =>
   {
      const {cart} = await commerce.cart.remove(productId);
      setCart(cart);
   }
   const handleEmptyCart = async() =>
   {
      const {cart} = await commerce.cart.empty();
      setCart(cart);
   }

   const refreshCart = async () => {
      const newCart = await commerce.cart.refresh();
  
      setCart(newCart);
    };
  
    const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
      try {
        const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);
  
        setOrder(incomingOrder);
  
        refreshCart();
      } catch (error) {
        setErrorMessage(error.data.error.message);
      }
    };
   
   useEffect(() =>
   {
      fetchProducts();
      fetchCart();
   },[]);



   
   //console.log(products);
   //console.log(cart);

   //while returning we basically consider the props to basically interact with Cart Component
   //<Route path='/welcome' element={<Home/>} />
   return (

      <Router>
         <div>
       <Navbar totalItems={cart.total_items} />
       <Routes>
       <Route exact path="/" element={<Products products={products} onAddToCart={handleAddtoCart} />}>
       
       </Route>
        <Route exact path="/cart" 
        element={<Cart  
        cart={cart}
        handleUpdateCartQty={handleUpdateCartQty}
        handleRemoveFromCart={handleRemoveFromCart}
        handleEmptyCart={handleEmptyCart}
        
         />} >
        
        </Route>
       <Route exact path="/checkout" element={<Checkout cart={cart} order={order} onCaptureCheckout={handleCaptureCheckout} error={errorMessage} />}>

       </Route>
       </Routes>
       
    </div>
      </Router>
    
   );
}
//export the component over here
export default App;