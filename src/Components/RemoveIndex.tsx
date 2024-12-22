type Props = {
    handleRemove: (index: number)=> void
}
export default function RemoveIndex({handleRemove}: Props){
    return (
        <div className="remove-div right-child">
            <input className='input-box' type='number'required id='index-input' placeholder='Remove index'
                onKeyDown= {(e) => {
                    let index = parseInt(e.currentTarget.value)
                    if (e.key === 'Enter' && typeof index === 'number' && index >= 0) {
                        handleRemove(index)
                        e.currentTarget.value = ""
                    }
                }}
            />
        </div>
    )
}