
//Get Elements
const upload_form = document.getElementById('upload_form');
const msd = document.querySelector('.msd');
const product_table = document.querySelector('.product_table');
const single_view = document.querySelector('.single_view');
const edit_form = document.getElementById('edit_form');

//Product Show function
const showProduct = () => {

    //int data
    let productlist = '';
    //get ls data
    let lsdata = getLSData('product');

    //ls data validation
    if ( !lsdata || lsdata.length == 0 ) {
        productlist = `<tr>
                    <td colspan="7" class="text-center">No product found!</td>
                    </tr>`;

    } else {

        let final_amount = 0;
        lsdata.map(( productItem, index ) => {
            
            //Total amount counting
            final_amount += (productItem.price * productItem.quantity);

            //product show at table row
            productlist += ` <tr>
                    <td>1</td>
                    <td><img class="p_photo" src="${productItem.photo}" alt=""></td>
                    <td>${productItem.name}</td>
                    <td>${productItem.price} BDT</td>
                    <td>${productItem.quantity}</td>
                    <td>${productItem.price * productItem.quantity} BDT</td>
                    <td>
                        <a class="btn btn-info btn-sm view_product" data-bs-toggle="modal" href="#view_modal" product_index="${index}"><i class="fas fa-eye"></i></a>
                        <a class="btn btn-warning btn-sm edit_product" data-bs-toggle="modal" href="#edit_modal" product_index="${index}"><i class="fas fa-edit"></i></a>
                        <a class="btn btn-danger btn-sm delete_product" href="#" product_index="${index}"><i class="fas fa-trash"></i></a>
                    </td>
                </tr>`;
        });
        //Final amount show
        productlist += `<tr>
                    <td colspan="6" class="text-end">Total: ${final_amount} BDT</td>
                    <td></td>
                    </tr>`;

        
    }
    
    product_table.innerHTML = productlist;

    
   

} 
showProduct();

//Product Upload form submit
upload_form.onsubmit = ( event ) => {
    event.preventDefault();

    const formData = new FormData( event.target );
    const data = Object.fromEntries(formData.entries());
    const { name, price, quantity, photo } = Object.fromEntries(formData.entries());


    

    // Add new product form Validation
    if ( !name || !price || !quantity || !photo ) {
        msd.innerHTML = msgAlert('Fields must not be empty!');
    }else {
        //send new data to LS
        sendLSData('product', data );

        msd.innerHTML = msgAlert('Successfully Data sent!', 'success');
        //Reset product form
        event.target.reset();
        //LSData show on table
        showProduct();
    }

    

}

// Product View, Edit & Delete function

product_table.onclick = (eee) => {
    eee.preventDefault();

    //View Procuct Function
    if ( eee.target.classList.contains('view_product') ) {
       let index = eee.target.getAttribute('product_index');

       let data = getLSData('product');
        let { name, price, quantity, photo } = data[index];
       
        single_view.innerHTML = `<img class="view_img" src="${photo}" alt="">

        <h3>${name}</h3>
        <p>Price: ${price} BDT</p>`;
        
    }

    //Edit Procuct Function
    if ( eee.target.classList.contains('edit_product')) {

      let index = eee.target.getAttribute('product_index');

      let data = getLSData('product');

      let { name, price, quantity, photo } = data[index];

      edit_form.innerHTML = `<div class="my-3">
                    Name
                    <input value="${name}" name="name" class="form-control" type="text">
                </div>

                
                <div class="my-3">
                    Price
                    <input  value="${price}" name="price" class="form-control" type="text">
                </div>
                
                <div class="my-3">
                    Wuantity
                    <input  value="${quantity}" name="quantity" class="form-control" type="text">
                </div>
                
                <div class="my-3">
                    <img class="w-50" src="${photo}" alt="">
                </div>

                <div class="my-3">
                    Photo
                    <input  value="${photo}" name="photo" class="form-control" type="text">
                </div>

                <div class="my-3">
                    Photo
                    <input   value="${index}" name="index" class="form-control" type="hidden">
                </div>

                <div class="my-3">
                    <input class="form-control btn btn-primary" value="Update Product" type="submit">
                </div>
                `;

    }


    //Delete Procuct Function 
    if ( eee.target.classList.contains('delete_product') ) {

        //confirm user to delete
        const conf = confirm('Are you sure?');

        if ( conf ) {
             //get index number
            const index = eee.target.getAttribute('product_index');
            //get ls data
            const data = getLSData('product');
            data.splice(index, 1);
                //update LS Data
            updateLSData('product', data);
            //reload data
            showProduct();
        }else {
            alert('Your data is safe....');
        }
        
       

       
    }


}

//update form submit
edit_form.onsubmit = ( event ) =>{
    event.preventDefault();

    const formData = new FormData(event.target);
    const {name, price, quantity, photo, index } = Object.fromEntries(formData.entries());

     const lsData = getLSData('product');

     lsData[index] = { name, price, quantity, photo }

     updateLSData('product', lsData);

     showProduct();

    
}