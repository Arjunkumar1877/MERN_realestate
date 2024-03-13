import React, { useEffect, useState } from 'react'
import {  useNavigate } from 'react-router-dom';
import ListingItems from '../components/ListingItems';

function Search() {
    const navigate = useNavigate();
    const [sidebarData, setSideBarData] = useState({
        searchTerm: "",
        type: "all",
        parking: false,
        furnished: false,
        offer: false,
        sort: 'created_at',
        order: 'desc'
    })
    const [loading, setLoading] = useState(false);
    const [listings, setListings] = useState([])
    console.log(listings.length + " " + loading )

    useEffect(()=>{
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        const typeFromUrl = urlParams.get('type');
        const parkingFromUrl = urlParams.get('parking');
        const furnishingFromUrl = urlParams.get('furnished');
        const sortFromUrl = urlParams.get('sort');
        const offerFromUrl = urlParams.get('offer');
        const orderFromUrl = urlParams.get('order');
        // console.log(searchTermFromUrl)

        if(searchTermFromUrl || typeFromUrl || parkingFromUrl || furnishingFromUrl || sortFromUrl || offerFromUrl || orderFromUrl){
            setSideBarData({
                searchTerm: searchTermFromUrl || '',
                type: typeFromUrl || 'all',
                parking: parkingFromUrl === 'true' ? true : false,
                furnished: furnishingFromUrl === 'true' ? true : false,
                offer: offerFromUrl === 'true' ? true : false,
                sort: sortFromUrl || 'created_at',
                order: orderFromUrl || 'desc'
        })
    }
    
    const fetchListings = async()=>{
        setLoading(true);


        const searchQuery = urlParams.toString();
        const res = await fetch(`/api/listing/get?${searchQuery}`);
        const data = await res.json();
        setListings(data);


        setLoading(false);
    }

    fetchListings();
    console.log(listings)

    }, [location.search])

    const handleChange = (e)=>{
        e.preventDefault();

        if(e.target.id === 'all' || e.target.id === 'rent' || e.target.id === 'sale'){
            setSideBarData({...sidebarData, type: e.target.id})
        }

        if(e.target.id === 'searchTerm'){
            setSideBarData({...sidebarData, searchTerm: e.target.value})
        }
        
        if(e.target.id === 'parking' || e.target.id === 'furnished' || e.target.id === 'offer'){
            setSideBarData({...sidebarData, [e.target.id]: e.target.checked || e.target.checked === 'true' ? true : false});
        }

        if(e.target.id === 'sorted_order'){
            const sort = e.target.value.split('_')[0] || 'created_at';
            const order = e.target.value.split('_')[1] || 'desc';
            setSideBarData({...sidebarData, sort, order});
        }

        console.log(sidebarData)

    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        const urlParams = new URLSearchParams();
        urlParams.set('searchTerm', sidebarData.searchTerm);
        urlParams.set("type", sidebarData.type);
        urlParams.set('parking', sidebarData.parking);
        urlParams.set('furnished', sidebarData.furnished);
        urlParams.set('sort', sidebarData.sort);
        urlParams.set('order', sidebarData.order);
        const searchQuery = urlParams.toString();
        console.log(searchQuery)
        navigate(`/search?${searchQuery}`);
    }
  return (
    <div className='flex flex-col md:flex-row'>
    <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen">
        <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
            <div className="flex gap-2 items-center"> 
                <label htmlFor='searchTerm' className='whitespace-nowrap'>Search Term: </label> 
                <input type="text" id='searchTerm' value={sidebarData.searchTerm} onChange={handleChange} placeholder='Search...' className='border rounded-lg p-3 w-full' />
            </div>

            <div className="flex gap-2 flex-wrap items-center">
                <label className='font-semibold'>Type: </label>
                <div className="flex gap-2">
                    <input type="checkbox" name="" checked={sidebarData.type === 'all'} id="all" onChange={handleChange} className='w-5' />
                    <span>Rent & Sale</span>
                </div>

                <div className="flex gap-2">
                    <input type="checkbox" name="" checked={sidebarData.type === 'rent'} onChange={handleChange} id="rent" className='w-5' />
                    <span>Rent</span>
                </div>

                <div className="flex gap-2">
                    <input type="checkbox" name=""  checked={sidebarData.type === 'sale'} onChange={handleChange} id="sale" className='w-5' />
                    <span>Sale</span>
                </div>

                <div className="flex gap-2">
                    <input type="checkbox" name="" checked={sidebarData.offer} onChange={handleChange} id="offer" className='w-5' />
                    <span>Offer</span>
                </div>
            </div>

            <div className="flex gap-2 flex-wrap items-center">
                <label className='font-semibold'>Amenities: </label>
                <div className="flex gap-2">
                    <input type="checkbox" name="" checked={sidebarData.parking} onChange={handleChange} id="parking" className='w-5' />
                    <span>Parking</span>
                </div>

                <div className="flex gap-2">
                    <input type="checkbox" name="" checked={sidebarData.furnished} onChange={handleChange} id="furnished" className='w-5' />
                    <span>Furnished</span>
                </div>
            </div>

            <div className="">
                <label className='font-semibold'>Sort: </label>
                <select name="" id="sorted_order" onChange={handleChange} value={'created_at_desc'} className='border rounded-lg p-3'>
                    <option value="regularPrice_desc">Price high to low</option>
                    <option value="regularPrice_asc">Price low to high</option>
                    <option value="createdAt_desc">Latest</option>
                    <option value="createdAt_asc">Oldest</option>
                </select>
            </div>
 <button className="bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 p-3">Search</button>
        </form>
    </div>
    <div className='flex-1'>
        <h1 className='text-3xl font-semibold border-b p-3 text-slate-700 mt-5'>Listing results:</h1>
        <div className="p-7 flex flex-wrap gap-4">
            {!loading && listings.length === 0 && (
            <p className='text-xl text-slate-700'>No listing found!</p>
          )}
          {loading && (
            <p className='text-xl text-slate-700 text-center w-full'>
              Loading...
            </p>
          )}

          {
         !loading && listings && listings.map((listing) =>(
            <ListingItems key={listing._id} list={listing} />
         ))
          }
      
        </div>
    </div>
</div>

  )
}

export default Search