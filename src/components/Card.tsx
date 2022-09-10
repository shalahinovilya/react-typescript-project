import React from 'react';
import {User} from "../interfaces";

interface CardProps {
    user: User
}

const Card = ({user}: CardProps) => {
    return (
        <div className="cards-wrapper__card-container card-container">
            <div className="card-container__user-card user-card">
                <div className="user-card__info">
                    <div className="info__name">
                        {user.name}
                    </div>
                    <div className="info__email">
                        {user.email}
                    </div>
                    <div className="info__phone">
                        {user.phone}
                    </div>

                    <div className="info__website">
                        {user.website}
                    </div>
                </div>
                <div
                    id={user.id.toString()}
                    className="user-card__show-posts"
                >
                    Show posts
                </div>
            </div>
        </div>
    );
};

export default Card;