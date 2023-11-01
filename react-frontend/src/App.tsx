import {useEffect, useState} from 'react'
import './App.css'
import PropertyCard from "./components/Card.tsx";
import {Property} from "./types";

function App() {
  const [propertyOffers, setPropertyOffers] = useState<Property[]>([])

  useEffect(() => {
    fetch('http://localhost:8080')
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setPropertyOffers(data)
      })
  }, []);

  return (
    <>
      <div className="ml-5">
        <PropertyCard {...propertyOffers[0]} />
      </div>
    </>
  )
}

export default App
