import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function Contact({ listing }) {
    const [landload, setLandload] = useState(null);
    const [message, setMessage] = useState('');

    const onChange = (e) => {
        setMessage(e.target.value);
    }

    console.log(message);

    useEffect(() => {

        const fetchingLandloard = async () => {
            try {
                const res = await fetch(`/api/user/${listing.userRefs}`);
                const data = await res.json();
                setLandload(data);

            } catch (error) {
                console.log(error.message);
            }
        }

        fetchingLandloard();
    }, [listing.userRefs]);

    console.log(landload);

    return (
        <>{landload && (
            <div className='flex flex-col gap-2 '>
                <p> Contact: <span className='font-semibold'>{landload.username}</span>  for <span className=''>{listing.name.toLowerCase()}</span> </p>
                <textarea name="message" id="message" rows="2" value={message} onChange={onChange} placeholder='Enter your message here...' className='w-full border border-gray-400 rounded-lg'></textarea>

                <Link to={`mailto:${landload.email}?subject=Regarding ${listing.name}&body=${message}`} className='bg-slate-700 text-white text-center p-3  uppercase rounded-lg hover:opacity-95'>
                    Send Message
                </Link>
            </div>
        )}
        </>
    )
}

export default Contact