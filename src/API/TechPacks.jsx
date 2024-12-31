const getTechPacks = async () => {
    const apiURL = process.env.REACT_APP_API_URL;
    const apiKey = process.env.REACT_APP_ADMIN_KEY;
    console.log(apiURL, apiKey);

    const response = await fetch(`${apiURL}/design/techpacks`, {
        method: 'POST',
        headers: {
            'admin-key': apiKey,
        },
    })
    if (!response.ok) {
        if (response.status === 401) {
            
            return;
        }
        throw new Error('Failed to fetch products data');
    }

    return response.json();

}

export { getTechPacks }