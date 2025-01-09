import {cart} from '../cart.js';
import {product} from '../products.js';


export function amountUpdater()
{
    let amount =0;
    let selected=0;
    cart.forEach(item => {
        product.forEach(product=>
        {
            if(item.pid == product.id)
            {
                 selected=product;
            }
        }
        )
        amount += item.quantity * (selected.priceCents/100).toFixed(2);



        
    });
    let total_amt = amount;
    // return amount;
    document.querySelector('.js-payment-summary-money').innerHTML=total_amt.toFixed(2);
    document.querySelector('.js-payment-after-shipping').innerHTML=`$${(total_amt+4.99).toFixed(2)}`
    document.querySelector('.js-tax').innerHTML=`$${(amount*10/100).toFixed(2)}`;
    document.querySelector('.js-total').innerHTML=`$${(total_amt+(amount*10/100)).toFixed(2)}`;
       
}
