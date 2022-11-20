
const Filter = ({filterName, onChange}) =>
    <div>
    <p>filter shown with <input value={filterName} onChange={onChange}></input></p>
    </div>

export default Filter