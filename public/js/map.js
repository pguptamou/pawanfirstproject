           
                
                mapboxgl.accessToken = mapToken ;

                const map = new mapboxgl.Map({
                    container: 'map', // container ID
                    center: listing.geometry.coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
                    zoom: 9 // starting zoom
                });
          // console.log(coordinates);
    //Create a default Marker and add it to the map.
    const marker = new mapboxgl.Marker({color: "red"})
    .setLngLat(listing.geometry.coordinates)//Listing.geomatery.coordinates
    .setPopup(new mapboxgl.Popup({offset: 25}) 
    .setHTML(`<h4>${listing.location}</h4><P>exact location providing after booking <p>`))
    .addTo(map);
