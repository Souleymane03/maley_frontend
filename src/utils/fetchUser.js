export const fetchUser = () => {
    return localStorage.getItem("User") !== undefined ? JSON.parse(localStorage.getItem("User")) : localStorage.clear();
}
