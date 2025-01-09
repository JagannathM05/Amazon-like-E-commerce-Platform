import {cart,checkid} from '../data/cart.js'
import {product} from '../data/products.js'
import { cartQuantityChanger } from '../data/cart.js';
let pro='';
product.forEach((products)=>
{   
    pro += `<div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${products.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${products.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${products.rating.stars*10}.png">
            <div class="product-rating-count link-primary">
             ${products.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${Number(products.priceCents)/100}
          </div>

          <div class="product-quantity-container">
            <select class="js-${products.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-${products.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button  data-id="${products.id}" class="add-to-cart-button button-primary js-add-to-cart">
            Add to Cart
          </button>
        </div>`
        // document.querySelector('.js-product-grid').innerHTML = pro;
}

)
document.querySelector('.products-grid').innerHTML = pro;

let productid='';
document.querySelectorAll('.js-add-to-cart')
.forEach((button)=>{
 button.addEventListener('click',()=>
{
    productid=button.dataset.id;
     checkid(productid);
    cartQuantityChanger('.cart-quantity');
     addmessage(productid);

      
})
});


//  function cartQuantityChanger(item)
// {
//   let pcount =0;
//   cart.forEach((item)=>{
//     pcount += item.quantity;
//     // return pcount;
//   })
//   document.querySelector(item).innerHTML = pcount;
// }



function addmessage(productid)
{
  setTimeout(()=>{
    document.querySelector(`.js-added-${productid}`).classList.remove('js-on-add');
  },3000)
  document.querySelector(`.js-added-${productid}`).classList.add('js-on-add');
 
   
}
cartQuantityChanger('.cart-quantity');