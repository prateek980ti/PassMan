import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';


import 'react-toastify/dist/ReactToastify.css';

const Manager = () => {
    const ref = useRef()
    const passwordRef = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setpasswordArray] = useState([])
    useEffect(() => {
        let passwords = localStorage.getItem("passwords")
        if (passwords) {
            setpasswordArray(JSON.parse(passwords))
        }

    }, [])


    const showPassword = () => {
        passwordRef.current.type = "text"
        if (ref.current.src.includes("/icons/eyecross.png")) {
            ref.current.src = "/icons/eye.png"
            passwordRef.current.type = "password"
        }
        else {
            passwordRef.current.type = "text"
            ref.current.src = "/icons/eyecross.png"
        }
    }

    const savePassword = () => {
        if(form.site.length >3 && form.username.length >3 && form.password.length >3){

            setpasswordArray([...passwordArray, {...form,id: uuidv4()}])
            localStorage.setItem("passwords", JSON.stringify([...passwordArray, {...form,id: uuidv4()}]))
            console.log([...passwordArray, form])
            setform({ site: "", username: "", password: "" })
            toast('Password saved succesfully !', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }

        else{
            toast('Password not saved succesfully !', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });

        }
    }

    const deletePassword = (id) => {
        console.log("deleting password with id ",id)
        let c=confirm("Do you really want to delete this password ?")
        if(c){

            setpasswordArray(passwordArray.filter(item=>item.id!==id))
            localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item=>item.id!==id)))
            toast('Password Deleted !', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
        
        // console.log([...passwordArray, form])
    }
    const editPassword = (id) => {
        console.log("deleting password with id ",id)
        setform(passwordArray.filter(i=>i.id===id)[0])
        setpasswordArray(passwordArray.filter(item=>item.id!==id))
        // localStorage.setItem("passwords", JSON.stringify([...passwordArray, form]))
        // console.log([...passwordArray, form])
    }

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })

    }

    const copyText = (text) => {
        toast('Copied to clipboard!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        navigator.clipboard.writeText(text)

    }


    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition="Bounce"
            />
            {/* Same as */}
            <ToastContainer />
            <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]">
            </div></div>
            <div className="px-2 md:mycontainer">
                <h1 className='text-4xl font-bold text-center'>
                    <span className='text-green-500'>&lt;</span>

                    PassMan
                    <span className='text-green-500'>/&gt;</span>
                </h1>
                <p className='text-center text-lg'>Your personal Password Manager</p>

                <div className=" flex flex-col p-4 gap-8 items-center">
                    <input value={form.site} onChange={handleChange} placeholder='Enter URL' className='rounded-full border border-green-900 w-full text-black px-4 py-1' type="text" name="site" id="site" />
                    <div className="flex flex-col md:flex-row w-full justify-between gap-8">
                        <input value={form.username} onChange={handleChange} placeholder='Enter Username' className='rounded-full border border-green-900 w-full text-black px-4 py-1' name='username' id="username" type="text" />
                        <div className="relative">

                            <input ref={passwordRef} value={form.password} onChange={handleChange} placeholder='Enter Password' className='rounded-full border border-green-900 w-full text-black px-4 py-1' name='password' id="password" type="password" />
                            <span className='absolute right-[3px] top-[2px] cursor-pointer' onClick={showPassword} >
                                <img ref={ref} className='p-1' width={30} src="icons/eye.png" alt="" />
                            </span>
                        </div>
                    </div>

                    <button onClick={savePassword} className='flex justify-center items-center bg-green-400 hover:bg-green-300 rounded-full p-2 w-fit border border-green-900'><lord-icon
                        src="https://cdn.lordicon.com/jgnvfzqg.json"
                        trigger="hover">
                    </lord-icon>
                        Save Password</button>

                </div>
                <div className="passwords">
                    <h2 className='font-bold text-2xl py-4'>Your Passwords</h2>
                    {passwordArray.length === 0 && <div>No passwords to show</div>}
                    {passwordArray.length != 0 && <table className="table-auto w-full rounded-md overflow-hidden ">
                        <thead className='bg-green-800 text-white '>
                            <tr>
                                <th className='py-2'>Site</th>
                                <th className='py-2'>Username</th>
                                <th className='py-2'>Password</th>
                                <th className='py-2'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {passwordArray.map((item, index) => {
                                return <tr key={index}>
                                    <td className='py-2 border border-white bg-green-100 text-center'>
                                        <div className='flex p-2 justify-center items-center'>
                                            <a href={item.site} target='_blank'>{item.site}</a>
                                            <div className='p-2 cursor-pointer ' onClick={() => { copyText(item.site) }}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 512 512">
                                                    <path fill="currentColor" d="M408 480H184a72 72 0 0 1-72-72V184a72 72 0 0 1 72-72h224a72 72 0 0 1 72 72v224a72 72 0 0 1-72 72Z" />
                                                    <path fill="currentColor" d="M160 80h235.88A72.12 72.12 0 0 0 328 32H104a72 72 0 0 0-72 72v224a72.12 72.12 0 0 0 48 67.88V160a80 80 0 0 1 80-80Z" />
                                                </svg>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='py-2 border border-white bg-green-100 text-center w-32 '>
                                        <div className='flex justify-center items-center'>
                                            {item.username}
                                            <div className='p-2 cursor-pointer ' onClick={() => { copyText(item.username) }}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 512 512">
                                                    <path fill="currentColor" d="M408 480H184a72 72 0 0 1-72-72V184a72 72 0 0 1 72-72h224a72 72 0 0 1 72 72v224a72 72 0 0 1-72 72Z" />
                                                    <path fill="currentColor" d="M160 80h235.88A72.12 72.12 0 0 0 328 32H104a72 72 0 0 0-72 72v224a72.12 72.12 0 0 0 48 67.88V160a80 80 0 0 1 80-80Z" />
                                                </svg>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='py-2 border border-white bg-green-100 text-center w-32 '>
                                        <div className='flex justify-center items-center'>
                                            {item.password}
                                            <div className='p-2 cursor-pointer ' onClick={() => { copyText(item.password) }}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 512 512">
                                                    <path fill="currentColor" d="M408 480H184a72 72 0 0 1-72-72V184a72 72 0 0 1 72-72h224a72 72 0 0 1 72 72v224a72 72 0 0 1-72 72Z" />
                                                    <path fill="currentColor" d="M160 80h235.88A72.12 72.12 0 0 0 328 32H104a72 72 0 0 0-72 72v224a72.12 72.12 0 0 0 48 67.88V160a80 80 0 0 1 80-80Z" />
                                                </svg>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='py-2 border border-white bg-green-100 text-center w-32 '>
                                        <div className='cursor-pointer flex items-center justify-center'>
                                            <span class="material-symbols-outlined mx-1" onClick={()=>{editPassword(item.id)}}>
                                                edit
                                            </span>
                                            <span class="material-symbols-outlined mx-1" onClick={()=>{deletePassword(item.id)}}>
                                                delete
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                            })}

                        </tbody>
                    </table>}
                </div>
            </div>
        </>
    )
}

export default Manager

