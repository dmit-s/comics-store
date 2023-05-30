// React
import { useContext, useEffect, useState } from "react";
// React Router
import { Route, Routes, useSearchParams } from "react-router-dom";
// Api
import { getComics } from "./api";
// Components
import Layout from "./components/Layout";
import NotFound from "./components/NotFound";
// Pages
import HomePage from "./pages/HomePage";
import BasketPage from "./pages/BasketPage";
import FavoritePage from "./pages/FavoritePage";
// Context
import { AppContext } from "./context/AppContext";
// Other
import LocalStorage from "./LocalStorage";


export default function App(){
    const { basketComics, favoritesComics, setComicsData, addNotify } = useContext(AppContext);

    const [loading, setLoading] = useState(true);
    const [scrolling, setScrolling] = useState(false);
    const [searchParams] = useSearchParams();
    

    useEffect(() => {
        if(searchParams.get('success')){
            addNotify('SUCCESS', 'success');
        } else if(searchParams.get('canceled')){
            addNotify('CANCEL', 'error');
        }
        getComics().then(data => {
            setComicsData(data);
            setLoading(false);
        });
    }, [])

    const onScrollFunc = () => {   
        if(window.pageYOffset === 0){
            setScrolling(false);
        }
    } 

    useEffect(() => {
        scrolling && window.addEventListener('scroll', onScrollFunc);

        return () => window.removeEventListener('scroll', onScrollFunc);
    }, [scrolling])

    useEffect(() => {
        LocalStorage.set('Basket', basketComics);
        LocalStorage.set('Favorite', favoritesComics);
    }, [basketComics, favoritesComics])

    return (
        <Routes>
            <Route path="/" element={<Layout/>}>
                <Route index element={<HomePage loading={loading} scrolling={scrolling} setScrolling={setScrolling}/>}/>
                <Route path="basket" element={<BasketPage/>}/>
                <Route path="favorite" element={<FavoritePage/>}/>
                <Route path="*" element={<NotFound text={'Nothing found'}/>}/>
            </Route>
        </Routes>
    )
}