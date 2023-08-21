import React, { useState, useEffect } from "react";
import { faker } from 'https://cdn.skypack.dev/@faker-js/faker';
import './Home.css';

export function Home() {

    return <div className="homepage">
            <img src={faker.image.urlLoremFlickr({ category: 'coffee,whitebackground', width: 2000, height: 1000, randomize: true })}></img>
            <img src={faker.image.urlLoremFlickr({ category: 'coffee,whitebackground', width: 2000, height: 1000, randomize: true })}></img>
        </div>
}

