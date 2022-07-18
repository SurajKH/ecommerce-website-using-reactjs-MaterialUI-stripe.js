import React from "react";
import {Container,Typography,Button} from '@material-ui/core';
import {Grid} from '@material-ui/core';
import {Link} from 'react-router-dom';
import useStyles from './styles';
import CartItem from "./CardItem/CartItem";


const Cart= ({cart,handleUpdateCartQty,
  handleRemoveFromCart,
  handleEmptyCart}) =>
{
    const classes=useStyles();
    //const isEmpty = !cart.line_items.length;
    if(!cart.line_items)
    return  '...loading';
    const EmptyCart=() =>
    (
     //we basically tend to inform the user that shoppingcart is empty over here
    <Typography variant="subtitle1" paddingtop="5">
        You have no items in your shopping cart
        {/*explicitly consider going back to the home page to add the items into the cart */}
        <Link to="/" className={classes.link}><br/>
        start adding some items!!!</Link>
    </Typography>
    )

    const FilledCart=() =>
    (//render all the items over here
    <>
        <Grid container spacing={3}>
          {cart.line_items.map((item) =>
          (
             <Grid item xs={12} sm={4} key={item.id}>
                {/* <div>{item.name}</div> */}
                <CartItem item={item} onUpdateCartQty={handleUpdateCartQty} onRemoveFromCart={handleRemoveFromCart}/>
             </Grid> 
          ))}
        </Grid>

        <div className={classes.cardDetails}>
          <Typography variant="h4">
            Subtotal:{cart.subtotal.formatted_with_symbol}
          </Typography>
          <div>
            <Button className={classes.emptyButton} size="large" type="button" variant="contained" color="secondary" onClick={handleEmptyCart}>Empty Cart</Button>
            <Button component={Link} to="/checkout" className={classes.checkoutButton} size="large" type="button" variant="contained" color="primary" >CheckOut</Button>
          </div>
        </div>
    </>

    )
    if(!cart.line_items)
      return "loading....."
    //we will be considering the Empty variable to make sure that whether the cart is empty or not.
    return (
        <Container>
            <div className={classes.toolbar} />
            <Typography className={classes.title} variant="h2" gutterBottom>
                Your Shopping Cart
                { !cart.line_items.length ? <EmptyCart /> : <FilledCart /> }
            </Typography>
        </Container>


    )
}

export default Cart;
