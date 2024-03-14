import React from 'react';
import { Link } from 'react-router-dom';
import { MdLocationOn, MdHotel, MdHotTub } from 'react-icons/md'; // Importing icons for bed and bath

function ListingItems({ list }) {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full sm:w-[330px] transition duration-300 transform hover:scale-105">
      <Link to={`/listing/${list._id}`}>
        <div className="relative overflow-hidden">
          <img src={list.imageUrls[0]} className="w-full h-52 sm:h-40 object-cover transition-transform duration-300 transform hover:scale-110" alt={list.name} />
          <div className="absolute bottom-0 left-0 bg-gradient-to-t from-gray-800 to-transparent w-full h-20"></div>
        </div>
        <div className="p-4">
          <p className="text-lg font-semibold text-gray-800">{list.name}</p>
          <div className="flex items-center mt-2 text-gray-600 text-sm">
            <MdLocationOn className="h-4 w-4 mr-1" />
            <p>{list.address}</p>
          </div>
          <p className="text-sm text-gray-700 mt-2">{list.description}</p>
          <p className="text-lg font-semibold text-green-500 mt-2">
            {list.offer && typeof list.discountPrice === 'number'
              ? `$${list.discountPrice.toLocaleString('en-US')}`
              : typeof list.regularPrice === 'number'
              ? `$${list.regularPrice.toLocaleString('en-US')}`
              : "Price not available"
            }
            {list.type === 'rent' && ' /month'}
          </p>
          <div className="flex justify-between mt-2">
            <div className="flex items-center text-gray-700 font-semibold">
              <MdHotel className="h-4 w-4 mr-1" /> 
              {list.bedrooms} {list.bedrooms > 1 ? 'beds' : 'bed'}
            </div>
            <div className="flex items-center text-gray-700 font-semibold">
              <MdHotTub className="h-4 w-4 mr-1" /> 
              {list.bathrooms} {list.bathrooms > 1 ? 'baths' : 'bath'}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ListingItems;
