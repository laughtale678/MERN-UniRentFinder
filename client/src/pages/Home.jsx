import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css/bundle";
import ListingItem from "../components/ListingItem";

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [independentListings, setIndependentListings] = useState([]);
  const [sharedListings, setSharedListings] = useState([]);
  SwiperCore.use([Navigation]);
  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch("/api/listing/get?offer=true&limit=4");
        const data = await res.json();
        setOfferListings(data);
        fetchIdependentListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchIdependentListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=independent&limit=4");
        const data = await res.json();
        setIndependentListings(data);
        fetchSharedListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSharedListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=shared&limit=4");
        const data = await res.json();
        setSharedListings(data);
      } catch (error) {
        log(error);
      }
    };
    fetchOfferListings();
  }, []);
  return (
    <div>
      <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
        <h1 className="text-slate-700 font-bold text-3xl lg:text-6xl">
          Simplify Your Housing Quest
        </h1>
        <div className="text-gray-400 text-xs sm:text-sm">
          Renting Made Easy, Leasing Made Simple!
        </div>
        <Link
          to={"/search"}
          className="text-xs sm:text-sm text-blue-800 font-bold hover:underline"
        >
          Let's get started...
        </Link>
      </div>

      <Swiper navigation>
        {offerListings &&
          offerListings.length > 0 &&
          offerListings.map((listing) => (
            <SwiperSlide>
              <div
                style={{
                  background: `url(${listing.imageUrls[0]}) center no-repeat`,
                  backgroundSize: "cover",
                }}
                className="h-[500px]"
                key={listing._id}
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>


      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
        {offerListings && offerListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent offers
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to={"/search?offer=true"}
              >
                Show more offers
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {offerListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {independentListings && independentListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent independent rentals
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to={"/search?type=independent"}
              >
                Show more independent rentals
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {independentListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {sharedListings && sharedListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent shared rentals
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to={"/search?type=shared"}
              >
                Show more shared rentals
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {sharedListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
