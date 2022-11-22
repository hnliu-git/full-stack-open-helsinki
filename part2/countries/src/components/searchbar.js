
const SearchBar = ({filter, filterHandler}) =>
    <div>
        <p>
            find countries
            <input 
                value={filter}
                onChange={filterHandler}
            />
        </p>
    </div>

export default SearchBar