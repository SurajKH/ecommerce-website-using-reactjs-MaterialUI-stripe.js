import React, { useState , useEffect} from "react";
import {Paper,Stepper,Step,StepLabel,Typography,CircularProgress,Divider,Button} from '@material-ui/core';
import useStyles from './styles';
import AddressForm from "../AddressForm";
import PaymentForm from "../PaymentForm";
import { Link } from "react-router-dom";
import { commerce } from "../../../lib/commerce";
const steps=['Shipping Address','Payment Details'];

const Checkout = ({cart,order,onCaptureCheckout,error}) =>
{
    const classes=useStyles();
    const [activeStep,setActiveStep]=useState(0);

    const [checkoutToken,setCheckoutToken]=useState(null);
    const [shippingData, setShippingData] = useState({});


    
  useEffect(()=>
  {
         //generate a checkout function
         const generateToken = async () =>
         {
            try{
             const token=await commerce.checkout.generateToken(cart.id,{type:'cart'});
             console.log(token);
             setCheckoutToken(token);
            }
            catch(error)
            {

            }
         }
         generateToken();
  },[cart]);

  const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);


   const next=(data) =>
   {
      setShippingData(data);
      nextStep();
   }
    
    let Confirmation = () => 
    (
      <>
 <div>
         <Typography variant="h5">Thankyou for your purchase , hope you have an amazing day ahead.</Typography>
         <Divider className="classes.divider" />
         {/* <Typography variant="subtitle2"></Typography> */}
      </div>
      <br />
      <Typography variant="subtitle2">Continue Shopping!!!</Typography>
      <Button component={Link} to="/" variant="outlined" type="button">Back to Home</Button>
      </>
     

    )

    if(error)
    {
      <>
        <Typography variant="h5">Error :{error}</Typography>
      </>
    }

    const Form= () => activeStep === 0 ?
    <AddressForm checkoutToken={checkoutToken}  next={next} />:<PaymentForm shippingData={shippingData} checkoutToken={checkoutToken} backStep={backStep}
      onCaptureCheckout={onCaptureCheckout} nextStep={nextStep}
    />


  return (
    <>
    <div className={classes.toolbar} />
      <main className={classes.layout}>
      <Paper className={classes.paper}>
        <Typography variant="h4" align="center">Checkout</Typography>
        <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((step) =>
            (
               <Step activeStep={activeStep} className={classes.stepper}>
                <StepLabel>{step}</StepLabel>
               </Step>
            )
            )}
        </Stepper>
        {activeStep === steps.length ? <Confirmation /> :checkoutToken && <Form/> }
      </Paper>

      </main>
    </>
  )
}
export default Checkout;