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
    // TODO get from env, docker URL will be different
    fetch(`http://localhost:8080?page=${page}&limit=${ITEMS_PER_PAGE}`)
      .then(response => response.json())
      .then(data => {
        setItemsCount(data.totalCount)
        setPropertyOffers(data.items)
      })
  }, [page]);

  return (
    <Layout>
      <div className="ml-5 flex flex-col gap-16 items-center w-100">
        {propertyOffers.map((propertyOffer) => (
          <PropertyCard {...propertyOffer}/>
        ))}
        <Pagination page={page} setPage={setPage} itemsCount={itemsCount} itemsPerPage={ITEMS_PER_PAGE}/>
      </div>
    </Layout>
  )
}

export default App
