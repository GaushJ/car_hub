"use client"
import { useState, useEffect } from 'react'
import CustomFilter from '@/components/Custom filter/CustomFilter'
import Hero from '@/components/Hero/hero'
import SearchBar from '@/components/SearchBar/SearchBar'
import Image from 'next/image'
import { fetchCars } from './utils'
import CardCard from '@/components/carCard/CarCard'
import { filterProps } from '@/types'
import { fuels, manufacturers, yearsOfProduction } from '@/constants'
import ShowMore from '@/components/show more/ShowMore'

export default function Home() {

  const [allCars, setAllCars] = useState([])
  const [loading, setLoading] = useState(false)

  //search states
  const [maufacturer, setManufacturer] = useState("")
  const [model, setModel] = useState("")

  //filter states
  const [fuel, setFuel] = useState("")
  const [year, setYear] = useState(2022)

  //pagination state
  const [limit, setLimit] = useState(10)

  const getCars = async () => {
    setLoading(true)
    try {
      const result = await fetchCars({
        manufacturer: maufacturer || "",
        year: year || 2022,
        fuel: fuel || '',
        limit: limit || 10,
        model: model || "",
      })

      setAllCars(result);
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    getCars()
  }, [fuel, year, limit, manufacturers, model])

  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars
  console.log(allCars)
  return (
    <main className="overflow-hidden">
      <Hero />
      <div id='discover' className='mt-12 padding-x padding-y max-width'>
        <div className='home__text-container'>
          <h1 className='text-4xl font-extrabold'>Car Catalogue</h1>
          <p> Explore the cars you might like </p>
        </div>

        <div className='home__filters'>
          <SearchBar />
          <div className='home__filter-container'>
            <CustomFilter title="fuel" options={fuels} />
            <CustomFilter title="year" options={yearsOfProduction} />
          </div>
        </div>
        {!isDataEmpty ? (
          <section>
            <div className='home__cars-wrapper'>
              {allCars.map((car) => <CardCard car={car} />)}
            </div>
            <ShowMore
              pageNumber={(limit || 10) / 10}
              isNext={(limit || 10) > allCars.length}
            />
          </section>
        ) : (
          <div className='home__error-container'>
            <h2 className='text-black text-xl font-bold'>
              No cars found
            </h2>
            <p>{allCars?.message}</p>
          </div>
        )}

      </div>
    </main>
  )
}
