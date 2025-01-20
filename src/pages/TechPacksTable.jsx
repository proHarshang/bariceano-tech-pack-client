import { useEffect, useState } from 'react';
import { getTechPacks } from '../API/TechPacks';
import TechPackDataTable from '../components/TechPackDataTable';
import UploadImage from '../components/UploadImage';

const TechPacksTable = () => {
    const [techPacks, setTechPacks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTechPacks = async () => {
            try {
                setLoading(true);
                const data = await getTechPacks();
                setTechPacks(data?.data || []); // Assuming data.data contains the array of tech packs
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTechPacks();
    }, []); // Empty dependency array to run only once on 

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;


    return (
        <div>
            <UploadImage />
            <TechPackDataTable data={techPacks} />
        </div>
    );
}

export default TechPacksTable;
