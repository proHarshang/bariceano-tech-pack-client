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

const getTechPacksById = async (id) => {

    const response = await fetch(`${apiURL}/design/techpacks/fetch/${id}`, {
        method: 'GET',
        headers: {
            'api-Key': apiKey,
        },
    })

    return response.json();

}

const addTechPacks = async (techPackData) => {
    const response = await fetch(`${apiURL}/design/techpacks/add`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'api-Key': apiKey,
        },
        body: JSON.stringify(techPackData),
    });

    return response.json();
}

const updateTechPacks = async (id, techPackData) => {
    const response = await fetch(`${apiURL}/design/techpacks/update/${id}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'api-Key': apiKey,
        },
        body: JSON.stringify(techPackData),
    });

    return response.json();
}

const getUploadedImage = async () => {

    const response = await fetch(`${apiURL}/design/techpacks/images`, {
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

export const deleteTechPack = async (id, designer) => {
    try {
        const response = await fetch(`${apiURL}/design/techpacks/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'api-key': apiKey,
            },
            body: JSON.stringify({ id, designer }), // Send the category name for deletion
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

        const result = await response.json();  // Parse the JSON response from the server

        if (response.ok) {
            console.log("Comment Submitted Successfully:", result);  // Log the response from the server
            // Optionally update the state here (if required) to show the new comment
        } else {
            console.error('Failed to submit comment:', result.error || 'Unknown Error');
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

export const constructionSheetEdit = async (updateFormFData, data) => {
    try {
        const response = await fetch(`${apiURL}/design/setting/constructionSheet/update/${data.name}`, {
            method: 'POST',
            body: JSON.stringify({ "update": updateFormFData, "constructionSheet": data }),
            headers: {
                'Content-Type': 'application/json',
                'api-key': apiKey,
            },
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error('Failed to update Construction Sheet');
        }
    } catch (error) {
        throw new Error(error.message || 'An error occurred while updating Construction Sheet');
    }
};

export const parameterEdit = async (updateFormFData, data) => {
    try {
        const response = await fetch(`${apiURL}/design/setting/requirements/update/`, {
            method: 'POST',
            body: JSON.stringify({ "update": updateFormFData, "requirements": data }),
            headers: {
                'Content-Type': 'application/json',
                'api-key': apiKey,
            },
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error('Failed to update requirements parameter');
        }
    } catch (error) {
        throw new Error(error.message || 'An error occurred while updating requirements parameter');
    }
};

export const finishingEdit = async (updateFormFData, data) => {
    try {
        const response = await fetch(`${apiURL}/design/setting/finishing/update/${data.name}`, {
            method: 'POST',
            body: JSON.stringify({ "update": updateFormFData, "finishing": data }),
            headers: {
                'Content-Type': 'application/json',
                'api-key': apiKey,
            },
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error('Failed to update requirements parameter');
        }
    } catch (error) {
        throw new Error(error.message || 'An error occurred while updating requirements parameter');
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

export const trimAdd = async (updateFormData, data) => {
    try {
        const response = await fetch(`${apiURL}/design/setting/trims/add`, {
            method: "POST",
            body: JSON.stringify({ "update": updateFormData, "trim": data }),
            headers: {
                'Content-Type': 'application/json',
                "api-key": apiKey,
            },
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error("Failed to add trim");
        }
    } catch (error) {
        throw new Error(error.message || "An error occurred while adding the trim");
    }
};

export const trimEdit = async (updateFormFData, data) => {
    try {
        const response = await fetch(`${apiURL}/design/setting/trims/update`, {
            method: 'POST',
            body: JSON.stringify({ "update": updateFormFData, "trim": data }),
            headers: {
                'Content-Type': 'application/json',
                'api-key': apiKey,
            },
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error('Failed to update trims');
        }
    } catch (error) {
        throw new Error(error.message || 'An error occurred while updating trims');
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

    const addSizeChart = async (sizeCharts) => {
        setIsLoading(true);
        setError(null);

        try {
            // Validate the sizeCharts object
            if (
                !sizeCharts.name ||
                !sizeCharts.category ||
                !sizeCharts.gender ||
                !sizeCharts.images
            ) {
                throw new Error("Invalid Fields");
            }

            const response = await fetch(`${apiURL}/design/setting/sizeChart/add`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "api-key": apiKey,
                },
                body: JSON.stringify({ sizeCharts }), // Send the sizeCharts object as JSON
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Failed to add size chart");
            }

            return result;
        } catch (err) {
            setError(err.message);
            throw err; // Re-throw the error for further handling if needed
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

    const editSizeChart = async (updateFormFData, sizeCharts) => {
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
                body: JSON.stringify({ "update": updateFormFData, sizeCharts }),
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

    const deleteTrims = async (name) => {
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
                body: JSON.stringify({ name }),
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

const useUploadImage = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const uploadImage = async (files) => {
        setLoading(true);
        setError(null);
        const formData = new FormData();
        files.forEach((image) => formData.append("images", image));


        try {
            const response = await fetch(`${apiURL}/design/techpacks/images/upload`, {
                method: 'POST',
                body: formData,
                headers: {
                    'api-key': apiKey,
                },
            });

            if (!response.ok) {
                const data = await response.json();
                setError(data.message || 'Upload failed');
            } else {
                console.log('File uploaded successfully');
            }
        } catch (err) {
            setError('Something went wrong during upload');
            console.error('Upload error:', err);
        } finally {
            setLoading(false);
        }
    };

    return { uploadImage, loading, error };
};


export const fabricAdd = async (name) => {
    try {
        const response = await fetch(`${apiURL}/design/setting/fabric/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'api-key': apiKey,
            },
            body: JSON.stringify({ name }),
        });

        if (response.ok) {
            return await response.json();
        } else {
            throw new Error('Failed to add fabric');
        }
    } catch (error) {
        throw new Error(error.message || 'An error occurred while adding the fabric');
    }
};


export const fabricEdit = async (oldName, newName) => {
    try {
        const response = await fetch(`${apiURL}/design/setting/fabric/update`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'api-key': apiKey,
            },
            body: JSON.stringify({ oldName, newName }),
        });

        if (response.ok) {
            return await response.json();
        } else {
            throw new Error('Failed to edit fabric');
        }
    } catch (error) {
        throw new Error(error.message || 'An error occurred while editing the fabric');
    }
};

export const fabricDelete = async (name) => {
    try {
        const response = await fetch(`${apiURL}/design/setting/fabric/delete`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'api-key': apiKey,
            },
            body: JSON.stringify({ name }),
        });

        if (response.ok) {
            return await response.json();
        } else {
            throw new Error('Failed to delete fabric');
        }
    } catch (error) {
        throw new Error(error.message || 'An error occurred while deleting the fabric');
    }
};

export const fabricColorAdd = async (name) => {
    try {
        const response = await fetch(`${apiURL}/design/setting/fabriccolor/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'api-key': apiKey,
            },
            body: JSON.stringify({ name }),
        });

        if (response.ok) {
            return await response.json();
        } else {
            throw new Error('Failed to add fabriccolor');
        }
    } catch (error) {
        throw new Error(error.message || 'An error occurred while adding the fabriccolor');
    }
};

export const fabricColorEdit = async (oldName, newName) => {
    try {
        const response = await fetch(`${apiURL}/design/setting/fabriccolor/update`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'api-key': apiKey,
            },
            body: JSON.stringify({ oldName, newName }),
        });

        if (response.ok) {
            return await response.json();
        } else {
            throw new Error('Failed to edit fabriccolor');
        }
    } catch (error) {
        throw new Error(error.message || 'An error occurred while editing the fabriccolor');
    }
};

export const fabriColorcDelete = async (name) => {
    try {
        const response = await fetch(`${apiURL}/design/setting/fabriccolor/delete`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'api-key': apiKey,
            },
            body: JSON.stringify({ name }),
        });

        if (response.ok) {
            return await response.json();
        } else {
            throw new Error('Failed to delete fabriccolor');
        }
    } catch (error) {
        throw new Error(error.message || 'An error occurred while deleting the fabriccolor');
    }
};


export const fitAdd = async (name) => {
    try {
        const response = await fetch(`${apiURL}/design/setting/fit/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'api-key': apiKey,
            },
            body: JSON.stringify({ name }),
        });

        if (response.ok) {
            return await response.json();
        } else {
            throw new Error('Failed to add fit');
        }
    } catch (error) {
        throw new Error(error.message || 'An error occurred while adding the fit');
    }
};

export const fitEdit = async (oldName, newName) => {
    try {
        const response = await fetch(`${apiURL}/design/setting/fit/update`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'api-key': apiKey,
            },
            body: JSON.stringify({ oldName, newName }),
        });

        if (response.ok) {
            return await response.json();
        } else {
            throw new Error('Failed to edit fit');
        }
    } catch (error) {
        throw new Error(error.message || 'An error occurred while editing the fit');
    }
};

export const fitDelete = async (name) => {
    try {
        const response = await fetch(`${apiURL}/design/setting/fit/delete`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'api-key': apiKey,
            },
            body: JSON.stringify({ name }),
        });

        if (response.ok) {
            return await response.json();
        } else {
            throw new Error('Failed to delete fit');
        }
    } catch (error) {
        throw new Error(error.message || 'An error occurred while deleting the fit');
    }
};


export const noteAdd = async (name) => {
    try {
        const response = await fetch(`${apiURL}/design/setting/note/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'api-key': apiKey,
            },
            body: JSON.stringify({ name }),
        });

        if (response.ok) {
            return await response.json();
        } else {
            throw new Error('Failed to add note');
        }
    } catch (error) {
        throw new Error(error.message || 'An error occurred while adding the note');
    }
};

export const noteEdit = async (oldName, newName) => {
    try {
        const response = await fetch(`${apiURL}/design/setting/note/update`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'api-key': apiKey,
            },
            body: JSON.stringify({ oldName, newName }),
        });

        if (response.ok) {
            return await response.json();
        } else {
            throw new Error('Failed to edit note');
        }
    } catch (error) {
        throw new Error(error.message || 'An error occurred while editing the note');
    }
};

export const notDelete = async (name) => {
    try {
        const response = await fetch(`${apiURL}/design/setting/note/delete`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'api-key': apiKey,
            },
            body: JSON.stringify({ name }),
        });

        if (response.ok) {
            return await response.json();
        } else {
            throw new Error('Failed to delete note');
        }
    } catch (error) {
        throw new Error(error.message || 'An error occurred while deleting the note');
    }
};


export const categorytypeAdd = async (name) => {
    try {
        const response = await fetch(`${apiURL}/design/setting/categorytype/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'api-key': apiKey,
            },
            body: JSON.stringify({ name }),
        });

        if (response.ok) {
            return await response.json();
        } else {
            throw new Error('Failed to add category');
        }
    } catch (error) {
        throw new Error(error.message || 'An error occurred while adding the category');
    }
};

export const categorytypeEdit = async (oldName, newName) => {
    try {
        const response = await fetch(`${apiURL}/design/setting/categorytype/update`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'api-key': apiKey,
            },
            body: JSON.stringify({ oldName, newName }),
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

export const categorytypeDelete = async (name) => {
    try {
        const response = await fetch(`${apiURL}/design/setting/categorytype/delete`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'api-key': apiKey,
            },
            body: JSON.stringify({ name }),
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



export const collectionAdd = async (name) => {
    try {
        const response = await fetch(`${apiURL}/design/setting/collection/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'api-key': apiKey,
            },
            body: JSON.stringify({ name }),
        });

        if (response.ok) {
            return await response.json();
        } else {
            throw new Error('Failed to add collection');
        }
    } catch (error) {
        throw new Error(error.message || 'An error occurred while adding the collection');
    }
};

export const collectionEdit = async (oldName, newName) => {
    try {
        const response = await fetch(`${apiURL}/design/setting/collection/update`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'api-key': apiKey,
            },
            body: JSON.stringify({ oldName, newName }),
        });

        if (response.ok) {
            return await response.json();
        } else {
            throw new Error('Failed to edit collection');
        }
    } catch (error) {
        throw new Error(error.message || 'An error occurred while editing the collection');
    }
};

export const collectionDelete = async (name) => {
    try {
        const response = await fetch(`${apiURL}/design/setting/collection/delete`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'api-key': apiKey,
            },
            body: JSON.stringify({ name }),
        });

        if (response.ok) {
            return await response.json();
        } else {
            throw new Error('Failed to delete collection');
        }
    } catch (error) {
        throw new Error(error.message || 'An error occurred while deleting the collection');
    }
};



export { getTechPacks, getTechPacksById, addTechPacks, updateTechPacks, handleCommentSubmit, useAddSizeChart, useDeleteSizeChart, useEditSizeChart, useDeleteTrims, getUploadedImage, useUploadImage }