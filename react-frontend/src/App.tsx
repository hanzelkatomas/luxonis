import {useEffect, useState} from 'react'
import './App.css'
import PropertyCard from "./components/Card.tsx";
import {Property} from "./types";
import Layout from "./components/Layout.tsx";
import Pagination from "./components/Pagination.tsx";

const ITEMS_PER_PAGE = 20

function App() {
  const [propertyOffers, setPropertyOffers] = useState<Property[]>([])
  const [itemsCount, setItemsCount] = useState<number>(0)
  const [page, setPage] = useState<number>(1)

  useEffect(() => {
    fetch(`http://localhost:8000?page=${page}&limit=${ITEMS_PER_PAGE}`)
      .then(response => response.json())
      .then(data => {
        setItemsCount(data.totalCount)
        setPropertyOffers(data.items)
      })
  }, [page]);

  return (
    <Layout>
      <h1 className="text-center font-sans font-semibold mb-12">Awesome flat offers in Czech Republic</h1>
      <div className="ml-5 flex flex-row flex-wrap gap-12 justify-center w-100">
        {propertyOffers.map((propertyOffer) => (
          <PropertyCard {...propertyOffer}/>
        ))}
        <Pagination page={page} setPage={setPage} itemsCount={itemsCount} itemsPerPage={ITEMS_PER_PAGE}/>
      </div>
    </Layout>
  )
}

export default App
