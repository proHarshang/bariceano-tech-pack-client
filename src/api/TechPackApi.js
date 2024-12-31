import { useQuery } from "@tanstack/react-query";

const useFetchTechpackData = () => {
    const getTechPackData = async () => {
        const adminKey = process.env.REACT_APP_ADMIN_KEY;
        if (!adminKey) {
            throw new Error("REACT_APP_ADMIN_KEY environment variable is not set");
        }

        const response = await fetch(`${process.env.REACT_APP_API_URL}/design/techpacks`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "admin-key": adminKey,
            },
        });

        if (!response.ok) {
            if (response.status === 401) {
                throw new Error("Unauthorized: Invalid admin key");
            }
            throw new Error(`Failed to fetch data. Status: ${response.status}`);
        }

        return response.json();
    };

    const { data, isLoading, error } = useQuery({
        queryKey: ["fetchTechpack"],
        queryFn: getTechPackData,
        onError: (error) => {
            console.error("Error fetching data:", error.message);
        },
    });

    return { data, isLoading, error };
};

export default useFetchTechpackData;
