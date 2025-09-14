import { useState } from 'react'
import { useTheme } from '../context/ThemeContext';



function Home() {
  type Animal = {
    name: string;
    description: string;
    Features: string[];
  }

  const animals: Animal[] = [
    {
      name: "Lion",
      description: `Le lion est un grand félin carnivore, souvent appelé "roi de la jungle", bien qu'il vive 
                    principalement dans les savanes africaines.`,
      Features : [
        "Mammifère",
        "Carnivore",
        "Vie en groupe",
      ]
    },
    {
      name: "Tigre",
      description: `Le tigre est le plus grand félin sauvage au monde, reconnaissable à ses rayures uniques et 
      à sa puissance impressionnante.`,
      Features : [
        "Solitaire ",
        "Nageur expert",
        "Menacé d'extinction",
      ]
    },
    {
      name: "Eléphant",
      description: `L'éléphant est le plus grand animal terrestre, connu pour son intelligence, sa mémoire et sa 
      trompe ultra-précise.`,
      Features : [
        "Mammifère très social",
        "Herbivore",
        "Oreilles géantes",
      ]
    },
    {
      name: "Loup",
      description: "Le loup est un prédateur intelligent et social, vivant en meute et jouant un rôle clé dans les écosystèmes.",
      Features : [
        "Vie en meute hiérarchisée",
        "Communication complexe",
        "Grande endurance",
      ]
    }
  ]

  const [count, setCount] = useState<number>(0)
  const [name, setName] = useState<string>("")

  const welcome = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    alert("Bienvenue " + name)
    setName("")
  }

  const { theme } = useTheme()

  return (
    <>
        <div className={`border-base-300 p-4 ${ theme ? "bg-white text-black" : "bg-neutral text-white"}`}>
            <div className={`flex flex-col justify-center items-center p-4 ${ theme ? "bg-base-300 text-black" : "bg-neutral-500 text-white"}`}>
                <h1 className='font-poppins'>Bienvenue !</h1>
                <p>J'ai reçu {count} cliques</p>
                <button className="btn btn-outline btn-primary" onClick={() => setCount(count + 1)}>Compteur</button>
            </div>
            <div className="divider"></div>
            <div className={`place-items-center p-4 ${ theme ? "bg-base-300" : "bg-neutral-500"}`}>
                <form className='' onSubmit={welcome}>
                    <fieldset className={`fieldset border-base-300 w-xs p-8 ${ theme ? "bg-base-200" : "bg-neutral-400"}`}>
                    <input 
                    type="text"
                    value={name}
                    className={`input ${ theme ? "bg-base-200" : "bg-neutral-400"}`}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Votre nom SVP" required/>
                    <button className="btn btn-primary" type="submit">Envoyer</button>
                    </fieldset>
                </form>
            </div>
            <div className="divider"></div>
            <div className={`${ theme ? "bg-base-300" : "bg-neutral-500"} p-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`}>
                {animals.map((animal, index) => (
                    <div key={index} className={`card shadow-sm ${ theme ? "bg-base-200" : "bg-neutral-600"}`}>
                        <div className="card-body">
                          <h2 className="card-title text-primary font-bold">{animal.name}</h2>
                          <p>{animal.description}</p>
                          <h3 className="font-bold text-primary">Caractéristiques</h3>
                          <div>
                            <ul>
                              {animal.Features.map((feature, featureIndex) => (
                                <li key={featureIndex}>{feature}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                    </div>
                  ))
                }
            </div>
        </div>
    </>
  )
}

export default Home
