// import filterEvent from "./filter.js";
// import sendToDatabase from "./sender.js";

// export default function processEvent(event) {
//   const filtered = filterEvent(event);

//   if (filtered) {
//     sendToDatabase(filtered);
//     console.log("Event forwarded");
//   } else {
//     console.log("Event ignored");
//   }
// }
import filterEvent from "./filter.js";

export default function processEvent(event) {
  const filtered = filterEvent(event);

  if (!filtered) {
    console.log("Event ignored");
    return null;
  }

  console.log("Event forwarded");
  return filtered; // ✅ VERY IMPORTANT
}
