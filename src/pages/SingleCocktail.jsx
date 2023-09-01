import React from 'react'
import Loading from '../components/Loading'
import { useParams, Link} from 'react-router-dom'
import { useEffect } from 'react'
import axios from 'axios'
const url = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i='


const SingleCocktail = () => {
  const {id} = useParams();
  const [loading, setLoading] = React.useState(false);
  const [cocktail, setCocktail] = React.useState(null);

  useEffect(()=>{
    const fetchDrink = async (URL) =>{
    setLoading(true);
    try{
      const {data:{drinks}} = await axios.get(`${URL}${id}`);
      if(drinks)
      {
        const newCocktails = drinks.map((cocktail) => {
          const ingredients = Object.entries(cocktail).reduce((acc, curr) => {
            if (curr[0].includes("strIngredient") && curr[1]) acc.push(curr[1]);
            return acc;
          }, []);

          const {
            idDrink: id,
            strDrink: name,
            strCategory: category,
            strAlcoholic: info,
            strGlass: glass,
            strInstructions: instructions,
            strDrinkThumb: image,
          } = cocktail;
          return {
            id,
            name,
            category,
            info,
            glass,
            instructions,
            ingredients,
            image,
          };
        });
        setCocktail(newCocktails);
      }
      else
      {
        setCocktail(null);
      }
      setLoading(false);
    }
    catch(err){
      console.log(err);
      setLoading(false);
    }
  }
    fetchDrink(url);
  },[id]) 
  
  if(loading)
  {
    return <Loading />
  }
  if(!cocktail)
  {
    return <h2 className='section-title'>no cocktail to display</h2>
  }


  return (
    <section className='section cocktail-section'>
      <Link to='/' className='btn btn-primary'>Back Home</Link>
      {
        cocktail.map((drink)=>{
          const {id,name,category,info,glass,instructions,ingredients,image} = drink;
          return (
            <div key={id}>
              <h1 className='section-title'>{name}</h1>
              <div className="drink">
                <img src={image} alt={name} />
                <div className="drink-info">
                  <p>
                    <span className='drink-data'>name :</span>{name} 
                  </p>
                  <p>
                    <span className='drink-data'>category :</span>{category} 
                  </p>
                  <p>
                    <span className='drink-data'>info :</span>{info} 
                  </p>
                  <p>
                    <span className='drink-data'>glass :</span>{glass} 
                  </p>
                  <p>
                    <span className='drink-data'>instructions :</span>{instructions} 
                  </p>
                  <p>
                    <span className='drink-data'>ingredients :</span>{ingredients.join(', ')} 
                  </p>
                </div>
              </div>
            </div>
          )
        })
      }
    </section>
  )
}

export default SingleCocktail
