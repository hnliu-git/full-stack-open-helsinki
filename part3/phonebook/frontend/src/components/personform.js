
const PersonForm = ({newName, nameHandler, newNumber, numberHandler, addHandler}) =>
    <>
        <form>
            <div>
            name: <input value={newName} onChange={nameHandler}/>
            </div>
            <div>
            number: <input value={newNumber} onChange={numberHandler}></input>
            </div>
            <div>
            <button type="submit" onClick={addHandler}>add</button>
            </div>
        </form>
    </>

export default PersonForm