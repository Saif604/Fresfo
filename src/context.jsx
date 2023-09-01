import axios from 'axios';
import React, { useState, useContext, useEffect } from 'react'
import { useCallback } from 'react'
import Loading from './components/Loading'

const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('a');
  const [cocktails, setCocktails] = useState([]);

  const fetchCocktails = useCallback(async (URL) =>{
    setLoading(true);
    try{
      const {data:{drinks}} = await axios.get(`${URL}${searchTerm}`);  //adding the searchTerm to baseURL
      if(drinks){
        const newCocktails = drinks.map(cocktail =>{
          const ingredients = Object.entries(cocktail).reduce((acc,curr)=>{
            if (curr[0].includes("strIngredient") && curr[1])
            acc.push(curr[1]);
            return acc;
          },[])

          const {
            idDrink: id,
            strDrink: name,
            strCategory: category,
            strAlcoholic: info,
            strGlass: glass,
            strInstructions:instructions,
            strDrinkThumb:image
          } = cocktail;

          return {id,name,category,info,glass,instructions,ingredients,image};
        })
        setCocktails(newCocktails);
      }
      else{
        setCocktails([]);
      }
      setLoading(false);
    }
    catch(err){
      console.log(err);
      setLoading(false);
    }
  },[searchTerm])

  useEffect(()=>{
    fetchCocktails(url)
  },[searchTerm,fetchCocktails]);

  return (
    <AppContext.Provider value={{loading,cocktails,setSearchTerm,}}>
      {children}
    </AppContext.Provider>
  )
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
