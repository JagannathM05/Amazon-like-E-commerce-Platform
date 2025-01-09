// import { cartQuantityChanger } from "./checkout";
// import { amountUpdater } from "./checkoutfile/paymentSummary";
 
 export let cart= JSON.parse(localStorage.getItem('cart')) ||
[
{
    pid:'e43638c e-6aa0-4b85-b27f-e1d07eb678c6',
    quantity:2,
    delivaryid :1
},
{
    pid:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity:1,
    delivaryid:1
}
 ];

export function checkid(productid)
{
  let c=0;
  let pinform;
  cart.forEach((pinfo)=>
  { 
    // console.log(pinfo.pid);
    if(pinfo.pid == productid)
    {
      
       pinform = pinfo;
      
    }
  });

  if(pinform)
  {
    // console.log(pinform);
       pinform.quantity++;
  }
  else
  {
    let temp=Number(document.querySelector(`.js-${productid}`).value);
    // console.log(temp);
    cart.push({
      pid:productid,
      quantity:temp,
      delivaryid:1
    })
  }
  addtolocalStorage();
  // updatecart();

}
export function addtolocalStorage()
{
    localStorage.setItem('cart',JSON.stringify(cart));
}


export function ondelete(dId)
{
   cart.forEach((item,index)=>{
     if(item.pid == dId)
     {
        cart.splice(index,1);
     }
   })
   addtolocalStorage();
  //  amountUpdater();
   
  //  updatecart();
}

// function updatecart()
// {
//   count=0;
//   cart.forEach((item)=>{
//     count+=item.quantity;
//   })
//   document.querySelector('.js-return-to-home-link').innerHTML= `${count} items`;
// }
export function cartQuantityChanger(item)
{
  let pcount =0;
  cart.forEach((item)=>{
    pcount += item.quantity;
    // return pcount;
  })
  document.querySelector(item).innerHTML = pcount ;
  // addtolocalStorage();
}