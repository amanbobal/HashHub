import React, { useEffect, useRef, useState } from 'react'
import { useAuth } from '../../services/AuthContext'
import { Link, Outlet, useLocation } from 'react-router-dom';

function Users() {
    const { user } = useAuth();
    const [enabled, setEnabled] = useState(false);
    const inputRef = useRef(null);
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const location = useLocation();

    const handleEnable = () => {
        setEnabled(prev => !prev);
        setSearch(""); // Reset search
        if (!enabled) {
            setTimeout(() => {
                inputRef.current?.focus();
            }, 0);
        }
    };

    const getUsers = async () => {
        try {
            const response = await fetch("http://localhost/hashhub/users.php", { method: "GET" });
            const data = await response.json();

            if (data.status === "success") {
                const allusers = data.users
                    .filter(item => String(item.unique_id) !== String(user.id))
                    .sort((a, b) => `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`));
                setUsers(allusers);
            } else {
                setUsers([]);
            }
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    }

    useEffect(() => {
        getUsers();
        const interval = setInterval(() => getUsers(), 3000);
        return () => clearInterval(interval);
    }, []);

    // Filtered users based on search input
    const filteredUsers = users.filter(u => {
        const fullName = `${u.firstName} ${u.lastName}`.toLowerCase();
        return search ? fullName.includes(search.toLowerCase()) : true;
    });

    return (
        <div className='w-full grid lg:grid-cols-[30%_70%] h-screen overflow-auto'>
            {/* Sidebar */}
            <div className='bg-gradient-to-br from-zinc-900 via-black to-zinc-800 p-4'>
                <div className='w-full h-full bg-gradient-to-br from-black to-gray-700 flex-col flex '>
                    {/* User Info */}
                    <div className='flex-1/10 p-2 flex bg-black/30 items-center gap-5 px-4'>
                        <div className='p-2 bg-white rounded-full'>
                            <img src="/vite.svg" alt="" className='w-[24px] h-[24px]' />
                        </div>
                        <div className='bg-black/25 flex flex-col justify-center'>
                            <h1 className='font-bold'>{user.firstName} {user.lastName}</h1>
                            <h2>{user.status}</h2>
                        </div>
                    </div>

                    {/* Search Input */}
                    <div className='flex-9/10 mt-1'>
                        <div className='flex w-full px-4 justify-center items-center'>
                            <div className='w-full'>
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className={`w-full rounded-l-md px-2 py-1 transition 
                                        ${enabled ? "bg-white/50 text-green-100" : "bg-white/10 text-gray-400"}`}
                                    placeholder="Search a user"
                                    disabled={!enabled}
                                />
                            </div>
                            <button
                                onClick={handleEnable}
                                className="flex justify-center items-center text-2xl bg-white/10 px-2 rounded-r-md cursor-pointer hover:bg-white/20"
                            >
                                {enabled ? <p>❌</p> : <p>🔍</p>}
                            </button>
                        </div>

                        {/* Users List for desktops */}
                        <div>
                            {filteredUsers.length > 0 ? (
                                <ul className='mt-2 flex flex-col gap-1 w-full'>
                                    {filteredUsers.map((u, idx) => (
                                        <Link to={`/home/chat/${u.unique_id}`}>
                                            <li key={idx} className='flex items-center gap-5 px-4 w-full'>
                                                <div className="w-12 h-12 rounded-full overflow-hidden">
                                                    <img
                                                        src={`http://localhost/hashhub/uploads/${u.img}`}
                                                        alt={`${u.firstName} ${u.lastName}`}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <div className='bg-black/25 flex flex-col justify-center w-full p-2 rounded-xl'>
                                                    <h1 className='font-bold'>{u.firstName} {u.lastName}</h1>
                                                    <h2>{u.status}</h2>
                                                </div>
                                            </li>
                                        </Link>
                                    ))}
                                </ul>
                            ) : (
                                <div className='py-2 px-4 font-bold animate-pulse'>No people available to chat...</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Area */}
            <div className="lg:flex hidden w-full">
                {location.pathname === "/home" ? (
                    <div className="flex items-center justify-center w-full h-full text-gray-400 animate-pulse text-2xl">
                        👈 Select a user to start chatting
                    </div>
                ) : (
                    <Outlet />
                )}
            </div>

        </div>
    );
}

export default Users;
