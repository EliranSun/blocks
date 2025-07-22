import React, { useState, useEffect } from "react";

/* eslint-disable */
export const AtlyFive = () => {
    const [data, setData] = useState([]);
    const [location, setLocation] = useState({
        lat: 32.08497344946223,
        lon: 34.779556198181304
    });
    const [error, setError] = useState(null);

    useEffect(() => {
        // Request user's location
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    debugger;
                    setLocation({
                        lat: position.coords.latitude,
                        lon: position.coords.longitude
                    });
                },
                (err) => {
                    console.error("Error getting location:", err);
                    setError("Could not get your location. Using default location.");
                }
            );
        } else {
            setError("Geolocation is not supported by your browser. Using default location.");
        }
    }, []);

    useEffect(() => {
        const url = new URL("https://dev.steps.me/dev/steps3/autls/search");
        url.searchParams.set("term", "vegan");
        url.searchParams.set("lat", location.lat);
        url.searchParams.set("lon", location.lon);
        url.searchParams.set("map_id", "icb99tZqvAz");
        url.searchParams.set("max_radius", "10000");
        url.searchParams.set("data_type", "step");
        url.searchParams.set("distinct_id", "1");
        fetch(url, {
            headers: {
                "app_version": "3.43.0.14862D",
                "app_platform": "iOS",
            }
        })
            .then(res => res.json())
            .then(data => {
                setData(data.results ?? []);
            })
    }, [location]);

    console.log(data);

    return (
        <div className="flex flex-col gap-4 merriweather-500">
            <h1 className="text-2xl font-bold">Atly Five</h1>
            {error && <div className="text-red-500">{error}</div>}
            <p className="gap-2 text-3xl">
                {data.sort((a, b) => a.distance_meters - b.distance_meters).map((item) => (
                    <span key={item.place_id} className="pr-4">
                        <span className="pr-2">{item.title}</span>
                        <span className="text-gray-500">{item.distance_meters}m away</span>
                    </span>
                ))}
            </p>
        </div>
    )
}