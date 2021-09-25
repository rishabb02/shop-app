const API = {
    baseURL: "http://localhost:4000",
    getProducts: () => {
        return fetch(`http://localhost:4000/products`)
    }
}
const Elements = {
    button: document.querySelector("#searchbutton"),
    input: document.querySelector(".searchText"),
    form: document.querySelector("#form"),
    productsDiv: document.querySelector(".products"),
    goBack: document.querySelector("#goBack"),
    addProd: document.querySelector("#addProd"),
    modal: document.querySelector(".modal"),
    closeModal: document.querySelector(".closeModal"),
    submitForm: document.querySelector(".newProdForm"),
    formInputs: document.querySelectorAll(".newProdData")
}
const Product = {
    createCard: (productData) => {
        return `
        <img class="productImage" src=${productData.img} alt=${productData.name}>
        <h1>${productData.name}</h1>
        <h3>$${productData.price}</h3>
        <p>${productData.description}</p>
        `
    },
    renderCard: (productHtml) => {
        const newDiv = document.createElement("div")
        newDiv.classList.add("product")
        newDiv.innerHTML = productHtml
        Elements.productsDiv.appendChild(newDiv)
    },
    renderAllCards: (data) => {
        Elements.productsDiv.innerHTML = ""
        data.forEach(element => {
            const HTML = Product.createCard(element)
            Product.renderCard(HTML)
        });
    },
    fetchProducts: () => {
        API.getProducts()
            .then(response => response.json())
            .then((data) => {
                Data.allProducts = data
                Data.filteredProducts = data
            })
            .then(() => {
                Product.renderAllCards(Data.allProducts)   
            })
    },
    addProduct: (data) => {
        fetch("/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => {
                Product.fetchProducts()
            })
            .catch(error => console.log(error))
    }
}
const Data = {
    allProducts: [],
    filteredProducts: [],
}



Elements.form.addEventListener("submit", (e) => {
    e.preventDefault()
    console.log(Elements.input.value)
    const filtered = Data.allProducts.filter((item) => {
        // const nameMatches = item.name === Elements.input.value
        const lowerNameMatches = item.name.toLowerCase() === Elements.input.value.toLowerCase()
        console.log(lowerNameMatches)
        const tagMatches = item.tags.includes(Elements.input.value)
        return lowerNameMatches || tagMatches
        // make a variable for if the name matches (it will be tru or false)
        // make a variablw if the search text is included in the products tags
        // want to return if either of the variables is true; return first variable or second variable
    })
    console.log(filtered)
    Data.filteredProducts = filtered
    Elements.productsDiv.innerHTML = ""
    Data.filteredProducts.forEach(element => {
        const HTML = Product.createCard(element)
        Product.renderCard(HTML)
    });

    Elements.goBack.classList.toggle("hidden")
})


Elements.goBack.addEventListener("click", () => {
    Elements.productsDiv.innerHTML = ""
    Data.allProducts.forEach(element => {
        const HTML = Product.createCard(element)
        Product.renderCard(HTML)
    });
    Elements.goBack.classList.toggle("hidden")
})

Elements.addProd.addEventListener("click", () => {
    Elements.modal.classList.toggle("hidden")

})

Elements.closeModal.addEventListener("click", () => {
    Elements.modal.classList.toggle("hidden")
})

Elements.submitForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const newProd = {

    }
    for (var i = 0; i < Elements.formInputs.length; i++) {
        const el = Elements.formInputs[i]
        newProd[el.name] = el.value
    }
    Product.addProduct(newProd)
    Elements.modal.classList.toggle("hidden")
})
Product.fetchProducts()