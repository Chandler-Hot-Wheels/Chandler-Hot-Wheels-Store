let cart = [];
let total = 0;

function addToCart(name, price) {
    cart.push({ name, price });
    total += price;

    document.getElementById("cart-count").textContent = cart.length;
    document.getElementById("cart-total").textContent = total.toFixed(2);

    const li = document.createElement("li");
    li.textContent = `${name} - $${price.toFixed(2)}`;
    document.getElementById("cart-items").appendChild(li);
}
