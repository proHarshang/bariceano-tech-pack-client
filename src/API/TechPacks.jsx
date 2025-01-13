const apiURL = process.env.REACT_APP_API_URL;
const apiKey = process.env.REACT_APP_API_KEY;

const getTechPacks = async () => {

    const response = await fetch(`${apiURL}/design/techpacks`, {
        method: 'GET',
        headers: {
            'api-Key': apiKey,
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

const handleCommentSubmit = async (styleNo, comment) => {
    try {
        const response = await fetch(`${apiURL}/design/comment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "styleNo": styleNo,
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

export const categoryFetch = async () => {
    try {
        const response = await fetch(`${apiURL}/design/setting/category`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'api-key': apiKey,
            },
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error('Failed to fetch categories');
        }
    } catch (error) {
        throw new Error(error.message || 'An error occurred while fetching categories');
    }
};

export const categoryAdd = async (name) => {
    try {
        const response = await fetch(`${apiURL}/design/setting/category/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'api-key': apiKey,
            },
            body: JSON.stringify({ name }), // Send only the category name
        });

        if (response.ok) {
            return await response.json(); // Return the response data
        } else {
            throw new Error('Failed to add category');
        }
    } catch (error) {
        throw new Error(error.message || 'An error occurred while adding the category');
    }
};

export const categoryEdit = async (oldName, newName) => {
    try {
        const response = await fetch(`${apiURL}/design/setting/category/update`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'api-key': apiKey,
            },
            body: JSON.stringify({ oldName, newName }),  // Send the old name and the new name
        });

        if (response.ok) {
            return await response.json();
        } else {
            throw new Error('Failed to edit category');
        }
    } catch (error) {
        throw new Error(error.message || 'An error occurred while editing the category');
    }
};

export const categoryDelete = async (name) => {
    try {
        const response = await fetch(`${apiURL}/design/setting/category/delete`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'api-key': apiKey,
            },
            body: JSON.stringify({ name }), // Send the category name for deletion
        });

        if (response.ok) {
            return await response.json();
        } else {
            throw new Error('Failed to delete category');
        }
    } catch (error) {
        throw new Error(error.message || 'An error occurred while deleting the category');
    }
};

export const genderFetch = async () => {
    try {
        const response = await fetch(`${apiURL}/design/setting/gender`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'api-key': apiKey,
            },
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error('Failed to fetch Gender');
        }
    } catch (error) {
        throw new Error(error.message || 'An error occurred while fetching Gender');
    }
};

export const genderAdd = async (name) => {
    try {
        const response = await fetch(`${apiURL}/design/setting/gender/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'api-key': apiKey,
            },
            body: JSON.stringify({ name }), // Send only the category name
        });

        if (response.ok) {
            return await response.json(); // Return the response data
        } else {
            throw new Error('Failed to add gender');
        }
    } catch (error) {
        throw new Error(error.message || 'An error occurred while adding the Gender');
    }
};

export const genderEdit = async (oldName, newName) => {
    try {
        const response = await fetch(`${apiURL}/design/setting/gender/update`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'api-key': apiKey,
            },
            body: JSON.stringify({ oldName, newName }),  // Send the old name and the new name
        });

        if (response.ok) {
            return await response.json();
        } else {
            throw new Error('Failed to edit gender');
        }
    } catch (error) {
        throw new Error(error.message || 'An error occurred while editing the gender');
    }
};

export const genderDelete = async (name) => {
    try {
        const response = await fetch(`${apiURL}/design/setting/gender/delete`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'api-key': apiKey,
            },
            body: JSON.stringify({ name }), // Send the category name for deletion
        });

        if (response.ok) {
            return await response.json();
        } else {
            throw new Error('Failed to delete Gender');
        }
    } catch (error) {
        throw new Error(error.message || 'An error occurred while deleting the Gender');
    }
};

export const trimFetch = async () => {
    try {
        const response = await fetch(`${apiURL}/design/setting/trims`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'api-key': apiKey,
            },
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error('Failed to fetch Trim');
        }
    } catch (error) {
        throw new Error(error.message || 'An error occurred while fetching Trim');
    }
};

export const trimAdd = async ({ name, images }) => {
    try {
        const formData = new FormData();
        formData.append("name", name); // Add the trim name

        images.forEach((image, index) => {
            formData.append(`images[${index}][position]`, index); // Image position
            formData.append(`images[${index}][image]`, image.file); // Image file
        });

        const response = await fetch(`${apiURL}/design/setting/trims/add`, {
            method: "POST",
            headers: {
                "api-key": apiKey, // Include the API key if needed
            },
            body: formData, // Send the FormData object
        });

        if (response.ok) {
            return await response.json(); // Return the response data
        } else {
            throw new Error("Failed to add trim");
        }
    } catch (error) {
        throw new Error(error.message || "An error occurred while adding the trim");
    }
};

export const requirementsFetch = async () => {
    try {
        const response = await fetch(`${apiURL}/design/setting/requirements`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'api-key': apiKey,
            },
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error('Failed to fetch Reqirements');
        }
    } catch (error) {
        throw new Error(error.message || 'An error occurred while fetching Reqirements');
    }
};

export const finishingFetch = async () => {
    try {
        const response = await fetch(`${apiURL}/design/setting/finishing`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'api-key': apiKey,
            },
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error('Failed to fetch Finishing');
        }
    } catch (error) {
        throw new Error(error.message || 'An error occurred while fetching Finishing');
    }
};

export const collectionFetch = async () => {
    try {
        const response = await fetch(`${apiURL}/design/setting/collection`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'api-key': apiKey,
            },
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error('Failed to fetch Collection');
        }
    } catch (error) {
        throw new Error(error.message || 'An error occurred while fetching Collection');
    }
};

// Hook to fetch all details
export const fetchAll = async () => {
    try {
        const response = await fetch(`${apiURL}/design/setting/fetch/all`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'api-key': apiKey,
            },
        });

        if (response.ok) {
            const data = await response.json();
            return data; // Return the entire response
        } else {
            throw new Error('Failed to fetch all settings');
        }
    } catch (error) {
        throw new Error(error.message || 'An error occurred while fetching all settings');
    }
};






export { getTechPacks, handleCommentSubmit, }