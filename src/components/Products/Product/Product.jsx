import React from "react";
import {Card,CardMedia,CardContent,CardActions,Typography,IconButton} from "@material-ui/core";
import {AddShoppingCart} from "@material-ui/icons";
import useStyles from './styles';

//now we need to consider dynamically rendered products 
const Product = ({product,onAddToCart}) =>
{
    //react hooks
    const classes=useStyles();
    console.log(product);
    // return (<div>test</div>)
    return (
        <Card className={classes.root}>
          <CardMedia className={classes.media} image={product.image.url} title={product.name}/>
          <CardContent>
            <div className={classes.cardContent}>
                <Typography variant="h6" gutterBottom>
                {product.name}
                </Typography>
                <Typography variant="h6">
                {product.price.formatted_with_symbol}
                </Typography>
            </div>
            <Typography dangerouslySetInnerHTML={{ __html:product.description}} variant="h6" color="textSecondary" />
          </CardContent>
         <CardActions disableSpacing className={classes.cardActions}>
          <IconButton aria-label="Add to Cart" onClick={() => onAddToCart(product.id,1)} >
            <AddShoppingCart/>
          </IconButton>
         </CardActions>
        </Card>

    )
}
export default Product;
