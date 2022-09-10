import React, {useState} from 'react';

interface HeaderProps {
    searchUsers(searchString: string): {}

    sortUsersByName(): void
}

const Header = ({searchUsers, sortUsersByName}: HeaderProps) => {

    const [name, setName] = useState('')

    return (
        <div className="main-container__header header">
            <div className="header__sort">
                <div className="header__sort" onClick={sortUsersByName}>Sort</div>
            </div>
            <div className="header__search">
                <label
                    htmlFor="searchByName"
                    onClick={() => searchUsers(name)}
                >
                    Search
                </label>
                <input
                    id="searchByName"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
        </div>
    );
};

export default Header;