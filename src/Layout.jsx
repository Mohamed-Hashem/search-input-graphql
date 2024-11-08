import PropTypes from "prop-types";
import Header from "./Components/Header";
import { Outlet } from "react-router-dom";

function Layout({ children = null }) {
    return (
        <>
            <Header />
            <main style={{ marginTop: 60 }}>{children || <Outlet />}</main>
        </>
    );
}

Layout.propTypes = {
    children: PropTypes.node,
};

export default Layout;
