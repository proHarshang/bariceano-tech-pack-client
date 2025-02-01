import { useEffect, useState } from 'react';
import { getTechPacks } from '../API/TechPacks';
import TechPackDataTable from '../components/TechPackDataTable';

const TechPacksTable = () => {
    const [techPacks, setTechPacks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchTechPacks = async () => {
        try {
            setLoading(true);
            const data = await getTechPacks();
            setTechPacks(data?.data || []);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTechPacks();
    }, []);

    if (loading) return <div className='flex justify-center items-center w-screen h-screen absolute top-0'><iframe title="Loading Animation" src="https://lottie.host/embed/9dfa2609-5d76-45d5-8759-0510c542b3d6/aGpEl0E1Ph.lottie"></iframe></div>
    if (error) return <div>Error: {error}</div>;


    return (
        <div>
            <TechPackDataTable data={techPacks} fetchTechPacks={fetchTechPacks} />
        </div>
    );
}

export default TechPacksTable;
