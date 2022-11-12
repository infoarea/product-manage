

/*
* Meessage Alert Functions
*/
const msgAlert = (msg, type = 'danger') =>{
        return `<p class="alert alert-${type} d-flex justify-content-between">${msg} <button data-bs-dismiss="alert" class="btn-close"></button></p>`;
}

/**
 * Email check function
*/

const emailCheck = (email) => {
    const emailPattern = /^[a-z0-9\._]{1,}@[a-z0-9\._]{1,}\.[a-z]{2,4}$/;

   return emailPattern.test(email);
}


/**
 * Phone Number check function
*/
const phoneCheck = (phone) => {
    const phonePattern = /^(01|8801|\+8801)[0-9]{9}$/;
    return phonePattern.test(phone);
}


/**
 * Number Checking
*/

const numberChecker = (num) =>{
    let numberPattern = /^[0-9]{1,3}$/;

   return numberPattern.test(num);
}


/**
 * set value to local storage
*/
// const getLSData = (key) => {

//     if ( localStorage.getItem(key) ) {
//        return JSON.parse(localStorage.getItem(key)); 
//     }else {
//         return false;
//     }

// }
// //set data from ls
// const setLSData = ( key, value ) => {

//     let data = []; 
//     //Get exesting data from LS
//    if ( localStorage.getItem(key) ) {
//     data = JSON.parse(localStorage.getItem(key));
//    }
//    //set new Data
//    data.push(value);

//    localStorage.setItem(key, JSON.stringify(data));

// }

// //Update product LS data

// const updateData = ( key, arrr ) => {
//     localStorage.setItem( key, JSON.stringify(arrr) );
// }

// Send Data to Localstorage
const sendLSData = ( key, value ) => {

    let data = [];
    if ( localStorage.getItem(key) ) {
        data = JSON.parse(localStorage.getItem(key));
    }
    data.push(value);

    localStorage.setItem(key, JSON.stringify(data) );
}

//Get LS data from LS
const getLSData = (key) => {

    if (  localStorage.getItem( key ) ) {
        
      return JSON.parse(localStorage.getItem( key ));
    } else{
        return false;
    }

}

//Update LS Data
const updateLSData = ( key, arrrr ) => {
    localStorage.setItem(key, JSON.stringify(arrrr))
}
