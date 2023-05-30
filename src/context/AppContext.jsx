// React
import { useReducer, createContext } from "react";
// Context
export const AppContext = createContext();
// LocalStorage
import LocalStorage from "../LocalStorage";
// Reducer
import reducer from "./reducer";

const initialState = {
    comics: [],
    comicsPerPage: [],
    sortedComics: [],
    filteredArray: [],
    basketComics: LocalStorage.get('Basket') || [],
    favoritesComics: LocalStorage.get('Favorite') || [],
    selectedSortOption: new URLSearchParams(window.location.search).get('sort') || 'Default',
    sortOptions: ['Default', 'High Price', 'Low Price', 'A-Z', 'Z-A'],
    currentPage: Number(new URLSearchParams(window.location.search).get('page')) || 1,
    productModal: false,
    notifyArray: []
};


export default function AppContextProvider({children}){
    const [state, dispatch] = useReducer(reducer, initialState);

    const { comics, comicsPerPage, sortedComics, filteredArray, basketComics, favoritesComics, selectedSortOption, sortOptions, currentPage, productModal, notifyArray} = state;

    // Basket
    const addToBasket = (id) => {
        const findProduct = basketComics.find(p => p.id === id);

        if(!findProduct){
            dispatch({type: "ADD_TO_BASKET", payload: {id: id, amount: 1}});
        }
    }
    const removeFromBasket = (id) => {
        dispatch({type: "REMOVE_FROM_BASKET", payload: {id: id}})
    }
    const increaseCounter = (id) => {
        dispatch({type: "INCREASE_COUNTER", payload: id});
    }
    const decreaseCounter = (id, setBasketRenderData) => {
        const findProduct = basketComics.find(p => p.id === id);

        if(findProduct){
            if(findProduct.amount === 1){
                setBasketRenderData && setBasketRenderData((prevState) => prevState.filter(item => item.id !== id));
                removeFromBasket(id);
            } else {
                dispatch({type: "DECREASE_COUNTER", payload: id});
            }
        }
    }
    const removeAllFromBasket = () => {
        dispatch({type: "REMOVE_ALL_FROM_BASKET"});
    }

    // Favorites
    const addToFavoritesOrRemove = (id) => {
        const findItem = state.favoritesComics.find(fId => fId === id);

        if(findItem){
            dispatch({type: "REMOVE_FROM_FAVORITES", payload: {id: id}});

        } else {
            dispatch({type: "ADD_TO_FAVORITES", payload: {id: id}});
        }
    }
    const removeAllFromFavorites = () => {
        dispatch({type: "REMOVE_ALL_FROM_FAVORITES"});
    }


    // Data
    const setComicsData = (data) => {
        dispatch({type: "SET_COMICS_DATA", payload: data});
    }
    const sliceComicsData = (start, end) => {
        dispatch({type: "SLICE_COMICS_DATA", payload: {start: start, end: end}});
    }
    const setFilteredArray = (filteredArray) => {
        dispatch({type: "SET_FILTERED_ARRAY", payload: filteredArray})
    }


    // Pagination
    const setCurrentPage = (num) => {
        dispatch({type: "SET_CURRENT_PAGE", payload: num});
    }

    
    // Modal
    const showProductModal = (id) => {
        dispatch({type: "SHOW_PRODUCT_MODAL", payload: {id: id}});
    }
    const closeProductModal = () => {
        dispatch({type: "CLOSE_PRODUCT_MODAL"});
    }


    // Notify
    const addNotify = (message, type) => {
        dispatch({type: "ADD_NOTIFY", payload: {id: crypto.randomUUID(), message, type}});
    }
    const removeNotify = (id) => {
        dispatch({type: "REMOVE_NOTIFY", payload: id});
    }


    // Sort
    const selectSortOption = (value) => {
        dispatch({type: "SELECT_SORT_OPTION", payload: value});
    }
    const sortComics = (value) => {
        let sortedComics = filteredArray && filteredArray.length ? [...filteredArray] : [...comics];

        switch(value){
            case "A-Z":
                sortedComics = sortedComics.sort((a, b) => {
                    if(a.title < b.title) {
                        return -1;
                    }
                    if(a.title > b.title) {
                        return 1;
                    }
                    return 0;
                });
                break;
            case "Z-A":
                sortedComics = sortedComics.sort((a, b) => {
                    if(a.title > b.title) {
                        return -1;
                    }
                    if(a.title < b.title) {
                        return 1;
                    }
                    return 0;
                });
                break;
            case "Low Price":
                sortedComics = sortedComics.sort((a, b) => {
                    return parseFloat(a.prices[0].price) - parseFloat(b.prices[0].price);
                });
                break;
            case "High Price":
                sortedComics = sortedComics.sort((a, b) => {
                    return parseFloat(b.prices[0].price) - parseFloat(a.prices[0].price);
                });
                break;              
        }
        
        dispatch({type: "SORT_COMICS", payload: sortedComics});      
    }


    const value = {
        comics,
        comicsPerPage,
        basketComics,
        favoritesComics,
        currentPage,
        sortedComics,
        selectedSortOption,
        sortOptions,
        selectSortOption,
        setComicsData,
        addToBasket,
        removeFromBasket,
        increaseCounter,
        decreaseCounter,     
        sliceComicsData,
        sortComics,
        setCurrentPage,    
        addToFavoritesOrRemove,  
        removeAllFromBasket,
        removeAllFromFavorites,

        
        filteredArray,
        setFilteredArray,

        productModal,
        showProductModal,
        closeProductModal,

        notifyArray,
        addNotify,
        removeNotify,
    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}