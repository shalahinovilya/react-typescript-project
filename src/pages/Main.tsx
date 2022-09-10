import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Post, User} from "../interfaces";
import Card from "../components/Card";
import Header from "../components/Header";
import Posts from "../components/Posts";


const Main = () => {

    const [users, setUsers] = useState<User[]>([])
    const [posts, setPosts] = useState<Post[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [start, setStart] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const [pagesCounter, setPagesCounter] = useState(1)
    const [activeUser, setActiveUser] = useState(NaN)

    const limit = 4

    async function getUsers() {
        const res = await axios.get<User[]>('https://jsonplaceholder.typicode.com/users')
        setUsers(res.data)
        localStorage.setItem('users', JSON.stringify(res.data))
        setPagesCounter(Math.ceil(res.data.length / 4))
    }

    async function getUserPosts() {
        const res = await axios.get<Post[]>(`https://jsonplaceholder.typicode.com/posts?userId=${activeUser}`)
        setPosts(res.data)
        return res
    }

    async function activeUserHandler(userId: number) {
        if (userId === activeUser) {
            setActiveUser(NaN)
        } else {
            setActiveUser(userId)
        }
    }

    // searching by username
    async function searchUsers(searchString: string) {
        if (!searchString) {
            const allUsers = JSON.parse(localStorage.getItem('users') || '[]')
            setUsers(allUsers)
            setPagesCounter(Math.ceil(allUsers.length / 4))
            return;
        }
        const filteredUsers = users.filter(user => user.name.toLowerCase().includes(searchString.toLowerCase()))
        setUsers(filteredUsers)
        setPagesCounter(Math.ceil(filteredUsers.length / 4))
    }

    // sorting by name
    async function sortUsersByName() {
        setUsers(users.slice().sort((a, b) => {
            let nameA = a.name, nameB = b.name
            if (nameA < nameB)
                return -1
            if (nameA > nameB)
                return 1
            return 0
        }))
    }

    async function nextPage() {

        if (currentPage < pagesCounter) {
            setCurrentPage(currentPage + 1)
            setStart(start + limit)
        }
    }

    async function prevPage() {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
            setStart(start - limit)
        }
    }

    useEffect(() => {
        setIsLoading(true)
        getUsers()
        setIsLoading(false)
    }, [])


    useEffect(() => {
        if (activeUser) {
            getUserPosts().then(res => setPosts(res.data))
        }
    }, [activeUser])

    if (isLoading) {
        return (<div className="data-loading">Data is loading...</div>)
    }

    return (
        <div className="main">
            <Header
                searchUsers={searchUsers}
                sortUsersByName={sortUsersByName}
            />
            <div
                className={`main-container__cards-wrapper ${activeUser ? 'cards-wrapper-sm' : 'cards-wrapper-lg'}`}
                onClick={(e) => {
                    const className = (e.target as Element).className
                    if (className === 'user-card__show-posts') {
                        activeUserHandler(+((e.target as Element).id))
                    }
                }}
            >
                {users.slice(start, limit + start).map(user => (
                    <Card
                        user={user}
                    />
                ))}
            </div>
            <div className={`main-container__posts-wrapper ${activeUser ? 'active' : 'disabled'}`}>
                {posts.length && <Posts posts={posts}/>}
            </div>
            <div className="main__next-btn" onClick={nextPage}><span>Next</span><i
                className="fa-solid fa-angle-right"></i></div>
            <div className="main__prev-btn" onClick={prevPage}><i
                className="fa-solid fa-angle-left"></i><span>Previous</span></div>
        </div>
    );
};

export default Main;