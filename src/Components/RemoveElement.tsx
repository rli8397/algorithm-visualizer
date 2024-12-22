type Props = {
    handleRemove: (e: React.KeyboardEvent<HTMLInputElement>)=> void
}
export default function RemoveElement({handleRemove}: Props) {
    return (
        <div className="remove-div right-child">
            <input className='input-box' type='number'required id='index-input' placeholder='Remove element'
                onKeyDown= {(e) => {
                    if (e.key === 'Enter') {
                        handleRemove(e)
                        e.currentTarget.value = ''
                    }
                }}
            />
        </div>
    )
}