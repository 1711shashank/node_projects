
// Scenario with Promise
// placeOrder('tea')
//     .then(function(orderFromCustomer){
//         console.log('Request Recivied');
//         let orderIsProcessed = processOrder(orderFromCustomer);
//         return orderIsProcessed;
//     }).then(function(orderIsProcessed){
//         console.log(orderIsProcessed);
//     }).catch(function(err){
//         console.log(err);
//     })

// Async -await
serverOrder();
async function serverOrder(){
    
    try{
        const orderRecieved = await placeOrder('tea');
        console.log(orderRecieved);
        const processedOrder = await processOrder(orderRecieved);
        console.log(processedOrder);

    } catch(error){
        console.log(error);
    }

}



function placeOrder(drink){
    return new Promise(function(resolve, reject){
        if(drink == 'coffee'){
            resolve('Order Placed');
        }else{
            reject('Sorry, We only serve coffee');
        }
    })
}

function processOrder(order){
    return new Promise(function(resolve){
        console.log('Order is been processed');
        resolve(`Coffee served for the ${order}`);
    })
}
