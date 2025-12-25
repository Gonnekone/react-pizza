import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {BrowserRouter} from 'react-router'
import App from './App'
import {Provider} from "react-redux";
import {store} from "./redux/store.js";

const rootElem = document.getElementById("root");

if (rootElem) {
    createRoot(rootElem).render(
        <BrowserRouter>
            <Provider store={store}>
                <StrictMode>
                    <App/>
                </StrictMode>
            </Provider>
        </BrowserRouter>,
    )
}
