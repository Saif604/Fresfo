import React from 'react'
import Cocktail from './Cocktail'
import Loading from './Loading'
import { useGlobalContext } from '../context'

const CocktailList = () => {
  const {cocktails,loading} = useGlobalContext();
  
  if(loading)
  {
    return <Loading />
  }
  if(!cocktails.length)
  {
    return (<h2 className='section-title'>No Cocktails Matched Your Search Criteria</h2>)
  }

  return (
    <section className="section">
      <h2 className="section-title">cocktails</h2>
      <div className="cocktails-center">
        {
          cocktails.map((cocktail)=>{
            const {id} = cocktail;
            return <Cocktail key={id} {...cocktail} />
          })
        }
      </div>
    </section>
  )
}

export default CocktailList
