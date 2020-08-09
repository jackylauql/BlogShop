var removeButton = document.getElementsByClassName('cart-remove-btn')
var quantityInput = document.getElementsByClassName('input-quantity-field')
var addCart = document.getElementsByClassName('add-cart-btn')
var purchaseButton = document.getElementsByClassName('purchase-btn')[0]

const updateTotal = () => {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('price-column')[0]
        var quantityElement = cartRow.getElementsByClassName('input-quantity-field')[0]
        var price = parseFloat(priceElement.innerText.replace('$', ''))
        var quantity = quantityElement.value
        total += (price * quantity)
    }
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total.toFixed(2)
}
const quantityChanged = event => {
    var quantityNum = event.target
    if (quantityNum.value < 1 || isNaN(quantityNum.value)) {
        quantityNum.value = 1
    }
    updateTotal()
}

const removeCartItem = event => {
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    updateTotal()
}

const addCartRow = (itemName, itemImage, itemPrice) => {
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemImages = cartItems.getElementsByClassName('cart-item-image')
    for (i = 0; i < cartItemImages.length; i++){
        if (cartItemImages[i].src === itemImage){
            alert('This item is already in the cart!')
            return
        }
    }
    var cartRowContents = `
            <span class='cart-item item-column column-header'><img class='cart-item-image' src='${itemImage}'>${itemName}</span>
            <span class='cart-item price-column column-header'>${itemPrice}</span>
            <span class='cart-item quantity-column column-header cart-quantity'>
                <input type='number' value='1' class='input-quantity-field'>
                <button type='button' class='cart-remove-btn'>Remove</button>
            </span>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    updateTotal()
    cartRow.getElementsByClassName('cart-remove-btn')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('input-quantity-field')[0].addEventListener('change', updateTotal)
}

const addItemsToCart = event => {
    var addItems = event.target
    var shopItem = addItems.parentElement.parentElement
    var itemName = shopItem.getElementsByClassName('item-name')[0].innerText
    var itemImage = shopItem.getElementsByClassName('item-image')[0].src
    var itemPrice = shopItem.getElementsByClassName('price')[0].innerText
    addCartRow(itemName, itemImage, itemPrice)
}

purchaseButton.addEventListener('click', () => {
    alert('Thank you for the purchase!')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateTotal()
})


for (i = 0; i < removeButton.length; i++) {
    var button = removeButton[i]
    button.addEventListener('click', removeCartItem)
}

for (i = 0; i < quantityInput.length; i++){
    var quantityField = quantityInput[i]
    quantityField.addEventListener('change', quantityChanged)
}

for (i = 0; i < addCart.length; i++){
    var addCartItem = addCart[i]
    addCartItem.addEventListener('click', addItemsToCart)
}