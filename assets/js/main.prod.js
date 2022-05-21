"use strict";var topPanel={show:function(t,e){var n='<div id="top-panel" class="top-panel '.concat(e,'">').concat(t,"</div>");null!==document.getElementById("top-panel")&&document.getElementById("top-panel").remove(),document.body.insertAdjacentHTML("afterbegin",n),this.hide()},hide:function(){setTimeout(function(){null!==document.getElementById("top-panel")&&document.getElementById("top-panel").remove()},3e3)},error:function(t){this.show(t,"panel-error")},success:function(t){this.show(t,"panel-success")},info:function(t){this.show(t,"panel-info")}},CART=[{name:"Milk",qty:2,isBuy:!0,price:23.45,total:46.9},{name:"Water",qty:1,isBuy:!0,price:15,total:15},{name:"Bread",qty:3,isBuy:!0,price:12.15,total:36.45}];function addToCart(e,t,n){var o,a;void 0===CART.find(function(t){return t.name===e})?(CART.push({name:e,qty:t,isBuy:!1,price:n,total:parseFloat((t*n).toFixed(2))}),topPanel.success("Product succesfully added")):(o=CART.findIndex(function(t){return t.name===e}),a=CART[o].qty+t,CART[o].qty=a,CART[o].total=parseFloat((a*CART[o].price).toFixed(2)),topPanel.success("Product quantity changed")),viewCartTable(),viewPurchasedTable()}function checkAndAddToCart(){var t=document.getElementById("product_name").value,e=parseInt(document.getElementById("product_qty").value),n=parseFloat(document.getElementById("product_price").value),o=!0;""===t&&(topPanel.error("Enter product name"),o=!1),isNaN(e)&&(topPanel.error("Enter quantity valid value"),o=!1),e<=0&&(topPanel.error("Enter quantity must be positive"),o=!1),isNaN(n)&&(topPanel.error("Enter price valid value"),o=!1),n<=0&&(topPanel.error("Price must be positive"),o=!1),o&&(addToCart(t,e,n),document.getElementById("product_name").value="",document.getElementById("product_qty").value="1",document.getElementById("product_price").value="")}function viewCartTable(){var e="";CART.sort(function(t,e){return Number(e.isBuy)-Number(t.isBuy)}),CART.forEach(function(t){e+="\n        <tr>\n            <td>".concat(t.name,"</td>\n            <td>").concat(t.isBuy?'<span class="badge bg-success">Yes</span>':'<span class="badge bg-danger">No</span>',"</td>\n            <td>").concat(t.qty,"</td>\n            <td>").concat(t.price.toFixed(2),"</td>\n            <td>").concat(t.total.toFixed(2),'</td>\n            <td>\n                <button type="button" class="btn btn-primary" onclick="changeProdStatus(\'').concat(t.name,'\')">Change status</button>\n                <button type="button" class="btn btn-danger" onclick="askProductDelete(\'').concat(t.name,"')\">&times;</button>\n            </td>\n        </tr>\n        ")}),document.getElementById("cart-tbody").innerHTML=e,document.getElementById("cart-total").innerText=sumTotal().toFixed(2)}function sumTotal(){return CART.reduce(function(t,e){return t+e.total},0)}function askProductDelete(e){var t;confirm("Delete "+e+"?")&&(t=CART.findIndex(function(t){return t.name===e}),CART.splice(t,1),viewCartTable(),setSorting(),topPanel.info("Product successfully deleted"))}function changeProdStatus(e){var t=CART.findIndex(function(t){return t.name===e});CART[t].isBuy=!CART[t].isBuy,viewCartTable(),setSorting(),topPanel.info("Product status changed")}function setSorting(){var t=document.getElementById("sorting").value,e={};switch(t){case"az":e=CART.filter(function(t){return!0===t.isBuy}).sort(sortName),console.log(t),console.log(e);break;case"za":e=CART.filter(function(t){return!0===t.isBuy}).sort(sortName).reverse(),console.log(t),console.log(e);break;case"desc":e=CART.filter(function(t){return!0===t.isBuy}).sort(function(t,e){return Number(e.total)-Number(t.total)}),console.log(t),console.log(e);break;case"asc":e=CART.filter(function(t){return!0===t.isBuy}).sort(function(t,e){return Number(t.total)-Number(e.total)}),console.log(t),console.log(e)}viewPurchasedTable(e)}function sortName(t,e){return t.name<e.name?-1:t.name>e.name?1:0}function viewPurchasedTable(t){var e="";t.forEach(function(t){e+="\n        <tr>\n            <td>".concat(t.name,"</td>\n            <td>").concat(t.qty,"</td>\n            <td>").concat(t.price.toFixed(2),"</td>\n            <td>").concat(t.total.toFixed(2),"</td>\n        </tr>\n        ")}),document.getElementById("cart-tbody-receipt").innerHTML=e,document.getElementById("cart-total-receipt").innerText=sumPurchasedTotal(t).toFixed(2)}function sumPurchasedTotal(t){return t.reduce(function(t,e){return t+e.total},0)}viewCartTable(),setSorting();