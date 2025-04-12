const apiUrl = "https://reqres.in/api/users"

const getAllUsers = () => {
    const controller = new AbortController();
    const signal = controller.signal;

    return fetch(`${apiUrl}?page=1&per_page=20"`, { signal })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            return data.data;
        })
        .catch(error => {
            if (error.name === 'AbortError') {
                console.error('Fetch was aborted!');
            } else {
                console.error('There was a problem with the fetch operation:', error);
            }
        });
};

const getNowUser = (id) => {
    return fetch(`${apiUrl}/${id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            return data.data;
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

const createUser = async (userData) => {
    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        });

        if (!response.ok) {
            throw new Error("Network response was not ok " + response.statusText);
        }

        const data = await response.json();
        console.log("User Created:", data);
        return data;

    } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
    }
};

const editUser = async (id, newUserData) => {
    try {
        const response = await fetch(`${apiUrl}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newUserData)
        });

        if (!response.ok) {
            throw new Error("Network response was not ok " + response.statusText);
        }

        const data = await response.json();
        console.log("User data edited:", data);
        return data;
    } catch (err) {
        console.error(err)
    }
}

const deleteUser = async (id) => {
    try {
        const response = await fetch(`${apiUrl}/${id}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error("Network response was not ok " + response.statusText);
        }

        const data = response;
        console.log("User data deleted", data);
        return data;
    } catch (err) {
        console.error(err)
    }
}


export {
    getAllUsers,
    createUser,
    getNowUser,
    editUser,
    deleteUser
}

