const apiURL = process.env.REACT_APP_API_URL;
const apiKey = process.env.REACT_APP_ADMIN_KEY;
const getTechPacks = async () => {

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

const handleCommentSubmit = async (techPachId, comment) => {
    try {
        const response = await fetch(`${apiURL}/design/comment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "techPachId": techPachId,
                "comment": comment
            }),
        });

        if (response.ok) {
            window.location.reload(); // Reload the page after successful submission
        } else {
            console.error('Failed to submit comment');
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

export { getTechPacks ,handleCommentSubmit}