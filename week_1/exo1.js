const panier = [
    { nom: "Pommmes", prix: 2 },
    { nom: "Bananes", prix: 1.5 }
];

const ajouterProduit = (panier, newProduct) => {
    panier.push(newProduct)
    return panier
}

const productOne = ajouterProduit(panier, {nom:"Orange", prix: 12})

const totalPrice = panier.reduce((total, product) => total + product.prix, 0)

console.log(`Panier mis à jour : ${panier.length} produits, total = ${totalPrice}`)
