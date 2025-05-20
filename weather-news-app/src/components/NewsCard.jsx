import React from 'react'
import './NewsCard.css'

const NewsCard = ({ title, author, description, image, link }) => {
    return (
        <div className="news-card">
            <h2>{title}</h2>
            <h3>{author}</h3>
            <p>{description}</p>
            <img src={image}></img>
            <div>
                <a href={link}>Link</a>
            </div>
        </div>
    )
}

export default NewsCard