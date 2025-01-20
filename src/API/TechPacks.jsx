import { useState } from "react";

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

export const deleteTechPack = async (id) => {
    try {
        const response = await fetch(`${apiURL}/design/techpacks/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'api-key': apiKey,
            },
            body: JSON.stringify({ id }), // Send the category name for deletion
        });

        if (response.ok) {
            return await response.json();
        } else {
            throw new Error('Failed to delete Tech pack');
        }
    } catch (error) {
        throw new Error(error.message || 'An error occurred while deleting the Tech pack');
    }
};

const handleCommentSubmit = async (styleNo, comment) => {
    try {
        console.log("Submitting Comment:", { styleNo, ...comment });  // Log the payload to check the structure

        const response = await fetch(`${apiURL}/design/comment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "styleNo": styleNo,
                "name": comment.name,
                "message": comment.message,
                "date": comment.date
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

const useAddSizeChart = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const addSizeChart = async (formData) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(`${apiURL}/design/setting/sizeChart/add`, {
                method: "POST",
                body: formData, // Ensure FormData is passed
                headers: {
                    'api-key': apiKey,
                },
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Failed to add size chart");
            }

            return result;
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return { addSizeChart, isLoading, error };
};

const useDeleteSizeChart = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const deleteSizeChart = async (name) => {
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const response = await fetch(`${apiURL}/design/setting/sizeChart/delete`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'api-key': apiKey,
                },
                body: JSON.stringify({ name }),
            });

            const result = await response.json();

            if (response.ok) {
                setSuccess(result.message);
            } else {
                setError(result.message);
            }
        } catch (err) {
            setError("An error occurred while deleting the size chart.");
        } finally {
            setLoading(false);
        }
    };

    return { deleteSizeChart, loading, error, success, };
};

const useEditSizeChart = () => {
    const [loadingEditSize, setLoading] = useState(false);
    const [errorEditSize, setError] = useState(null);
    const [successEditSize, setSuccess] = useState(null);

    const editSizeChart = async (name, newData) => {
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const response = await fetch(`${apiURL}/design/setting/sizeChart/update`, {
                method: 'POST',  // Assuming your API uses PUT for updates
                headers: {
                    'Content-Type': 'application/json',
                    'api-key': apiKey,
                },
                body: JSON.stringify({
                    name, // the name of the size chart you're editing
                    ...newData, // any other data you're updating (e.g., image or name)
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess(data.message);
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError('Error updating size chart. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return {
        editSizeChart,
        loadingEditSize,
        errorEditSize,
        successEditSize,
    };
};


const useDeleteTrims = () => {
    const [loadingTrims, setLoading] = useState(false);
    const [errorTrims, setError] = useState(null);
    const [successTrims, setSuccess] = useState(null);

    const deleteTrims = async (id) => {
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const response = await fetch(`${apiURL}/design/setting/trims/delete`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'api-key': apiKey,
                },
                body: JSON.stringify({ id }), // Use "id" as required by the backend
            });

            const result = await response.json();

            if (response.ok) {
                setSuccess(result.message);
            } else {
                setError(result.message);
            }
        } catch (err) {
            setError("An error occurred while deleting the trims.");
        } finally {
            setLoading(false);
        }
    };

    return { deleteTrims, loadingTrims, errorTrims, successTrims };
};



export { getTechPacks, handleCommentSubmit, useAddSizeChart, useDeleteSizeChart, useEditSizeChart, useDeleteTrims }