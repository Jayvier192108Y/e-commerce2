let carts = document.querySelectorAll('.add-cart');
let products =[
    {
        name:'Tokyo Ghoul: Figurine',
        tag:'AnimeFig1',
        price:15,
        inCart:0,
    },
    {
        name:'One Punch Man: Figurine',
        tag:'AnimeFig2',
        price:20,
        inCart:0,
    },
    {
        name:'Hero Academia: Figurine',
        tag:'AnimeFig3',
        price:25,
        inCart:0,
    }
]

for (let i = 0; i< carts.length; i++){
    carts[i].addEventListener('click', () =>{
        cartNumbers(products[i]);
        totalCost(products[i]);
    })
}

function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');

    if(productNumbers){
        document.querySelector('.cart span').textContent= productNumbers;
    }
}

function cartNumbers(product) {
    
    let productNumbers = localStorage.getItem('cartNumbers');
    
    productNumbers= parseInt(productNumbers);
    if( productNumbers ){
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;
    }
    else{
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart span').textContent = 1;
    }

    setItems(product);
}

function setItems(product) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    if(cartItems != null) { 
        if(cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1;
    } else {
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
        }
    }    
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(product) {
    let cartCost = localStorage.getItem('totalCost');
    
    console.log('My cart cost is', cartCost);

    if(cartCost != null){
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price);
    }
    else{
        localStorage.setItem("totalCost", product.price);
    }
}

function displayCart() {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".products");
    let cartCost = localStorage.getItem('totalCost');
    if( cartItems && productContainer ) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
                <div class="cart-row">
                    <div class="product">
                        <ion-icon name="close-circle-outline"></ion-icon>
                        <img src="./images/${item.tag}.jfif">
                        <span>${item.name}</span>
                    </div>
                    <div class="price">$${item.price}</div>
                    <div class="quantity">
                        <div class='decrease'>
                            <ion-icon name="remove-circle-outline"></ion-icon>
                        </div>
                        <span>${item.inCart}</span>
                        <div class='increase'>
                            <ion-icon name="add-circle-outline"></ion-icon>
                        </div>
                    </div>
                    <div class="total">
                        $${item.inCart * item.price},00
                    </div>
                </div>
            `
        });

        productContainer.innerHTML += `
            <div class="basketTotalContainer">
                <h4 class="basketTotalTitle">
                    Basket Total
                </h4>
                <h4 class="basketTotal">
                    $${cartCost},00
                </h4>
            </div>
            
        `
    }
    
}
onLoadCartNumbers();
displayCart();

/* Clear cart button function */
function clearLocalStorage(){
    alert("Are you sure you want to clear your cart?")
    if(localStorage.getItem("totalCost") != null){
        localStorage.clear();
        window.location.reload();
    }
}
/*Chatbot open and close*/
const dialogflow = document.querySelector('.dialogflow');
const chatBtn = document.querySelector('.chat-btn');
function opened(){  
    dialogflow.classList.add('active');
}
function hide(){  
    chatBtn.addEventListener('click', ()=>{
        dialogflow.classList.remove('active');
        console.log('Clicked');
        location.reload();
    })
}

/* Checkout Button */
function thanks() {
    alert('Thank You For Your Purchase!');
    if(localStorage.getItem("totalCost") != null){
        localStorage.clear();
        window.location.reload();
    }
}

/* Cross Button Function (remove item row) */
/*
function remove(product){
    let removeBtn = document.getElementsByName('close-circle-outline');
    let cartItems = localStorage.getItem("productsInCart");
    let productNumbers = localStorage.getItem("cartNumbers");
    let cartCost = localStorage.getItem("totalCost")
    cartItems = JSON.parse(cartItems);

    Object.values(cartItems).filter(item=>{
        console.log(cartItems.tag)
    })
    
    //console.log(cartItems)
    for ( let i=0; i < removeBtn.length; i++ ){
        let button = removeBtn[i];
        button.addEventListener('click',()=>{
            Object.values(cartItems).map(item=>{
                if(cartItems[product.tag] == item.tag){
                    localStorage.remove(item)
                }
            })
        });
    }
    
}
remove();

function manageQuantity() {
    let decreaseBtns = document.querySelectorAll('.decrease');
    let increaseBtns = document.querySelectorAll('.increase');
    let cartItems = localStorage.getItem('productsInCart');
    let currentQuantity = 0;
    let currentProduct = "";
    cartItems = JSON.parse(cartItems);
    console.log(cartItems);

    for(let i=0; i < decreaseBtns.length; i++){
        decreaseBtns[i.addEventListener('click', ()=>{
            currentQuantity = decreaseBtns[i].parentElement.querySelector('span').textContent()
            console.log(currentQuantity)
            currentProduct = decreaseBtns[i].parentElement.previousElementSibling.previousElementSibling
            console.log(currentProduct)

            if (cartItems[currentProduct].inCart>1){
                cartItems[currentProduct].inCart -= 1;
                cartNumbers( cartItems[currentProduct], "decrease");
                totalCost (cartItems[currentProduct], "decrease");
                localStorage.setItem('productsInCart', JSON.stringify(cartItems));
                displayCart();
            }
        })]
    }

    for(let i=0; i < increaseBtns.length; i++){
        increaseBtns[i.addEventListener('click', ()=>{
            currentQuantity = increaseBtns[i].parentElement.querySelector('span').textContent()
            console.log(currentQuantity)
            currentProduct = increaseBtns[i].parentElement.previousElementSibling.previousElementSibling
            console.log(currentProduct)

            if (cartItems[currentProduct].inCart>1){
                cartItems[currentProduct].inCart += 1;
                cartNumbers( cartItems[currentProduct]);
                totalCost (cartItems[currentProduct]);
                localStorage.setItem('productsInCart', JSON.stringify(cartItems));
                displayCart();
            }
        })]
    }
}

*/
/*
function removeItems(product){
    let removeBtn = document.getElementsByName('close-circle-outline');
    let cartItems = localStorage.getItem("productsInCart");
    let cartNum = localStorage.getItem("cartNumbers");
    cartItems = JSON.parse(cartItems);

    for ( let i=0; i < removeBtn.length; i++ ){
        let button = removeBtn[i];
        button.addEventListener('click',()=>{
            button.parentElement.parentElement.remove();      
            console.log('Clicked')     
        });
    }
}
removeItems();

Object.values(cartItems).map(item =>{
    item.inCart=0
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));

    cartNumbers();
    onLoadCartNumbers();

    localStorage.removeItem("productsInCart");
});
*/

