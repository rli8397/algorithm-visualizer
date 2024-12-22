type Props = {
    handleAdd: (e: React.KeyboardEvent<HTMLInputElement>)=> void
    handleUndo: ()=> void
    handleReset: ()=> void
}
export default function Add({handleAdd, handleUndo, handleReset}: Props) {
    return (
        <div className='add-div right-child'>
                <input className='input-box' type="text" id='data-input' placeholder='Enter data'
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && e.currentTarget.value !== '') {
                                handleAdd(e)
                                e.currentTarget.value=""
                        }
                    }} />

                <button onClick={handleUndo}>undo</button>
                <button onClick={handleReset}>reset</button>

        </div>
    )
}