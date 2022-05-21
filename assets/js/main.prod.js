"use strict";var topPanel={show:function(t,e){var n='<div id="top-panel" class="top-panel '.concat(e,'">').concat(t,"</div>");null!==document.getElementById("top-panel")&&document.getElementById("top-panel").remove(),document.body.insertAdjacentHTML("afterbegin",n),this.hide()},hide:function(){setTimeout(function(){null!==document.getElementById("top-panel")&&document.getElementById("top-panel").remove()},3e3)},error:function(t){this.show(t,"panel-error")},success:function(t){this.show(t,"panel-success")},info:function(t){this.show(t,"panel-info")}},CART=[{name:"Milk",qty:2,isBuy:!0,price:23.45,total:46.9},{name:"Water",qty:1,isBuy:!0,price:15,total:15},{name:"Bread",qty:3,isBuy:!0,price:12.15,total:36.45}];function addToCart(e,t,n){var o,r;void 0===CART.find(function(t){return t.name===e})?(CART.push({name:e,qty:t,isBuy:!1,price:n,total:parseFloat((t*n).toFixed(2))}),topPanel.success("Product succesfully added")):(o=CART.findIndex(function(t){return t.name===e}),r=CART[o].qty+t,CART[o].qty=r,CART[o].total=parseFloat((r*CART[o].price).toFixed(2)),topPanel.success("Product quantity changed")),viewCartTable(),viewPurchasedTable()}function checkAndAddToCart(){var t=document.getElementById("product_name").value,e=parseInt(document.getElementById("product_qty").value),n=parseFloat(document.getElementById("product_price").value),o=!0;""===t&&(topPanel.error("Enter product name"),o=!1),isNaN(e)&&(topPanel.error("Enter quantity valid value"),o=!1),e<=0&&(topPanel.error("Enter quantity must be positive"),o=!1),isNaN(n)&&(topPanel.error("Enter price valid value"),o=!1),n<=0&&(topPanel.error("Price must be positive"),o=!1),o&&(addToCart(t,e,n),document.getElementById("product_name").value="",document.getElementById("product_qty").value="1",document.getElementById("product_price").value="")}function viewCartTable(){var e="";CART.sort(function(t,e){return Number(e.isBuy)-Number(t.isBuy)}),CART.forEach(function(t){e+="\n        <tr>\n            <td>".concat(t.name,"</td>\n            <td>").concat(t.isBuy?'<span class="badge bg-success">Yes</span>':'<span class="badge bg-danger">No</span>','</td>\n            <td>\n                <button class="btn btn-info btn-sm" onclick="changeProductQty(\'').concat(t.name,"', 'dec')\">-</button>\n                ").concat(t.qty,'\n                <button class="btn btn-info btn-sm" onclick="changeProductQty(\'').concat(t.name,"', 'inc')\">+</button>\n            </td>\n            <td>").concat(t.price.toFixed(2),"</td>\n            <td>").concat(t.total.toFixed(2),'</td>\n            <td>\n                <button type="button" class="btn btn-primary" onclick="changeProdStatus(\'').concat(t.name,'\')">Change status</button>\n                <button type="button" class="btn btn-danger" onclick="askProductDelete(\'').concat(t.name,"')\">&times;</button>\n            </td>\n        </tr>\n        ")}),document.getElementById("cart-tbody").innerHTML=e,document.getElementById("cart-total").innerText=sumTotal().toFixed(2)}function changeProductQty(e,t){var n=CART.findIndex(function(t){return t.name===e}),o=0;if("inc"===t)o=CART[n].qty+1;else{if(!(2<=CART[n].qty))return askProductDelete(e),!1;o=CART[n].qty-1}CART[n].qty=o,CART[n].total=CART[n].price*o,viewCartTable(),setSorting()}function sumTotal(){return CART.reduce(function(t,e){return t+e.total},0)}function askProductDelete(e){var t;confirm("Delete "+e+"?")&&(t=CART.findIndex(function(t){return t.name===e}),CART.splice(t,1),viewCartTable(),setSorting(),topPanel.info("Product successfully deleted"))}function changeProdStatus(e){var t=CART.findIndex(function(t){return t.name===e});CART[t].isBuy=!CART[t].isBuy,viewCartTable(),setSorting(),topPanel.info("Product status changed")}function setSorting(){var t=[];switch(document.getElementById("sorting").value){case"az":t=CART.filter(function(t){return!0===t.isBuy}).sort(sortName);break;case"za":t=CART.filter(function(t){return!0===t.isBuy}).sort(sortName).reverse();break;case"desc":t=CART.filter(function(t){return!0===t.isBuy}).sort(function(t,e){return Number(e.total)-Number(t.total)});break;case"asc":t=CART.filter(function(t){return!0===t.isBuy}).sort(function(t,e){return Number(t.total)-Number(e.total)})}viewPurchasedTable(t)}function sortName(t,e){return t.name<e.name?-1:t.name>e.name?1:0}function viewPurchasedTable(t){var e="";t.forEach(function(t){e+="\n        <tr>\n            <td>".concat(t.name,"</td>\n            <td>").concat(t.qty,"</td>\n            <td>").concat(t.price.toFixed(2),"</td>\n            <td>").concat(t.total.toFixed(2),"</td>\n        </tr>\n        ")}),document.getElementById("cart-tbody-receipt").innerHTML=e,document.getElementById("cart-total-receipt").innerText=sumPurchasedTotal(t).toFixed(2)}function sumPurchasedTotal(t){return t.reduce(function(t,e){return t+e.total},0)}viewCartTable(),setSorting();var DISCOUNT=[{promo:"qwe",type:"fixed",value:15,isUsed:!1},{promo:"xyz",type:"percent",value:5,isUsed:!1}];function checkAndApplyDiscount(){var e=document.getElementById("discountField").value;if(""===e)return topPanel.error("Enter promo code"),!1;var t=DISCOUNT.findIndex(function(t){return t.promo===e});if(-1===t)return topPanel.error("Promo code not found"),!1;var n=DISCOUNT[t];if(n.isUsed)return topPanel.error("This promo already used"),!1;var o=calcDiscount(n);DISCOUNT[t].isUsed=!0,document.getElementById("discValue").innerText=n.value+("fixed"===n.type?" UAH":"%"),document.getElementById("totalWithDisc").innerText=o.toFixed(2),document.getElementById("discountField").value=""}function calcDiscount(t){var e=t.type,n=t.value,o=sumTotal();switch(e){case"fixed":return o-n;case"percent":return o-o/100*n}}