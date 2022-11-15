import asyncHandler from "express-async-handler";
import { getBooksFB, setBookFB } from "./firebase.js";
import dotenv from "dotenv";
import axios from "axios";
dotenv.config();

let ISBN, price, fbRequest;

const GOOGLE_BOOKS_API_BASE_URL =
    "https://www.googleapis.com/books/v1/volumes?q=";

const BOOKS_RUN_API_BASE_URL = "https://booksrun.com/api/v3/price/buy/";

const getAllBooks = asyncHandler(async (req, res) => {
    res.send(await getBooksFB());
});

const getSearchQueryBooks = asyncHandler(async (req, res) => {
    if (!req.body.title) {
        res.status(400);
        throw new Error("Missing Title");
    }

    return await axios.get(GOOGLE_BOOKS_API_BASE_URL + req.body.title);
});

const getBookPrice = asyncHandler(async (req, res) => {
    //ISBN = req.body.industryidentifier;

    let priceRequest = await axios.get(
        BOOKS_RUN_API_BASE_URL + ISBN + "?key=" + process.env.BOOKS_RUN_API_KEY
    );

    if ((price = priceRequest.data.result.offers.booksrun.new !== "none"))
        price = "new price " + priceRequest.data.result.offers.booksrun.new;
    else if ((price = priceRequest.data.result.offers.booksrun.used !== "none"))
        price = "used price " + priceRequest.data.result.offers.booksrun.used;
    else price = "Price Not Found";

    res.send(price);
});

// Can update a book, add a book, and archive a book
const setBook = asyncHandler(async (req, res) => {
    if (!req.body.newBook) {
        res.status(400);
        throw new Error("Missing Book");
    }

    if (req.body.archive) {
        fbRequest = await setBookFB(req.body.newBook, "archive");

        if (fbRequest === "success") res.send("success");
        else res.send("failure");
    }

    fbRequest = await setBookFB(req.body.newBook, "active");

    if (fbRequest === "success") res.send("success");
    else res.send("failure");
    
});

export { getAllBooks, setBook, getSearchQueryBooks, getBookPrice };
