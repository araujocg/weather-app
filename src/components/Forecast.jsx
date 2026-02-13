import React from 'react'

import celsiusIcon from '../images/celsius-icon.png'
import fahrenheitIcon from '../images/fahrenheit-icon.png'

export default (props)=>{
    return(
        <div className='container text-white bg-black rounded-5 d-flex flex-column p-3 my-4 align-items-center border border-black'>
            <div className=''>
                <h3>
                    {props.data.location.name} / {props.data.location.country}
                </h3>
            </div>
            <div className=' text-bg-light container rounded-1 d-flex flex-column p-3 my-4 align-items-center border border-black'>
                <div className='container d-flex flex-column bg-secondary-subtle rounded-3 p-3 '>
                    <div className='container d-flex flex-row justify-content-start align-items-center'>
                        <img src={props.data.current.condition.icon} className="rounded bg-black mx-3"></img>
                        <h4>
                            {props.data.current.condition.text}
                        </h4>
                    </div>
                    <div className='container d-flex flex-row my-4'>
                        <div className='container d-flex flex-row justify-content-start align-items-stretch'>
                            <img src={celsiusIcon} width="64" height="64" className="rounded bg-secondary-subtle me-5 float-start"/> 
                            <p className='fs-1 mt-2 mb-0'>
                                {props.data.current.temp_c}º
                            </p>
                        </div>
                        <div className='container d-flex flex-row justify-content-start align-items-end'>
                            <img src={fahrenheitIcon} width="64" height="60" className="rounded bg-secondary-subtle float-start me-5"/> 
                            <p className='fs-1 mt-2 mb-0'>
                                {props.data.current.temp_f}º
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}