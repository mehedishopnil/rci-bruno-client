import { useContext, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import ResortCard from '../ResortCard/ResortCard';
import { AuthContext } from '../../providers/AuthProvider/AuthProvider';
import Loading from '../Loading';

const Search = () => {
    const { allResortData } = useContext(AuthContext);
    const location = useLocation();
    const [searchData, setSearchData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const searchQuery = queryParams.get('q') || '';
        setSearchTerm(searchQuery);
    }, [location.search]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                if (searchTerm.trim() !== '') {
                    const filteredData = allResortData.filter(resort => {
                        const nameMatch = resort.place_name ? resort.place_name.toLowerCase().includes(searchTerm.toLowerCase()) : false;
                        const locationMatch = resort.location ? resort.location.toLowerCase().includes(searchTerm.toLowerCase()) : false;
                        const idMatch = resort.resort_ID ? resort.resort_ID.toLowerCase().includes(searchTerm.toLowerCase()) : false;
                        return nameMatch || locationMatch || idMatch;
                    });
                    setSearchData(filteredData);
                } else {
                    setSearchData([]);
                }
            } catch (error) {
                console.error('Error fetching and filtering data:', error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [searchTerm, allResortData]);

    return (
        <div className="p-4">
            <div>
                <h1 className="text-center text-2xl font-semibold my-2">
                    Search Results Found: {searchData.length}
                </h1>
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        {/* Replace with your preferred loading indicator */}
                        <p><Loading/></p>
                    </div>
                ) : (
                    <>
                        {searchData.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {searchData.map((resort) => (
                                    <Link to={`/singleResortPage/${resort._id}`} key={resort._id}>
                                        <ResortCard resort={resort} />
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <p className="text-center mt-4">No Results Found</p>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Search;