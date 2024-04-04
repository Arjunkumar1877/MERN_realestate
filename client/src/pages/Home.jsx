import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';
import ListingItems from '../components/ListingItems';

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  
  SwiperCore.use([Navigation]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const offerRes = await fetch('/api/listing/get?offer=true&limit=4');
        const offerData = await offerRes.json();
        setOfferListings(offerData);
        
        const rentRes = await fetch('/api/listing/get?type=rent&limit=4');
        const rentData = await rentRes.json();
        setRentListings(rentData);
        
        const saleRes = await fetch('/api/listing/get?type=sale&limit=4');
        const saleData = await saleRes.json();
        setSaleListings(saleData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-gradient-to-b from-blue-950 via-green-950 to-green-950 min-h-screen">
      {/* Top section */}
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-4xl lg:text-6xl font-bold text-white mb-4">
          Find your next <span className="text-yellow-400">perfect</span> place with ease
        </h1>
        <p className="text-lg text-white mb-8">
    Web Estate is the best place to find your next perfect place to live. We have a wide range of properties for you to choose from.
        </p>
        <Link to="/search" className="text-lg bg-yellow-400 py-2 px-6 rounded-full font-semibold hover:bg-yellow-500 hover:text-white transition duration-300 ease-in-out inline-block">Let's get started...</Link>
      </div>

      {/* Offer swiper */}
      <Swiper navigation>
        {offerListings.map(listing => (
          <SwiperSlide key={listing._id}>
            <div className="h-72 bg-cover bg-center rounded-md" style={{ backgroundImage: `url(${listing.imageUrls[0]})` }} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Listing results */}
      <div className="container mx-auto px-4 py-12">
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-white mb-4">Recent offers</h2>
          <Link to="/search?offer=true" className="text-sm bg-yellow-400 py-2 px-4 rounded-full font-semibold hover:bg-yellow-500 hover:text-white transition duration-300 ease-in-out inline-block">Show more offers</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {offerListings.map(listing => (
            <ListingItems key={listing._id} list={listing} />
          ))}
        </div>

        {/* Rent listings */}
        <div className="mt-12 mb-8">
          <h2 className="text-2xl font-semibold text-white mb-4">Recent places for rent</h2>
          <Link to="/search?type=rent" className="text-sm bg-yellow-400 py-2 px-4 rounded-full font-semibold hover:bg-yellow-500 hover:text-white transition duration-300 ease-in-out inline-block">Show more places for rent</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {rentListings.map(listing => (
            <ListingItems key={listing._id} list={listing} />
          ))}
        </div>

        {/* Sale listings */}
        <div className="mt-12 mb-8">
          <h2 className="text-2xl font-semibold text-white mb-4">Recent places for sale</h2>
          <Link to="/search?type=sale" className="text-sm bg-yellow-400 py-2 px-4 rounded-full font-semibold hover:bg-yellow-500 hover:text-white transition duration-300 ease-in-out inline-block">Show more places for sale</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {saleListings.map(listing => (
            <ListingItems key={listing._id} list={listing} />
          ))}
        </div>
      </div>
    </div>
  );
}