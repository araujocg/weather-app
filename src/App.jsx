import React, {useState, useEffect} from 'react'
import Forecast from './components/Forecast'

import { FaSearch } from "react-icons/fa"
import 'bootstrap/dist/css/bootstrap.min.css'

export default ()=>{
    const [userCity, setUserCity] = useState('')
    const [nameCity,setNameCity] = useState('')
    const [data,setNewData] = useState()

    const handleSearch = (event)=>{
        event.preventDefault()
        fetch(`http://api.weatherapi.com/v1/current.json?key=8130db01a5774eca983142838241104&q=${nameCity? nameCity : userCity}&lang=pt`)
            .then(response => {
                if (!response.ok) {
                    if (response.status === 400) {
                        console.log('Cidade não encontrada. Por favor, verifique o nome da cidade e tente novamente.')
                    } else {
                        console.log('Ocorreu um erro!! Status da resposta:', response.status);
                    }
                    return;
                } else {
                    return response.json();
                }
            })
            .then(data => {
                if (data) {
                    setNewData(data)
                    console.log(data)
                }
            })
            .catch(erro => console.log('Erro ao buscar os dados:', erro))
    }

    function obterLocalizacaoUsuario() {
        navigator.geolocation.getCurrentPosition((position) => {
            const latitude = position.coords.latitude
            const longitude = position.coords.longitude
            const apiKey = '459f62f61bad4418b3ad7b78985f0705'
            const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude},${longitude}&key=${apiKey}`
      
            fetch(url)
              .then(response => response.json())
              .then(data => {
                if (data.results && data.results.length > 0) {
                    const city = data.results[0].components.city || data.results[0].components.town || data.results[0].components.village
                    console.log(`Cidade do usuário: ${city}`)
                    setUserCity(city)
                } else {
                  console.error('Nenhum resultado encontrado.')
                }
              })
              .catch(error => {
                console.error(`Erro ao obter localização: ${error}`)
              })
            },
            (error) => {
                console.error(`Erro ao obter localização: ${error.message}`)
            }
        )
    }
    
    useEffect(()=>{
        obterLocalizacaoUsuario()
    }, [])
    useEffect(()=>{
        if(userCity) {
            setNameCity(userCity)
        }
    }, [userCity])
    

        
        return(
            <div>
            <nav className='navbar navbar-expand-md navbar-dark bg-dark mb-4 '>
                <a className='navbar-brand' href=''>
                    Previsão do tempo
                </a>
            </nav>
            <header className="d-flex flex-column text-bg-light rounded-5 p-3 container align-items-center">
                <div className="jumbotron">
                    <h1>Verifique agora a previsão do tempo da sua cidade</h1>
                    <p className='lead'>
                        Digite o nome da sua cidade no campo a baixo e em seguida clique em pesquisar
                    </p>
                    <div className="row mb-4">
                        <form className='col-md-12 d-flex p-2' onSubmit={handleSearch}>
                            <input className='form-control' value={nameCity} onChange={(e)=> setNameCity(e.target.value)}/>
                            <button type="submit" className='btn btn-primary'>
                                <FaSearch/>
                            </button>
                        </form>
                    </div>
                </div>
            </header>
            <main>
                {data? <Forecast data={data} /> : ''}
            </main>
        </div>
    )
}