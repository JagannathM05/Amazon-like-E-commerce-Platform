import { checkout } from "./checkoutfile/productsummary.js"; 
import {amountUpdater} from "./checkoutfile/paymentSummary.js";
import { cartQuantityChanger } from "./cart.js";
checkout();
cartQuantityChanger('.js-payment-count');
 amountUpdater();