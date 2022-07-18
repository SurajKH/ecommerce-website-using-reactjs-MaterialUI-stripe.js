import React from "react";
import {Grid} from '@material-ui/core';
import Product from "./Product/Product";
import useStyles from "./styles";


//mock products for our website
// const products=[
//     {id:1,name:"shoes",description:"running shoes",price:"RS 120"},{
//         id:2,name:"macbook",description:"running on macbook",price:'RS 100000'
//     }
// ];

const Products = ({products,onAddToCart}) =>
{
  //  return (<div>Products.jsx</div>);
  const classes=useStyles();
  return(
    <main className={classes.content}>
     <div className={classes.toolbar} />
    <Grid container justify="center" spacing={4}>
    {
        //mapping of each product present in the given array
        //inside Grid Item we tend to consider a single product
        products.map((product) =>
        (
            <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                
                <Product product={product} onAddToCart={onAddToCart}/>
            </Grid>
        )
        )
        } 
    </Grid>
  </main>

  )
  
}
export default Products;