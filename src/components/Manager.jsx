import React from 'react'
import { useRef } from 'react'
// import React, { useState } from 'react';
import { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';
const Manager = () => {
    // const ref = useRef(null);
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [name, setName] = useState('./src/icons/eye.png');
    const passwordRef = useRef();
    const [passwordArray, setPasswordArray] = useState([]);

    useEffect(() => {
        let passwords = localStorage.getItem("passwords");
        if (passwords) {
            setPasswordArray(JSON.parse(passwords))
        }
    }, []);

    const showPassword = () => {
        const inputType = passwordRef.current.type;
        alert('Show the Password')
        if (inputType === 'password') {
            passwordRef.current.type = 'text';
            setName('./src/icons/eyecross.png');
        } else {
            passwordRef.current.type = 'password';
            setName('./src/icons/eye.png');
        }
    }

    const savePassword = () => {
        if(form.site.length>3 && form.site.username>3 && form.site.password>3){
        setPasswordArray([...passwordArray, { ...form, id: uuidv4() }])
        localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
        console.log(...passwordArray, form);
        toast('Password Saved', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }
    else{
        toast('Error: Password not saved');
    }
    }
    const deletePassword = (id) => {
        console.log("Deleting password with id ", id)
        let c = confirm("Do you Want to Delete?\nDeleting Action confirm\nclick on ok")
        if (c) {
            setPasswordArray(passwordArray.filter(item => item.id !== id))
            localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)))
            
        }
        
        toast('Password deleted Successfully', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }
    const editPassword = (id) => {
        console.log("Editing password with id ", id)
        let ed=confirm("Do You want to Edit Your Password?\nClick ok to proceed")
        if(ed){
           setform(passwordArray.filter(i => i.id === id)[0])
        setPasswordArray(passwordArray.filter(item => item.id !== id)) 
        }
      
    }
    const copyText=(text)=>{
        alert('Copied to clipboard')
        navigator.clipboard.writeText(text)
    }
    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
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
                theme="dark"
            />
            {/* Same as */}
            <ToastContainer />

            <div className="relative h-full w-full bg-slate-950">
                <div className="absolute bottom-0 left-[-20%] right-0 top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div>
                <div className="absolute bottom-0 right-[-20%] top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div>
            </div>

            <div className='p-3 md:p-0 md:mycontainer min-h-[88.2vh]'>
                <h1 className='text-4xl font-bold text-center'>
                    <span className='text-green-600'> &lt;</span>
                    Rosni's<span className='text-green-600'> OP/&gt;</span>
                </h1>
                <p className='text-green-900 text-lg text-center' >Your own Password Manager</p>
                <div className='flex flex-col p-4 text-black gap-8 items-center'>
                    <input value={form.site} onChange={handleChange} className='rounded-full border border-green-500 w-full text-black p-4 py-1' type="text" name='site' id='' placeholder='Enter Website URL' />
                    <div className='flex flex-col md:flex-row  w-full justify-between gap-8'>
                        <input value={form.username} onChange={handleChange} className='rounded-full border border-green-500 w-full text-black p-4 py-1' type="text" placeholder='Enter Username' name='username' />

                        <div className='relative'>
                            <input value={form.password} onChange={handleChange} className='rounded-full border border-green-500 w-full text-black p-4 py-1' type="text" placeholder='Enter Password' name='password' ref={passwordRef} />
                            <span className='absolute right-[3px] top-[4px] cursor-pointer' onClick={showPassword}>
                                <img className='p-1' width={26} src={name} alt="" />
                            </span>
                        </div>
                    </div>
                    <button onClick={savePassword} className='flex justify-center items-center bg-green-600 rounded-full px-4 py-2 w-fit hover:bg-yellow-500 font-bold text-white gap-2 border border-green-900'>
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover">
                        </lord-icon>
                        Add Password</button>
                </div>

                <div className='passwords'>
                    <h2 className='font-bold text-2xl py-4 px-4'>Your Passwords</h2>
                    {passwordArray.length === 0 && <div>No passwords to show </div>}
                    {passwordArray.length != 0 &&
                        <table className='table-auto w-full rounded-md overflow-hidden mb-20'>
                            <thead className='bg-green-700 text-yellow-50 border border-slate-800'>
                                <tr>
                                    <th className='py-2'>Site</th>
                                    <th className='py-2'>Username</th>
                                    <th className='py-2'>Password</th>
                                    <th className='py-2'>Action</th>



                                </tr>
                            </thead>
                            <tbody className='bg-green-100'>
                                {passwordArray.map((item, index) => {
                                    return <tr key={index}>
                                        <td className='py-2 border border-white text-center'>
                                            <div className='flex items-center justify-center'>
                                                <a href="{item.site}" target='_blank' >{item.site}</a>
                                                <div className='copyic size-7 cursor-pointer' onClick={() => copyText(item.site)}>
                                                    <img style={{ width: "25px", height: "25px", paddingTop: "3px", paddingLeft: "3px" }} src="./src/icons/copyy.svg" alt="" trigger='hover' />
                                                </div>
                                            </div>
                                        </td>

                                        <td className='py-2 border border-white text-center'>
                                            <div className='flex items-center justify-center'>
                                                <span>{item.username}</span>
                                                <div className='copyic size-7 cursor-pointer' onClick={() => copyText(item.username)}>
                                                    <img style={{ width: "25px", height: "25px", paddingTop: "3px", paddingLeft: "3px" }} src="./src/icons/copyy.svg" alt="" />
                                                </div>
                                            </div>
                                        </td>

                                        <td className='py-2 border border-white text-center'>
                                            <div className='flex items-center justify-center'>
                                                <span>{item.password}</span>
                                                <div className='copyic size-7 cursor-pointer' onClick={() => copyText(item.password)}>
                                                    <img style={{ width: "25px", height: "25px", paddingTop: "3px", paddingLeft: "3px" }} src="./src/icons/copyy.svg" alt="" />
                                                </div>
                                            </div>
                                        </td>

                                        <td className='py-2 border border-white text-center'>
                                            <span className='cursor-pointer mx-1 ' onClick={() => (editPassword(item.id))}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/zfzufhzk.json"
                                                    trigger="hover"
                                                    stroke="bold"
                                                    colors="primary:#121131,secondary:#1b1091,tertiary:#ebe6ef,quaternary:#f9c9c0,quinary:#3a3347"
                                                    style={{ width: "25px", height: "25px" }}>
                                                </lord-icon>
                                            </span>

                                            <span className='cursor-pointer mx-1' onClick={() => (deletePassword(item.id))}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/drxwpfop.json"
                                                    trigger="morph"
                                                    state="morph-trash-in"
                                                    colors="primary:#121331,secondary:#1b1091"
                                                    style={{ width: "25px", height: "25px" }}>
                                                </lord-icon>
                                            </span>
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

