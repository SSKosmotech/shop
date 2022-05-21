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
            if(document.getElementById('top-panel') !== null){
                document.getElementById('top-panel').remove();
            }
            // document.getElementById('top-panel').remove();
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
// topPanel.success("Lorem ipsum");
// topPanel.info("Lorem ipsum");

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
        name: 'Milk',
        qty: 2,
        isBuy: true,
        price: 23.45,
        total: 46.9
    },
    {
        name: 'Water',
        qty: 1,
        isBuy: true,
        price: 15,
        total: 15
    },
    {
        name: 'Bread',
        qty: 3,
        isBuy: true,
        price: 12.15,
        total: 36.45
    }
];

viewCartTable();
setSorting();
// viewPurchasedTable(CART);

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
    // setSorting();
    viewPurchasedTable();
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
        //Занулення даних панельки, після того як відбулося додавання товару
        document.getElementById('product_name').value = '';
        document.getElementById('product_qty').value = '1';
        document.getElementById('product_price').value = '';
    }
}

function viewCartTable(){
    let html = '';
    CART.sort((a, b) => Number(b.isBuy) - Number(a.isBuy));
    // CART.sort((a, b) => {
    //     if(a.isBuy === b.isBuy){
    //         return 0;
    //     }else{
    //         if(a.isBuy === true){
    //             return -1;
    //         }else{
    //             return 1
    //         }
    //     }
    // })
    CART.forEach(product => {
        html +=`
        <tr>
            <td>${product.name}</td>
            <td>${product.isBuy ? '<span class="badge bg-success">Yes</span>' : '<span class="badge bg-danger">No</span>'}</td>
            <td>
                <button class="btn btn-info btn-sm" onclick="changeProductQty('${product.name}', 'dec')">-</button>
                ${product.qty}
                <button class="btn btn-info btn-sm" onclick="changeProductQty('${product.name}', 'inc')">+</button>
            </td>
            <td>${product.price.toFixed(2)}</td>
            <td>${product.total.toFixed(2)}</td>
            <td>
                <button type="button" class="btn btn-primary" onclick="changeProdStatus('${product.name}')">Change status</button>
                <button type="button" class="btn btn-danger" onclick="askProductDelete('${product.name}')">&times;</button>
            </td>
        </tr>
        `;
    });
    document.getElementById('cart-tbody').innerHTML = html;
    document.getElementById('cart-total').innerText = sumTotal().toFixed(2);
}

function changeProductQty(name, action){
    const index = CART.findIndex(el => el.name === name);
    let newQty = 0;
    if(action === 'inc'){
        newQty = CART[index].qty + 1;
    }else{
        if(CART[index].qty >= 2){
            newQty = CART[index].qty - 1;
        }else{
            askProductDelete(name);
            return false;
        }
    }
    CART[index].qty = newQty;
    CART[index].total = CART[index].price * newQty;
    viewCartTable();
    setSorting();
}

function sumTotal(){
    return CART.reduce((acc, curr)=> {return acc + curr.total;}, 0);

    // return CART.reduce((prev, curr)=>{
    //     console.log(prev, curr);
    //     return prev + curr.total;
    // }, 0);


    // let total = 0;
    // for(let i = 0; i < CART.length; i++){
    //     total += CART[i].total;
    // }
    // return total;
}

function askProductDelete(name){
    if(confirm('Delete '+name+'?')){
        const delIndex = CART.findIndex((el) => el.name === name);
        CART.splice(delIndex, 1);
        viewCartTable();
        setSorting();
        // viewPurchasedTable(CART);
        topPanel.info("Product successfully deleted");
    }
}

function changeProdStatus(name){
    const statusIndex = CART.findIndex((el) => el.name === name);
    CART[statusIndex].isBuy = !CART[statusIndex].isBuy;
    
    // if(CART[statusIndex].isBuy){
    //     CART[statusIndex].isBuy = false;
    // }else{
    //     CART[statusIndex].isBuy = true;
    // }
    // console.log(statusIndex);
    viewCartTable();
    setSorting();
    // viewPurchasedTable(CART);
    topPanel.info("Product status changed");
}



function setSorting(){
    const sorting = document.getElementById('sorting').value;
    let rez = [];
    rez = sortCart(sorting);
    viewPurchasedTable(rez);
}

function sortCart(sorting){
    switch(sorting){
        case "az": 
            rez = CART.filter(el => el.isBuy === true).sort(sortName);
            // console.log(sorting);
            // console.log(rez);
            break;
        case "za": 
            rez = CART.filter(el => el.isBuy === true).sort(sortName).reverse();
            // console.log(sorting);
            // console.log(rez);
            break;
        case "desc": 
            rez = CART.filter(el => el.isBuy === true).sort((a, b) => Number(b.total) - Number(a.total));
            // console.log(sorting);
            // console.log(rez);
            break;
        case "asc": 
            rez = CART.filter(el => el.isBuy === true).sort((a, b) => Number(a.total) - Number(b.total));
            // console.log(sorting);
            // console.log(rez);
            break;
    }
    return rez;
}


function sortName(a, b) {
    if(a.name < b.name){
        return -1;
    }else{
        if(a.name > b.name){
            return 1;
        }else{
            return 0;
        }
    }
}

function viewPurchasedTable(sortCART){
    let html = '';
    // sortCART = setSorting();
    // CART = sortCART;
    sortCART.forEach(product => {
        html +=`
        <tr>
            <td>${product.name}</td>
            <td>${product.qty}</td>
            <td>${product.price.toFixed(2)}</td>
            <td>${product.total.toFixed(2)}</td>
        </tr>
        `;
    });
    document.getElementById('cart-tbody-receipt').innerHTML = html;
    document.getElementById('cart-total-receipt').innerText = sumPurchasedTotal(sortCART).toFixed(2);
}

function sumPurchasedTotal(cart){
    return cart.reduce((acc, curr)=> {return acc + curr.total;}, 0);
}

const DISCOUNT = [
    {
        promo: 'qwe',
        type: 'fixed', //'percent',
        value: 15,
        isUsed: false,
    },
    {
        promo: 'xyz',
        type: 'percent',
        value: 5,
        isUsed: false,
    }
];

function checkAndApplyDiscount(){
    const discPromo = document.getElementById('discountField').value;
    if(discPromo === ''){
        topPanel.error("Enter promo code");
        return false;
    }
    const index = DISCOUNT.findIndex(el => el.promo === discPromo);
    if(index === -1){
        topPanel.error("Promo code not found");
        return false;
    }
    const disc = DISCOUNT[index];
    if(disc.isUsed){
        topPanel.error("This promo already used");
        return false;
    }
    let newTotal = calcDiscount(disc);
    DISCOUNT[index].isUsed = true;
    document.getElementById('discValue').innerText = disc.value + (disc.type === 'fixed' ? ' UAH' : "%");
    document.getElementById('totalWithDisc').innerText = (newTotal).toFixed(2);
    document.getElementById('discountField').value = '';
    
    let newTotalPurchased = calcDiscountPurchased(disc);
    document.getElementById('disc-value-receipt').innerText = disc.value + (disc.type === 'fixed' ? ' UAH' : "%");
    document.getElementById('total-with-disc-receipt').innerText = (newTotalPurchased).toFixed(2);

}

function calcDiscount(disc){
    const {type, value} = disc; //деструктуризація
    const sumTotalValue = sumTotal();
    switch(type){
        case "fixed": 
            return sumTotalValue - value;
        case "percent":
            return sumTotalValue - (sumTotalValue / 100 * value);
    }
}

function calcDiscountPurchased(disc){
    const {type, value} = disc; //деструктуризація
    const sorting = document.getElementById('sorting').value;
    let sortingCart = sortCart(sorting);
    // setSorting();
    const sumTotalValuePurchased = sumPurchasedTotal(sortingCart);
    switch(type){
        case "fixed": 
            return sumTotalValuePurchased - value;
        case "percent":
            return sumTotalValuePurchased - (sumTotalValuePurchased / 100 * value);
    }
}






























/////////////////////////////////дроби////////////////////////////////
// const drobb = {
//     value1: {
//         ch: 0,
//         zn: 0
//     },
//     value2: {
//         ch: 0,
//         zn: 0
//     },
//     setValue: function (key, chisl, znam){
//         this[key].ch = chisl;
//         this[key].zn = znam;
//         // this[key] = {
//         //     ch: chisl,
//         //     zn: znam
//         // }
//     },
//     multiply: function(){
//         const result = {
//             ch: this.value1.ch * this.value2.ch,
//             zn: this.value1.zn * this.value2.zn
//         };
//         return this.short(result);
//     },
//     divide: function(){
//         const result = {
//             ch: this.value1.ch * this.value2.zn,
//             zn: this.value1.zn * this.value2.ch
//         };
//         return this.short(result);
//     },
//     short: function(rez){
//         //TODO: знайти найбільший загальний дільник (якщо він є, то ділимо на нього і повертаємо результат)
//         let nzd = 0;
//         for(let i = Math.min(rez.ch, rez.zn); i > 0; i--){
//             if(rez.ch % i === 0 && rez.zn % i === 0){
//                 nzd = i;
//                 break;
//             }
//         }

//         // if(rez.ch%rez.zn===0){
//         if(nzd !== 0){
//             // return rez.ch / rez.zn;
//             return {
//                 ch: rez.ch / nzd,
//                 zn: rez.zn / nzd
//             };
//         }else{
//             return rez;
//         }
//     }
// }

// drobb.setValue('value1', 1, 2);
// drobb.setValue('value2', 3, 12);
// // drobb.setValue('value3', 4, 6);

// const multip = drobb.multiply();
// console.log(multip);


// const div = drobb.divide();
// console.log(div);

/////////////////////////////////дроби////////////////////////////////
