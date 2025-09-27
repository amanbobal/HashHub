import React, { useEffect, useRef, useState } from 'react'
import { useAuth } from '../../services/AuthContext'

function Users() {
    const { user } = useAuth();
    const [enabled, setEnabled] = useState(false);
    const inputRef = useRef(null);
    const [users, setUsers] = useState([]);
    const handleEnable = () => {
        setEnabled(prev => !prev)

        if (!enabled) {
            setTimeout(() => {
                inputRef.current?.focus();
            }, 0);
        }
    };

    const getUsers = async () => {
        try {
            const response = await fetch("http://localhost/hashhub/users.php", {
                method: "GET",
            });

            // parse the response as JSON
            const data = await response.json();
            // console.log(data);
            if (data.status === "success") {
                const allusers = data.users.filter(
                    item => String(item.unique_id) !== String(user.id)
                );
                // allusers.sort((a, b) => a.name.localeCompare(b.name));
                setUsers(allusers);
            }
            else {
                setUsers([])
            }
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    }


    useEffect(() => {
        getUsers();
        const interval = setInterval(() => {
            getUsers();
        }, 3000); // every 3 sec

        return () => clearInterval(interval);
    }, []);


    return (
        <div className='w-full grid lg:grid-cols-[30%_70%] h-screen overflow-auto'>
            <div className='bg-gradient-to-br from-zinc-900 via-black to-zinc-800 p-4'>
                <div className='w-full h-full bg-gradient-to-br from-black to-gray-700 flex-col flex '>
                    <div className='flex-1/10 p-2 flex bg-black/30 items-center gap-5 px-4'>
                        <div className='p-2 bg-white rounded-full'>
                            <img src="/vite.svg" alt="" className='w-[24px] h-[24px]' />
                        </div>
                        <div className='bg-black/25 flex flex-col justify-center '>
                            <h1 className='font-bold'>{user.firstName} {user.lastName}</h1>
                            <h2>{user.status}</h2>
                        </div>
                    </div>
                    <div className='flex-9/10 mt-1'>
                        <div className='flex w-full px-4 justify-center items-center'>
                            <div className='w-full'>
                                <div className="w-full">
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        name="search"
                                        id="search"
                                        className={`w-full rounded-l-md px-2 py-1 transition 
                                        ${enabled ? "bg-white/50 text-green-100" : "bg-white/10 text-gray-400"}
                                        `}
                                        placeholder="Select a user to chat"
                                        disabled={!enabled} // boolean, based on state
                                    />

                                </div></div>
                            <button
                                onClick={handleEnable}
                                className="flex justify-center items-center text-2xl bg-white/10 px-2 rounded-r-md cursor-pointer hover:bg-white/20"
                            >
                                {enabled ? <p>❌ </p> : <p> 🔍 </p>}
                            </button>
                        </div>

                        {/* users listing on the page */}
                        <div>
                            {
                                users.length > 0 ?
                                    <ul className='mt-2 flex flex-col gap-1 w-full'>
                                        {users.map((u, idx) => (
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
                                        ))}

                                    </ul>
                                    :
                                    <div className='py-2 px-4 font-bold animate-pulse'>No people available to chat...</div>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className='lg:flex hidden'>
                hello
            </div>
        </div>
    )
}

export default Users