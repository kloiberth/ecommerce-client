export function calcDiscountedPrice(price, discount) {
    
    if(!discount) return price;

    const discountAmount = (price * discount) / 100;
    const finalprice = price - discountAmount;

    return (finalprice).toFixed(2);

}