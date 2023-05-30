export default function reducer(state, action){
    const { type, payload } = action;
    const { comics, sortedComics, basketComics, favoritesComics, notifyArray } = state;
    
    switch(type){
        case "ADD_TO_BASKET":
            return {
                ...state,
                basketComics: [...basketComics, payload]
            }
        case "INCREASE_COUNTER":
            return {
                ...state,
                basketComics: basketComics.map(p => {
                    
                    if(p.id === payload){

                        return {
                            ...p,
                            amount: ++p.amount
                        }
                    }
                    return p;
                })
            }
        case "DECREASE_COUNTER":
            return{ 
                ...state,
                basketComics: basketComics.map(p => {
                    if(p.id === payload){
                        return {
                            ...p,
                            amount: --p.amount
                        }
                    }
                    return p;
                })
            }
        case "REMOVE_FROM_BASKET": 
            return {
                ...state,
                basketComics: basketComics.filter(item => item.id !== payload.id)
            }
        case "REMOVE_ALL_FROM_BASKET":
            return {
                ...state,
                basketComics: []
            }
        case "SET_COMICS_DATA":
            return {
                ...state,
                comics: payload,
            }
        case "SORT_COMICS":
            return {
                ...state,
                sortedComics: payload
            }
        case "SLICE_COMICS_DATA":
            return {
                ...state,
                comicsPerPage: sortedComics.length ? sortedComics.slice(payload.start, payload.end) : comics.slice(payload.start, payload.end)
            }
        case "SET_CURRENT_PAGE":
            return {
                ...state,
                currentPage: payload
            }       
        case "ADD_TO_FAVORITES":
            return {
                ...state,
                favoritesComics: [...favoritesComics, payload.id],
            } 
        case "REMOVE_FROM_FAVORITES":
            return {
                ...state,
                favoritesComics: favoritesComics.filter(id => id !== payload.id)
            }
        case "REMOVE_ALL_FROM_FAVORITES":
            return {
                ...state,
                favoritesComics: []
            }        

        case "SET_FILTERED_ARRAY":
            return {
                ...state,
                filteredArray: payload
            }

        case "SHOW_PRODUCT_MODAL":
            return {
                ...state,
                productModal: {show: true, id: payload.id } 
            }
        case "CLOSE_PRODUCT_MODAL":
            return {
                ...state,
                productModal: false
            }


        case "ADD_NOTIFY":
            return {
                ...state,
                notifyArray: [...notifyArray, payload]
            }
        case "REMOVE_NOTIFY":
            return {
                ...state,
                notifyArray: notifyArray.filter(notify => notify.id !== payload)
            }

        case "SELECT_SORT_OPTION":
            return {
                ...state,
                selectedSortOption: payload
            }
    }
}