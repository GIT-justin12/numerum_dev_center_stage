const utilisateur = {
  nom: "Amira",
  age: 22,
  email: "amira@mail.com",
  adresse: {
    ville: "Paris",
    pays: "France"
  }
};

const afficherProfil = () => {
    let { nom, age, adresse: {ville} } = utilisateur
    const message = `${nom} a ${age} ans et vit à ${ville}.`
    console.log(message)
}

afficherProfil()
