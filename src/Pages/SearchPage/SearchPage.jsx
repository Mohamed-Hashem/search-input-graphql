import { useState } from "react";
import debounce from "lodash.debounce";
import { Link } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import "./index.css";

const GET_LOCATIONS = gql`
    query saleSearch($query: String!) {
        saleSearch(query: $query, travelTypes: "HOTEL_ONLY") {
            resultCount
            sales(limit: 10, offset: 0) {
                id
                editorial {
                    title
                    destinationName
                }
                photos {
                    url
                }
            }
        }
    }
`;

export default function SearchPage() {
    const [query, setQuery] = useState("");
    const { loading, error, data, refetch } = useQuery(GET_LOCATIONS, {
        variables: { query },
        skip: !query,
    });

    const handleSearch = () => {
        refetch({ query });
    };

    const handleQueryChange = debounce((value) => {
        setQuery(value);
    }, 300);

    const handleInputChange = (e) => {
        handleQueryChange(e.target.value);
    };

    return (
        <div>
            <input type="text" placeholder="Search... e.g. London" onChange={handleInputChange} />
            <button onClick={handleSearch} disabled={!query || loading}>
                {loading ? "Searching..." : "Search"}
            </button>
            {loading && <p>Loading...</p>}
            {error && <p>Error :(</p>}
            {data?.saleSearch?.sales &&
                data.saleSearch.sales.map((obj) => (
                    <div key={obj.id}>
                        <p>
                            {obj.editorial.destinationName}{" "}
                            <Link to={`/search/${obj.id}`}>{obj.id}</Link>
                        </p>
                    </div>
                ))}
        </div>
    );
}
