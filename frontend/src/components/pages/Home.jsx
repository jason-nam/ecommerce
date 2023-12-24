import React, { useState, useEffect } from "react";
import { faker } from 'https://cdn.skypack.dev/@faker-js/faker';
import './Home.css';
import allPreview from "../../assets/images/amanda-vick-ohWf6YuzOQk-unsplash.jpg"
import menPreview from "../../assets/images/nimble-made-BKYeLLB1OxI-unsplash.jpg"
import womenPreview from "../../assets/images/priscilla-du-preez-dlxLGIy-2VU-unsplash.jpg"
import kidsPreview from "../../assets/images/aditya-romansa-4ZuX_5U6xTs-unsplash.jpg"


export function Home() {

    return <div className="homepage" >
        <div className="home_preview">
            <a href="/products">
                <div className="home_title">ALL</div>
                <img src={allPreview} alt="All Products"></img>
            </a>
        </div>
        <div className="home_column">
        <div className="home_preview">
            <a href="/products/women">
                <div className="home_title">WOMEN</div>
                <img src={womenPreview} alt="Women"></img>
            </a>
        </div>
        <div className="home_preview">
            <a href="/products/men" >
                <div className="home_title">MEN</div>
                <img src={menPreview} alt="Men"></img>
            </a>
        </div>
        <div className="home_preview">
            <a href="/products/children" >
                <div className="home_title">CHIDLREN</div>
                <img src={kidsPreview} alt="Kids"></img>
            </a>
        </div>
        </div>
    </div>
}

