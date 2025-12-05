// script.js

// Dữ liệu sản phẩm (Giữ nguyên)
const products = [
  { id: 1, name: "Chôm chôm Vĩnh Long", price: 48000, img: "https://clv.vn/wp-content/uploads/2019/10/chom-chom-globalgap-min.jpg", desc: "Chôm chôm tróc hạt, vị ngọt đậm đà, cùi dày. Đặc sản Vĩnh Long chính hiệu." },
  { id: 2, name: "Dâu tây Đà Lạt", price: 190000, img: "https://traicayvuongtron.vn/resources/cache/original_xxxxx/WEBSITE%202023/tim%20hieu%20them/blog/kinh%20nghiem%2Cmeo%20vat/trai%20cay/trai%20cay%20dac%20san/daudalatlagi/dau-tay-da-lat.gif", desc: "Dâu tây Đà Lạt tươi ngon, hái tại vườn. Vị chua ngọt thanh mát, giàu vitamin." },
  { id: 3, name: "Dừa Bến Tre", price: 15000, img: "https://media.loveitopcdn.com/22928/thumb/dua-xiem-xanh-ben-tre.jpg", desc: "Dừa xiêm xanh Bến Tre nước ngọt lịm, cùi dừa vừa ăn. Giải khát tuyệt vời." },
  { id: 4, name: "Nho xanh Ninh Thuận", price: 100000, img: "https://nongsandungha.com/wp-content/uploads/2024/08/nho-xanh-ninh-thuan.jpg", desc: "Nho xanh Ninh Thuận giòn, ngọt, không hạt. Chùm to đẹp mắt." },
  { id: 5, name: "Xoài Cát Hòa Lộc", price: 80000, img: "https://cdn.tgdd.vn/Files/2017/12/03/1047079/nguon-goc-xoai-cat-hoa-loc-va-cach-chon-xoai-cat-hoa-loc-tuoi-ngon-202302251347125690.jpg", desc: "Vua của các loại xoài. Xoài Cát Hòa Lộc thơm lừng, thịt vàng ươm, ngọt sắc." },
  { id: 6, name: "Vải thiều Thanh Hà", price: 90000, img: "https://cdn.tgdd.vn/2021/07/CookProduct/1-1200x676-6.jpg", desc: "Vải thiều hạt nhỏ, cùi dày, mọng nước. Đặc sản nổi tiếng miền Bắc." },
  { id: 7, name: "Thanh Long Bình Thuận", price: 30000, img: "https://thucphamvanquy.com/wp-content/uploads/2019/10/thanh-long-ru%E1%BB%99t-tr%E1%BA%AFng.png", desc: "Thanh long ruột trắng Bình Thuận, vị ngọt thanh, tính mát." },
  { id: 8, name: "Măng cụt Chợ Lách", price: 75000, img: "https://cdn-images.vtv.vn/zoom/700_438/2019/6/15/photo-2-1500599816327-15269608981031547982463-156057123979899840711.jpg", desc: "Măng cụt Chợ Lách múi trắng ngần, ngọt thanh xen lẫn vị chua nhẹ hấp dẫn." },
  { id: 9, name: "Sầu Riêng Ri6", price: 150000, img: "https://product.hstatic.net/200000157781/product/sau_rieng_ri6_977b4b436948421fabd583bbd83f2fb8.png", desc: "Sầu riêng Ri6 múi vàng hạt lép, béo ngậy, thơm nức mũi."}
];

let cart = [];
let currentProductId = null;

// Hàm hiển thị sản phẩm ra màn hình (Giữ nguyên)
function render() {
  const container = document.getElementById('product-list');
  container.innerHTML = ''; 
  products.forEach(p => {
    container.innerHTML += `
      <div class="product-card">
        <img src="${p.img}" class="product-image">
        <div class="product-name">${p.name}</div>
        <div class="product-price">${p.price.toLocaleString('vi-VN')} đ/Kg</div>
        <div class="btn-group">
          <button class="btn btn-view" onclick="openModal(${p.id})">Xem thêm</button>
          <button class="btn btn-add" onclick="quickAdd(${p.id})">Thêm vào giỏ</button>
        </div>
      </div>
    `;
  });
}

// Hàm cập nhật giỏ hàng chi tiết (Mới)
function updateCartList() {
    const cartItemsDiv = document.getElementById('cart-items');
    const totalSpan = document.getElementById('total-price');
    cartItemsDiv.innerHTML = '';
    
    let total = 0;
    
    // 1. Gom nhóm sản phẩm giống nhau để hiển thị
    const groupedCart = {};
    cart.forEach(item => {
        if (!groupedCart[item.id]) {
            groupedCart[item.id] = { ...item, totalQty: 0 };
        }
        groupedCart[item.id].totalQty += item.qty;
    });

    // 2. Hiển thị danh sách chi tiết
    for (const id in groupedCart) {
       const item = groupedCart[id];
       const itemTotal = item.price * item.totalQty;
       total += itemTotal;
       
       cartItemsDiv.innerHTML += `
         <div class="cart-item">
           <span style="font-weight: bold;">${item.name} (x${item.totalQty})</span>
           
           <span style="display:flex; align-items:center;">
             <button style="width:20px; height:20px; border:1px solid #ddd; background:#eee; cursor:pointer;" 
                     onclick="decreaseItem(${item.id})">-</button>
             
             <span style="margin: 0 5px;">${itemTotal.toLocaleString('vi-VN')}đ</span>
             
             <button style="width:20px; height:20px; border:none; background:#ff6347; color:white; border-radius:3px; cursor:pointer;"
                     onclick="removeItem(${item.id})">X</button>
           </span>
         </div>
       `;
    }

    totalSpan.innerText = total.toLocaleString('vi-VN');
    
    // Ẩn/Hiện khu vực giỏ hàng
    const cartSec = document.getElementById('cart-section');
    cartSec.style.display = cart.length > 0 ? 'block' : 'none';
}


// HÀM MỚI: Giảm số lượng sản phẩm
function decreaseItem(id) {
    const index = cart.findIndex(item => item.id === id);
    if (index !== -1) {
        if (cart[index].qty > 1) {
            cart[index].qty--; // Giảm số lượng
            alert(`Đã giảm số lượng ${cart[index].name}.`);
        } else {
            // Nếu số lượng là 1, hỏi xem có muốn xóa không
            if (confirm(`Bạn có muốn xóa ${cart[index].name} khỏi giỏ hàng không?`)) {
                cart.splice(index, 1); // Xóa khỏi mảng
                alert(`Đã xóa ${cart[index].name} khỏi giỏ.`);
            }
        }
    }
    updateCartList(); // Cập nhật lại giao diện
}

// HÀM MỚI: Xóa hẳn sản phẩm khỏi giỏ hàng
function removeItem(id) {
    // Xóa tất cả các mục có cùng ID khỏi giỏ hàng
    const product = products.find(p => p.id === id);
    cart = cart.filter(item => item.id !== id);
    alert(`Đã xóa tất cả ${product.name} khỏi giỏ hàng.`);
    updateCartList(); // Cập nhật lại giao diện
}

function toggleCart() {
   const cartSec = document.getElementById('cart-section');
   // Đảo trạng thái hiện/ẩn (nếu hiện thì ẩn, nếu ẩn thì hiện)
   cartSec.style.display = cartSec.style.display === 'none' || cart.length === 0 ? 'block' : 'none';
   if(cart.length === 0 && cartSec.style.display === 'block') {
       alert("Giỏ hàng chưa có sản phẩm nào!");
       cartSec.style.display = 'none';
   }
}


// --- XỬ LÝ THÊM VÀO GIỎ (Điều chỉnh để gọi updateCartList) ---
function addToCart(id, quantity) {
  const product = products.find(p => p.id === id);
  
  const existingItem = cart.find(i => i.id === id);
  
  if (existingItem) {
    existingItem.qty += quantity;
  } else {
    cart.push({ ...product, qty: quantity });
  }
  
  updateCartList(); // Cập nhật danh sách chi tiết
}

// --- XỬ LÝ POPUP VÀ CHECKOUT (Giữ nguyên) ---
function openModal(id) {
  const p = products.find(x => x.id === id);
  currentProductId = id;
  
  document.getElementById('m-img').src = p.img;
  document.getElementById('m-name').innerText = p.name;
  document.getElementById('m-price').innerText = p.price.toLocaleString('vi-VN') + 'đ';
  document.getElementById('m-desc').innerText = p.desc;
  document.getElementById('m-qty').value = 1;
  
  document.getElementById('product-modal').style.display = 'flex';
}

function closeModal() {
  document.getElementById('product-modal').style.display = 'none';
}

window.onclick = function(event) {
  const modal = document.getElementById('product-modal');
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

function adjustQty(amount) {
  const input = document.getElementById('m-qty');
  let val = parseInt(input.value) + amount;
  if (val < 1) val = 1;
  input.value = val;
}

function quickAdd(id) {
  addToCart(id, 1);
}

function addFromModal() {
  const qty = parseInt(document.getElementById('m-qty').value);
  addToCart(currentProductId, qty);
  closeModal();
}

function checkout() {
  if(cart.length === 0) { alert("Giỏ hàng trống!"); return; }
  
  let message = "Đơn hàng mới:\n";
  let total = 0;
  
  cart.forEach(item => {
     total += item.price * item.qty;
     message += `- ${item.name}: ${item.qty}kg (${(item.price * item.qty).toLocaleString('vi-VN')}đ)\n`;
  });
  
  message += `\nTổng tiền: ${total.toLocaleString('vi-VN')}đ`;
  
  const ZALO_PHONE = '0967745329'; 
  const confirmation = confirm(message + "\n\nBấm OK để gửi qua Zalo.");
  
  if (confirmation) {
    window.open(`https://zalo.me/${ZALO_PHONE}?text=${encodeURIComponent(message)}`, '_blank');
  }
}

render();