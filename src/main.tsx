import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {NextUIProvider} from "@nextui-org/react";
import "@fontsource/inter/300.css";
import "@fontsource/inter";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/inter/800.css";
import "@fontsource/inter/900.css";
import {BrowserRouter} from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <NextUIProvider>
          <BrowserRouter>
          {/*<main className="dark text-foreground bg-background">*/}
              <App/>
          {/*</main>*/}
          </BrowserRouter>
      </NextUIProvider>
  </React.StrictMode>
,
)
