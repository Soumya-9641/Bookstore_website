export default function handler(req, res) {
  let pincode={
    "721653":["Tamluk","West Bengal"],
    "721302":["Kharagpur","West Bengal"],
    "700107":["Anandapur","West Bengal"],
    "560017":["bangalore","West Bengal"],
    

}
    res.status(200).json(pincode)
    console.log(pincode)
  }
  