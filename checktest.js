//import checksum generation utilities
const checksum_lib = require('paytmchecksum');
var paytmChecksum = "";
var paytmParams = {}
const recieved_data = JSON.parse('{}');
for(var key in recieved_data){
    if(key=='CHECKSUMHASH'){
        paytmChecksum= recieved_data[key];
    }
    else{
        paytmParams[key] = recieved_data[key];
    }
}
var isValidChecksum = checksum_lib.verifySignature(paytmParams,process.env.PAYTM_MKEY,paytmChecksum);
if(isValidChecksum){
    console.log("checksum matched");
}else{
    console.log("checksum mismatched");
}