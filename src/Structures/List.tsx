// the list class takes an any type array as a parameter which
// will represent the data for the array.
import { useState } from 'react'
import Add from '../Components/Add'
export default function List() {
    const [data, setData] = useState<string[]>([])

    return (
        <>
            <div className='main-content'>
                {data.map((element)=> <p className='element-box'>{element}</p>)}
            </div>
            <div className="right-menu">
                <div className='data-div right-child'>
                    <h2>Data: </h2>
                    {data.map((element)=> <p className='data'>{element} </p>)}
                </div>

                <Add 
                    handleAdd = {(e)=> setData(data.concat(e.currentTarget.value.split(',')))}
                    handleUndo = {()=> setData(data.slice(0,-1))}
                    handleReset = {()=> setData([])}
                />

                <div className="remove-div right-child">
                    <input className='input-box' type='number'required id='index-input' placeholder='Remove index'
                        onKeyDown= {(e) => {
                            let index = parseInt(e.currentTarget.value)
                            if (e.key === 'Enter' && typeof index === 'number' && index >= 0) {
                                let newData = data.slice(0, index).concat(data.slice(index + 1, data.length))
                                setData(newData)
                                e.currentTarget.value = ''
                            }
                        }}
                    />
                </div>
                
            </div>
        </> 
    )
}