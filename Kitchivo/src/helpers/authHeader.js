export function authHeader() {
    let user = localStorage.getItem("token");
    // let language = localStorage.getItem("language");

    if (user) {
        return {
            Authorization: `Bearer ${user}`,
            // language: language 
        };
    } else {
        return {};
    }
}

export function authHeaderWithImage() {
    let user = localStorage.getItem("token");
    // let language = localStorage.getItem("language");

    if (user) {
        return {
            Authorization: `Bearer ${user}`,
            "Content-Type": "multipart/form-data",
            // language: language,
        };
    } else {
        return {};
    }
}