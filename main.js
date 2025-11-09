import { Products } from "./models/Products.js";
import { CartItem } from "./models/CartItem.js";

const data = [
    {
        "id": "1",
        "name": "iphoneX",
        "price": 1000,
        "screen": "screen 68",
        "backCamera": "2 camera 12 MP",
        "frontCamera": "7 MP",
        "img": "https://cdn.tgdd.vn/Products/Images/42/114115/iphone-x-64gb-hh-600x600.jpg",
        "desc": "Thiết kế mang tính đột phá",
        "type": "iphone"
    },
    {
        "id": "2",
        "name": "Samsung Galaxy M51 ",
        "price": 3500,
        "screen": "screen 69",
        "backCamera": " Chính 64 MP & Phụ 12 MP, 5 MP, 5 MP",
        "frontCamera": " 32 MP",
        "img": "https://cdn.tgdd.vn/Products/Images/42/217536/samsung-galaxy-m51-trang-new-600x600-600x600.jpg",
        "desc": "Thiết kế đột phá, màn hình tuyệt đỉnh",
        "type": "Samsung"
    },
    {
        "id": "3",
        "name": "Samsung Galaxy M22",
        "price": 45000,
        "screen": "screen 70",
        "backCamera": "Chính 12 MP & Phụ 64 MP, 12 MP",
        "frontCamera": " 32 MP",
        "img": "https://cdn.tgdd.vn/Products/Images/42/217536/samsung-galaxy-m51-trang-new-600x600-600x600.jpg",
        "desc": "Thiết kế mang tính đột phá",
        "type": "Samsung"
    },
    {
        "id": "4",
        "name": "Iphone 11",
        "price": 1000,
        "screen": "screen 54",
        "backCamera": "Camera: Chính 12 MP & Phụ 64 MP, 12 MP",
        "frontCamera": "32 MP",
        "img": "https://cdn.tgdd.vn/Products/Images/42/114115/iphone-x-64gb-hh-600x600.jpg",
        "desc": "Thiết kế đột phá, màn hình tuyệt đỉnh",
        "type": "Iphone"
    }
];

const API_URL = "https://6905a268ee3d0d14c13329ce.mockapi.io/mobile";

// data.forEach(async (item) => {
//     try {
//         const res = await axios.post(API_URL, item);
//         console.log("✅ Added:", res.data);
//     } catch (err) {
//         console.error("❌ Error:", err);
//     }
// });


const renderProducts = (product) => {
    let pbodyHTML = "";


    product.forEach(item => {
        pbodyHTML += `
        <div class="">
                    <div class="card cardPhone">
                        <img src="${item.img}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <div class="flex justify-between">
                                <div>
                                    <h3 class="cardPhone__name">${item.name}</h3>
                                    <p class="cardPhone__text">${item.screen}</p>
                                    <p class="cardPhone__text">${item.backCamera}</p>
                                    <p class="cardPhone__text">${item.frontCamera}</p>
                                    <p class="cardPhone__text">${item.desc}</p>
                                    <p class="cardPhone__text">${item.type}</p>
                                </div>
                                <div>
                                    <h3 class="cardPhone__title">$${item.price}</h3>
                                </div>
                            </div>
                            <div class="flex justify-between">
                                <div class="cardPhone__rating">
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                </div>
                                <div>z
                                    <button class="btnPhone-shadow" id=${item.id}> <a href="./public/detail.html" target="_blank> <i class="fa fa-shopping-cart"></i> Buy Now</a></button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
        `

    });

    const pbody = document.getElementById("pbody");
    pbody.innerHTML = pbodyHTML;


}


const getProducts = async () => {
    try {
        const response = await axios("https://6905a268ee3d0d14c13329ce.mockapi.io/mobile", {
            method: "GET",
        })
        // console.log("Mon ~ response: ", response);
        localStorage.setItem("products", JSON.stringify(response.data));
        renderProducts(response.data);
    } catch (error) {
        console.log("Error");
    }
}

getProducts();

// show a detaild item with name

document.addEventListener("click", (e) => {
    if (e.target.closest(".btnPhone-shadow")) {
        const id = e.target.closest(".btnPhone-shadow").id;
        localStorage.setItem("selectedProductId", id);
    }
});


const renderDetailedItem = (products) => {
    const id = localStorage.getItem("selectedProductId");
    const selected = products.find((item) => item.id === id);
    const productItem = document.getElementById("productItem_tbody");


    if (!selected) {
        productItem.innerHTML = "<p>Product not found</p>";
        return;
    }
    const productItemHtml = `
    <div class="content__left col-span-8">
            <div class="content__img">
                <img src="${selected.img}" alt="">
            </div>
            <div class="content__detailed">
                <h1>Chi tiết sản phẩm</h1>
                <div class="specs">
                    <div class="spec grid grid-cols-2">
                        <span class="spec__title">Hệ điều hành:</span>
                        <span class="spec__value">Android 15</span>
                    </div>
                    <div class="spec grid grid-cols-2">
                        <span class="spec__title">Chip xử lý (CPU):</span>
                        <span class="spec__value">MediaTek Dimensity 6300 5G 8 nhân</span>
                    </div>
                    <div class="spec grid grid-cols-2">
                        <span class="spec__title">Tốc độ CPU:</span>
                        <span class="spec__value">2.4 GHz</span>
                    </div>
                    <div class="spec grid grid-cols-2">
                        <span class="spec__title">RAM:</span>
                        <span class="spec__value">12 GB</span>
                    </div>
                </div>
            </div>
        </div>
        <div id="content__right" class="content__right col-span-4">
            <div class="content__items">
                <p>$${selected.price}</p>
                <button id=${selected.id} class="btn_left addToCartBtn"><i class="fa-solid fa-cart-shopping"></i> Thêm vào giỏ hàng</button>
                <button class="btn_right">Mua ngay</button>
            </div>
        </div>
    `;

    // id="addToCartBtn"

    productItem.innerHTML = productItemHtml;


    //

};


const getProductItemByName = async () => {
    try {
        const response = await axios("https://6905a268ee3d0d14c13329ce.mockapi.io/mobile", {
            method: "GET",
        })
        renderDetailedItem(response.data);
    } catch (error) {
        console.log("Error");
    }
}

getProductItemByName()


const typeOfPhone = async () => {
    try {
        const res = await axios.get(API_URL);
        const allProducts = res.data

        renderProducts(allProducts);

        // Handle select change
        document.getElementById("productFilter").addEventListener("change", (e) => {
            const selectedType = e.target.value;

            if (selectedType === "all") {
                renderProducts(allProducts);
            } else {
                const filtered = allProducts.filter(
                    (p) => p.type.toLowerCase() === selectedType.toLowerCase()
                );
                renderProducts(filtered);
            }
        });

    } catch (error) {
        console.error("Error fetching products", err);
    }

}

typeOfPhone();





// Initialize variables


const renderAddCart = (cart) => {
    let cartItemHtml = "";


    cart.forEach(item => {
        cartItemHtml += `
                <div class="grid grid-cols-12">
                    <div class="col-span-3">
                        <img src=${item.img} alt="">
                    </div>
                    <div class="col-span-6">
                        <h1>Điện thoại Iphone 14T 5G 12GB/256GB</h1>
                        <p>Màu sắc</p>
                        <p>Flash sale kết đã kết thúc</p>
                        <p>Khuyến mãi</p>
                    </div>
                    <div class="col-span-3">
                        <p>$1000</p>
                    </div>
                </div>
        `

    });

    const pbody = document.getElementById("cartItemBottom");
    pbody.innerHTML = cartItemHtml;


}



document.addEventListener("click", (e) => {
    const btn = e.target.closest(".addToCartBtn");

    if (!btn) return;

    // Get current count
    let count = Number(localStorage.getItem("cartCount")) || 0;


    // Increase it
    count++;

    // Save back to localStorage
    localStorage.setItem("cartCount", count);

    // console.log("New cart count:", count);


    // Update UI immediately
    const cartCountEl = document.getElementById("cartCount");
    if (cartCountEl) cartCountEl.textContent = count;

});

let cart = [];
document.addEventListener("click", (e) => {
    const btn = e.target.closest(".addToCartBtn");

    if (!btn) return;

    const id = btn.id;
    console.log("Product ID:", id);

    const products = JSON.parse(localStorage.getItem("products")) || [];
    // console.log("Products: ", products);

    const cartProducts = products.filter(p => Number(p.id) === Number(id));
    // console.log("cartProducts: ", cartProducts);

    // let cartProductItem = {};

    const existing = cart.find(item => item.name === cartProducts[0].name);
    if (existing) {
        existing.quantity += 1;
    } else {
        const { name, price, screen, blackCamera, frontCamera, img, desc, type } = cartProducts[0];
        const cartProductItem = new CartItem(name, price, screen, blackCamera, frontCamera, img, desc, type);
        cart.push(cartProductItem);
    }
    // Save back to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));
    console.log("succeed")


});


document.addEventListener("DOMContentLoaded", () => {
    const getCartItem = () => {
        const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
        renderAddCart(cartItems);
    }

    getCartItem();
});



window.addEventListener("load", () => {
    // localStorage.removeItem("cartCount");
});



