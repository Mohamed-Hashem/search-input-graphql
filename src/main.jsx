import React, { StrictMode } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import Layout from "./Layout.jsx";
import HomePage from "./Pages/HomePage/HomePage.jsx";
import ErrorPage from "./Pages/ErrorPage/ErrorPage.tsx";
import SearchPage from "./Pages/SearchPage/SearchPage.jsx";
import DetailPage from "./Pages/DetailPage/DetailPage.jsx";
import * as ReactDOM from "react-dom";
import axe from "@axe-core/react";

import "./index.css";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        errorElement: (
            <Layout>
                <ErrorPage />
            </Layout>
        ),
        children: [
            {
                path: "/",
                element: <HomePage />,
            },
            {
                path: "/home",
                element: <HomePage />,
            },
            {
                path: "/search",
                element: <SearchPage />,
            },
            {
                path: "/search/:id",
                element: <DetailPage />,
            },
        ],
    },
]);

const client = new ApolloClient({
    uri: "https://sparrow-staging.escapes.tech/graphql/",
    cache: new InMemoryCache(),
});

axe(React, ReactDOM, 1000);

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <ApolloProvider client={client}>
            <RouterProvider router={router} fallbackElement={<ErrorPage />} />
        </ApolloProvider>
    </StrictMode>,
);

/*

https://sparrow-staging.escapes.tech/graphql/

query SaleSearch {
    saleSearch(query: "London", travelTypes: "HOTEL_ONLY") {
        resultCount
        sales(limit: 10, offset: 0) {
            id
            editorial {
                title
                destinationName
            }
            photos {
                url
            }
        }
    }
}

*/