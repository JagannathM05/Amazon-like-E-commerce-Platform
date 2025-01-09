import { cart, ondelete,addtolocalStorage } from '../cart.js';
import { product } from '../products.js';
import { cartQuantityChanger } from '../cart.js';
import { delivarydate } from '../delivarydates.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { amountUpdater } from './paymentSummary.js';
// import {hello} from './checkoutfile/productsummary.js';
// hello();
export function checkout()
{


cartQuantityChanger('.js-link');
itementry();

function itementry() {
    let html = '';
    
    cart.forEach((cartitem) => {
        let matchingitem;
        
        product.forEach((product) => {
            if (cartitem.pid == product.id) {
                matchingitem = product;
            }
        });

        if (matchingitem) {
            html += `<div class="cart-item-container">
                        <div class="delivery-date delivery-date-${matchingitem.id}">
                          Delivery date: 
                        </div>
            
                        <div class="cart-item-details-grid">
                          <img class="product-image" src="${matchingitem.image}">
            
                          <div class="cart-item-details">
                            <div class="product-name">
                             ${matchingitem.name}
                            </div>
                            <div class="product-price">
                            $${(matchingitem.priceCents / 100).toFixed(2)}
                            </div>
                            <div class="product-quantity">
                              <span>
                                Quantity: <span class="quantity-label">${cartitem.quantity}</span>
                              </span>
                              <span data-update-id="${matchingitem.id}" class="update-quantity-link link-primary js-update">
                                Update </span> 
                                <span class="js-after-update-${matchingitem.id}"></span>
                              <span data-delete-id="${matchingitem.id}" class="delete-quantity-link link-primary js-delete-link">
                                Delete
                              </span>
                            </div>
                          </div>
                      <div class="delivery-options">
                          <div class="delivery-options-title">
                          Choose a delivery option:
                        </div>
                          ${delivaryoption(matchingitem)}
                         
                        </div>
                      </div>
                      </div>`;
        }
    });

    document.querySelector('.js-order-summary').innerHTML = html;
    addingEventlistner();
    addlisteneronupdate();
    
    cart.forEach((cartitem) => {
        let matchingitem;
        product.forEach((product) => {
            if (cartitem.pid == product.id) {
                matchingitem = product;
            }
        });
        if (matchingitem) {
            addel(matchingitem);
        }
    });
}

function addingEventlistner() {
    let dlinks = document.querySelectorAll('.js-delete-link');
    dlinks.forEach((link) => {
        link.addEventListener('click', () => {
            let dId = link.dataset.deleteId;
            ondelete(dId);
            amountUpdater();
            cartQuantityChanger('.js-link');
            itementry();
        });
    });
}

function addlisteneronupdate() {
    document.querySelectorAll('.js-update')
        .forEach((update) => {
            update.addEventListener('click', () => {
                let uid = update.dataset.updateId;
                document.querySelector(`.js-after-update-${uid}`).innerHTML = `<input style="width:20px;" class="updateinput-${uid}" type="text">
                <span class="link-primary-${uid} link-primary">Save</span>`;

                document.querySelector(`.link-primary-${uid}`)
                    .addEventListener('click', () => {
                        let data = document.querySelector(`.updateinput-${uid}`).value;
                        updatequantity(data, uid);
                    });

                document.querySelector(`.updateinput-${uid}`)
                    .addEventListener('keypress', (event) => {
                        if (event.key == 'Enter') {
                            let data = document.querySelector(`.updateinput-${uid}`).value;
                            updatequantity(data, uid);
                        }
                    });
            });
        });
}

function updatequantity(data, uid) {
    if (data == '0') {
        ondelete(uid);
        
        cartQuantityChanger('.js-link');
        itementry();
    } else {
        let selecteditem;
        cart.forEach((item) => {
            if (item.pid == uid) {
                selecteditem = item;
            }
        });

        if (selecteditem) {
            selecteditem.quantity = Number(data);
            itementry();
            cartQuantityChanger('.js-link');
        }
    }
    addtolocalStorage();
    amountUpdater();
}

function delivaryoption(matchingitem) {
    let html = '';
    delivarydate.forEach((date) => {
        let today = dayjs();
        let datestring = today.add(date.days, 'day').format('MMMM, dddd D');
        let pricestring = (date.price == 0) ? 'Free' : (date.price / 100).toFixed(2);
        
        html += `
            <div class="delivery-option js-d-o-${matchingitem.id}" data-id="${datestring}">
                <input type="radio"
                   checked
                       class="delivery-option-input"
                       name="delivery-option-${matchingitem.id}">
                <div>
                    <div class="delivery-option-date">
                        ${datestring}
                    </div>
                    <div class="delivery-option-price">
                        $${pricestring} - Shipping
                    </div>
                </div>
            </div>`;
    });
    
    return html;
}

function addel(matchingitem) {
    document.querySelectorAll(`.delivery-option`).forEach((element) => {
        element.addEventListener('click', () => {
            document.querySelector(`.delivery-date-${matchingitem.id}`).innerHTML = `Delivery date: ${element.dataset.id}`;
        });
    });
}
}
