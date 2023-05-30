class LocalStorage{
    constructor(){}

    get = (key) => {
        return JSON.parse(localStorage.getItem(key));
    }

    set = (key, value = '') => {
        return localStorage.setItem(key, JSON.stringify(value));
    }

    remove = () => {
        return localStorage.removeItem(key);
    }
}

export default new LocalStorage

