// React
import { useEffect, useContext } from "react";
// React Router
import { Outlet } from "react-router-dom";
// Components
import { Container } from "./Container";
import ProductModal from "./ProductModal";
import NotifyContainer from "./NotifyContainer";
// Context
import { AppContext } from "../context/AppContext";

export default function Main(){
    const { productModal, notifyArray } = useContext(AppContext);

    return (
        <main>
            <Container>
                <Outlet/>
                {productModal && <ProductModal/>}
                {notifyArray && <NotifyContainer/>}
            </Container>
        </main>
    )
}