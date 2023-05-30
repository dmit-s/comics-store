import axios from "axios";

const BASE_URL = 'https://gateway.marvel.com/v1/public/';

const axiosRequest = axios.create({
    baseURL: BASE_URL,
    params: {
        apikey: import.meta.env.VITE_API_KEY,
        limit: 100
    }
})

export const getComics = async () => {
    const res = await axiosRequest.get('comics');
    return res.data.data.results;
}

export const getComicsById = async (id) => {
    const res = await axiosRequest.get(`comics/${id}`);
    return res.data.data.results[0];
}

export const getCharactersById = async (id) => {
    const res = await axiosRequest.get(`comics/${id}/characters`);
    return res.data.data.results;
}







