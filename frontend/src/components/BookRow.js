import React from "react";
import "../App.css";
export default function BookRow({
    book,
    number,
    setBook,
    setShow,
    setManagedBook,
    setArchiveRequest,
    mode,
}) {
    let textColor;

    const edit = (e) => {
        e.preventDefault();
        setBook(book);
        setShow(true);
    };

    const gift = (e) => {
        e.preventDefault();
        book.Inventory = Math.max(0, book.Inventory - 1);
        //setArchiveRequest({ needsArchive: true, book: book });
        setManagedBook(book);
    };

    if (book.Needed >= 5 && book.Needed < 10) textColor = "#BDB76B";
    else if (book.Needed >= 10 && book.Needed < 20) textColor = "orange";
    else if (book.Needed >= 20) textColor = "red";

    let search;

    console.log(book.Title.toLowerCase())
    if (book.Title.toLowerCase().includes("s")) {
        console.log(book.Title);
        search = true;
    }

    return (
        <tr style={{ display: search ? "" : "none" }}>
            <td>{number}</td>
            <td style={{ color: textColor }}>{book.Title}</td>
            <td>{book.Genre}</td>
            <td className="Inventory">{book.Inventory}</td>
            <td>${book.Price}</td>
            <td style={{ display: mode === "gift" ? "none" : "" }}>
                <button
                    className="btn btn-primary my-2 EditButton"
                    onClick={(e) => edit(e)}
                >
                    Edit
                </button>
            </td>
            <td style={{ display: mode === "gift" ? "" : "none" }}>
                <button
                    className="btn btn-primary my-2 EditButton"
                    onClick={(e) => gift(e)}
                >
                    Gift
                </button>
            </td>
        </tr>
    );
}
