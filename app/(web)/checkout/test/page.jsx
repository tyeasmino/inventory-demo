// "use client";
// import React from "react";
// import {
//   Autocomplete,
//   DistanceMatrixService,
//   useJsApiLoader,
// } from "@react-google-maps/api";

// const page = async () => {
//   const { isLoaded } = useJsApiLoader({
//     id: "ssdfaff",
//     googleMapsApiKey: "AIzaSyDZRTKcPUIVkcLWHjCXMqPMTZEUKncoLEk",
//     libraries: ["places"],
//   });
//   return (
//     <div className="mt-60">
//       {/* Checkout test {value} <Btn /> */}
//       <div>
//         {isLoaded && (
//           <>
//             <Autocomplete>
//               <input type="text" className="p-2 border border-r-amber-300" />
//             </Autocomplete>
//             <DistanceMatrixService
//               options={{
//                 destinations: [{ lat: 1.296788, lng: 103.778961 }],
//                 origins: [{ lng: 72.89216, lat: 19.12092 }],
//                 travelMode: "DRIVING",
//               }}
//             />
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default page;
