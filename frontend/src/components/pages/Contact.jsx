import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from "axios"
import './Contact.css'
import { faker } from 'https://cdn.skypack.dev/@faker-js/faker';

export function Contact({}) {

          
    return (
        <div className="contact">
            <div className="head">
                <h1 className="title">Contact Us</h1>
            </div>
            <div>
                {faker.lorem.lines(10)}
            </div>
        </div>
    )
}