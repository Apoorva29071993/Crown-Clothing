export const addItemToCart = (cartItems , cartItemToAdd) => {

    // Check if the item is already present in the cart items 
    // If the item is present in the cartItems array use map function to iterate all the items in the array
    // So if the id matches return the object with that item by increase the quantity
    // If the id doesnot match return the item as it is into the cartItems array
    
    // If the item is not present in the cartItems array skip if block , return array with old cart items and add the new item 
    // with quantity as one
    const existingCartItem = cartItems.find(
        cartItem => cartItem.id  === cartItemToAdd.id
        );
     if (existingCartItem) {
         return cartItems.map(cartItem => 
            cartItem.id === cartItemToAdd.id
            ? {...cartItem , quantity : cartItem.quantity + 1}
            : cartItem
            )
     }   

     return [...cartItems , { ...cartItemToAdd , quantity : 1}]

}

