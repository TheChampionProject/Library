import React, { useState, useEffect } from "react";
import TableStructure from "../components/TableStructure";
import "../App.css";
import EditPopup from "../components/EditPopup.js";
import AddPopup from "../components/AddPopup.js";
import Header from "../components/Header";
import UserProtection from "../components/UserProtection.js";
import { useNavigate } from "react-router-dom";
import { getSignedInUserInfoFB } from "../FirebaseFunctions";
import { useAuthState } from "react-firebase-hooks/auth"; // use this in every page
import { auth } from "../FirebaseFunctions"; // use this in every page
export default function ManagePage() {
    const [book, setBook] = useState(null); // The book that gets passed to popup
    const [showEditPoup, setShowEditPopup] = useState(false); // Show the popup
    const [showAddPopup, setShowAddPopup] = useState(false); // Show the popup
    const [managedBook, setManagedBook] = useState(null); // The book entry that needs to be edited
    const [alert, setAlert] = useState({
        show: false,
        message: "",
        success: false,
    }); // Show the alert
    const [searchQuery, setSearchQuery] = useState("");
    let [books, setBooks] = useState(null);

    const [scanMode, setScanMode] = useState(false);
    let [genreFilter, setGenreFilter] = useState("All");
    //const [user, loading] = useAuthState(auth);
    let navigate = useNavigate();

    let handleAddBook = (e) => {
        setShowAddPopup(true);
    };

    //useEffect(() => {
    //    if (!loading && !user) {
    //        navigate("/login");
    //    }
    //}, [user]);

    useEffect(() => {
        const statusKeyboardInput = (e) => {
            if (e.keyCode === 16 && !showEditPoup && !showAddPopup) {
                setShowAddPopup(true);
            }
        };

        window.addEventListener("keydown", statusKeyboardInput);
        return () => window.removeEventListener("keydown", statusKeyboardInput);
    });

    return (
        <>
            <UserProtection />

            <Header
                setSearchQuery={setSearchQuery}
                alert={alert}
                href={"/home"}
                hrefName={"Home Page"}
                useSearchBar={true}
                genreFilter={genreFilter}
                setGenreFilter={setGenreFilter}
            />

            <TableStructure
                mode="manage"
                setBook={setBook}
                setShowEditPopup={setShowEditPopup}
                managedBook={managedBook}
                setManagedBook={setManagedBook}
                setAlert={setAlert}
                searchQuery={searchQuery}
                books={books}
                setBooks={setBooks}
                genreFilter={genreFilter}
            />
            <button
                type="button"
                className="AddBookButton"
                onClick={(e) => {
                    e.preventDefault();
                    handleAddBook();
                }}
            >
                +
            </button>

            <EditPopup
                showEditPopup={showEditPoup}
                setShowEditPopup={setShowEditPopup}
                book={book}
                setBook={setBook}
                setManagedBook={setManagedBook}
                setAlert={setAlert}
                scanMode={scanMode}
                setScanMode={setScanMode}
                setShowAddPopup={setShowAddPopup}
                books={books}
            />

            <AddPopup
                showAddPopup={showAddPopup}
                setShowAddPopup={setShowAddPopup}
                setBook={setBook}
                setAlert={setAlert}
                setShowEditPopup={setShowEditPopup}
                books={books}
                scanMode={scanMode}
                setScanMode={setScanMode}
            />
        </>
    );
}
