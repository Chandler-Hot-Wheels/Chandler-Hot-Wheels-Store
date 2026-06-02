let cart = [];
let total = 0;

function addToCart(name, price) {
    cart.push({ name, price });

    total += Number(price);

    document.getElementById("cart-count").textContent = cart.length;
    document.getElementById("cart-total").textContent = total.toFixed(2);

    const li = document.createElement("li");
    li.textContent = `${name} - $${price}`;
    document.getElementById("cart-items").appendChild(li);
}

function saveListings(listings) {
    localStorage.setItem("hotwheelListings", JSON.stringify(listings));
}

function loadListings() {
    const listings =
        JSON.parse(localStorage.getItem("hotwheelListings")) || [];

    const container =
        document.getElementById("productContainer");

    container.innerHTML = "";

    listings.forEach((item, index) => {

        const card = document.createElement("div");
        card.className = "product";

        card.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>${item.description}</p>
            <p><strong>$${item.price}</strong></p>

            <button onclick="addToCart('${item.name}', ${item.price})">
                Buy Now
            </button>

            <button onclick="deleteListing(${index})">
                Delete
            </button>
        `;

        container.appendChild(card);
    });
}

function addListing() {

    const name =
        document.getElementById("itemName").value;

    const description =
        document.getElementById("itemDescription").value;

    const price =
        document.getElementById("itemPrice").value;

    const imageFile =
        document.getElementById("itemImage").files[0];

    if (!name || !price || !imageFile) {
        alert("Please fill out all fields.");
        return;
    }

    const reader = new FileReader();

    reader.onload = function(e) {

        const listings =
            JSON.parse(localStorage.getItem("hotwheelListings")) || [];

        listings.push({
            name,
            description,
            price,
            image: e.target.result
        });

        saveListings(listings);
        loadListings();

        document.getElementById("itemName").value = "";
        document.getElementById("itemDescription").value = "";
        document.getElementById("itemPrice").value = "";
        document.getElementById("itemImage").value = "";
    };

    reader.readAsDataURL(imageFile);
}

function deleteListing(index) {

    const listings =
        JSON.parse(localStorage.getItem("hotwheelListings")) || [];

    listings.splice(index, 1);

    saveListings(listings);
    loadListings();
}

window.onload = function() {
    loadListings();
};
