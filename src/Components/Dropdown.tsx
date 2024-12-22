type Props = {
    list: string[]
    head: string
    handleClick: (str:string)=> void
}
export default function Dropdown({list, head, handleClick}: Props){
    const optionList = list.filter((element)=> element != head)
    return (
        <div className="dropdown-div">
            <h2 className="dropdown-header">{head}</h2>
            <div className="options">
                {optionList.map((element)=> <p className='option' onClick={()=>handleClick(element)}>{element}</p>)}
            </div>
        </div>
    )
}