import {useEffect, useState} from 'react'
import './App.css'
import PropertyCard from "./components/Card.tsx";
import {Property} from "./types";
import Layout from "./components/Layout.tsx";

function App() {
  const [propertyOffers, setPropertyOffers] = useState<Property[]>([])

  useEffect(() => {
    // TODO get from env docker URL will be different
    fetch('http://localhost:8080')
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setPropertyOffers(data)
      })
  }, []);

  return (
    <Layout>
      <div className="ml-5 flex flex-col gap-16 items-center w-100">
        {propertyOffers.map((propertyOffer) => (
          <PropertyCard {...propertyOffer}/>
        ))}
      </div>
    </Layout>
  )
}

export default App
