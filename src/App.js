//import logo from './logo.svg';
import React, { useState, useEffect } from 'react'
//import { FaSearch } from 'react-icons/fa'
import Photo from './Photo'
//const mainUrl = `https://api.unsplash.com/photos/`
//const searchUrl = `https://api.unsplash.com/search/photos/`

const collectionUrl = `https://api.unsplash.com/collections/43739255/photos/`

const clientID = `?client_id=${process.env.REACT_APP_UNSPLASH_API_KEY}`
function App() {
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState([]);
  // const[query,setQuery]=useState('');
  const [page, setPage]=useState(0);
  // const handleSubmit=(e)=>{
  //   e.preventDefault()
  //   setPage(1);
  // }
  const fetchImages= async()=>{
    setLoading(true);
    let url;
    // const urlQuery =`&query=${query}`
    const urlPage =`&page=${page}`
    url=`${collectionUrl}${clientID}${urlPage}`

  // if(query){
  //   url =`${searchUrl}${clientID}${urlPage}${urlQuery}`
  // } else {
  //   url=`${collectionUrl}${clientID}${urlPage}`
  // }
    try {
      const response = await fetch(url);
      const photos = await response.json();
      setPhotos((prev)=>{
        if(page===1){
        return [...photos]
      } else {return [...prev,...photos]}
      })

      // setPhotos((prev)=>{
      //   if(page===1 && query){
      //       return photos.results
      //     } else if(query){
      //     return [...prev,...photos.results]
      //   } else {return [...prev,...photos]}
      // })
      setLoading(false)
    } catch(err) {
      setLoading(false)
        console.log(err)
    }
  }
  useEffect(()=>{
    fetchImages();
    // eslint-disable-next-line
  },[page])
  useEffect(()=>{
    const event = window.addEventListener('scroll',()=>{
        if(!loading &&(window.innerHeight + window.scrollY)>=document.body.scrollHeight-20){
          setPage((prev)=>{
            return prev+1;
          })
        }
    })
    return()=> window.removeEventListener('scroll',event)
    // eslint-disable-next-line
  },[])

  return <main>

    <section className="search">
    <h1> Black Folk</h1>
   
      {/* <form className="search-form">
        <input type="text" placeholder='search' className='form-input' value={query} onChange={(e)=>{setQuery(e.target.value)}} />
      <button type='submit' className="submit-btn" onClick={handleSubmit} ><FaSearch/></button>
      </form> */}
    </section> 
    <section className="photos">
      <div className="photos-center">
        {photos.map((photo)=>{
          return <Photo key={photo.id}{...photo}/>
        })}
      </div>
      {loading && <h2 className="loading">Loading...</h2>}
    </section>
  </main>
}

export default App
