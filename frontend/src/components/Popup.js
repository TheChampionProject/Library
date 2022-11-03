import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useRef } from "https://cdn.skypack.dev/react";


export default function Popup({ show }) {
    const TitleMod = React.useRef();
    const GenreMod = React.useRef();
    const InventoryMod = React.useRef();
    const InventoryWantedMod = React.useRef();
    const PriceMod = React.useRef();
    return (
        <>
            <div
                className="d-flex align-items-center justify-content-center"
                style={{ height: "100vh" }}
            ></div>

            <Modal show={show}>
                <Modal.Header closeButton>
                    <Modal.Title>Add a Book</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <>
                        <div className="modal-body">
                            <label className="EditBookPopup">Title: </label>
                            <input type="text" ref={TitleMod} /> <br />
                            <label className="EditBookPopup">Genre: </label>
                            <input type="text" ref={GenreMod} /> <br />
                            <label className="EditBookPopup">C. Inventory: </label>
                            <input type="text" ref={InventoryMod} /> <br />
                            <label className="EditBookPopup">W. Inventory: </label>
                            <input type="text" ref={InventoryWantedMod} /> <br />
                            <label className="EditBookPopup">Price: </label>
                            <input type="text" ref={PriceMod} /> <br />
                        </div>
                    </>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" >
                        Add Book
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
