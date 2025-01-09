export function cartQuantityChanger(item)
{
  let pcount =0;
  cart.forEach((item)=>{
    pcount += item.quantity;
    // return pcount;
  })
  return pcount;

}