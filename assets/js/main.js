const topPanel = {
    show: function(text, className){
        let panel = `<div id="top-panel" class="top-panel ${className}">${text}</div>`;
        if(document.getElementById('top-panel') !== null){
            document.getElementById('top-panel').remove();
        }
        document.body.insertAdjacentHTML('afterbegin', panel);
        this.hide();
    },
    hide: function(){
        setTimeout(function(){
            document.getElementById('top-panel').remove();
        }, 3000);
    },
    error: function(text){
        this.show(text, 'panel-error');
    },
    success: function(text){
        this.show(text, 'panel-success');
    },
    info: function(text){
        this.show(text, 'panel-info');
    }
};


// topPanel.error("Lorem ipsum");

/**
   {
        name: '',
        qty: 0,
        isBuy: false,
        price: 0.00,
        total: 0.00
    }
 */


const CART = [
    {
        name: 'Bread',
        qty: 1,
        isBuy: false,
        price: 15,
        total: 15
    },
    {
        name: 'Milk',
        qty: 2,
        isBuy: false,
        price: 23.45,
        total: 46.9
    }
];

viewCartTable();

function addToCart(name, qty, price){
    if(CART.find(el => el.name===name) === undefined){
        CART.push({
            name: name,
            qty: qty,
            isBuy: false,
            price: price,
            total: parseFloat((qty * price).toFixed(2))
        });
        topPanel.success("Product succesfully added");
    }else{
        const prodIndex = CART.findIndex(el => el.name===name);
        const newQty = CART[prodIndex].qty + qty;
        CART[prodIndex].qty = newQty;
        CART[prodIndex].total = parseFloat((newQty * CART[prodIndex].price).toFixed(2));
        // CART[prodIndex].qty
        topPanel.success("Product quantity changed");
    }
    // console.log(CART);
    viewCartTable();
}

// addToCart('Milk', 2, 23.45);

function checkAndAddToCart(){
    let name = document.getElementById('product_name').value,
        qty = parseInt(document.getElementById('product_qty').value),
        price = parseFloat(document.getElementById('product_price').value);
    let valid = true;
    if(name === ''){
        // alert('Enter product name');
        topPanel.error('Enter product name');
        valid = false;
    }
    if(isNaN(qty)){
        // alert('Enter quantity valid value');
        topPanel.error('Enter quantity valid value');
        valid = false;
    }
    if(qty <= 0){
        // alert('Enter quantity must be positive');
        topPanel.error('Enter quantity must be positive');
        valid = false;
    }
    if(isNaN(price)){
        // alert('Enter price valid value');
        topPanel.error('Enter price valid value');
        valid = false;
    }
    if(price <= 0){
        // alert('Enter price must be positive');
        topPanel.error('Price must be positive');
        valid = false;
    }
    if(valid){
        addToCart(name, qty, price);
        // topPanel.success("Product succesfully added");
        document.getElementById('product_name').value = '';
        document.getElementById('product_qty').value = '1';
        document.getElementById('product_price').value = '';
    }
}

function viewCartTable(){
    let html = '';
    CART.forEach(product => {
        html +=`
        <tr>
            <td>${product.name}</td>
            <td>${product.qty}</td>
            <td>${product.price.toFixed(2)}</td>
            <td>${product.total.toFixed(2)}</td>
        </tr>
        `;
    });
    document.getElementById('cart-tbody').innerHTML = html;
}