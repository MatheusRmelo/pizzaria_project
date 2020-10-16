let cart = [];
let modalQtd = 1;
let modalKey = 0;
let currentPrice = 0;

const qrySel = (el)=>document.querySelector(el);
const qrySelAll = (el)=>document.querySelectorAll(el);

//Listagem das pizzas
pizzaJson.map((item, index)=>{
    let pizzaItem = qrySel('.models .pizza-item').cloneNode(true);

    pizzaItem.setAttribute('data-key', index);
    pizzaItem.querySelector('.pizza-item--img img').src = item.img;
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;
    pizzaItem.querySelector('a').addEventListener('click',(e)=>{
        e.preventDefault();
        modalQtd = 1;
        let key = e.target.closest('.pizza-item').getAttribute('data-key');
        modalKey = key;
        

        qrySel('.pizzaBig img').src = item.img;
        qrySel('.pizzaInfo h1').innerHTML =item.name;
        qrySel('.pizzaInfo--desc').innerHTML = item.description;
        qrySel('.pizzaInfo--actualPrice').innerHTML = `R$ ${item.price.toFixed(2)}`;
        currentPrice = item.price.toFixed(2);
        qrySel('.pizzaInfo--size.selected').classList.remove('selected');

        qrySelAll('.pizzaInfo--size').forEach((size, sizeIndex)=>{
            if( sizeIndex === 2 ){
                size.classList.add('selected');
            }
            size.querySelector('span').innerHTML = item.sizes[sizeIndex];
        });

        qrySel('.pizzaInfo--qt').innerHTML = modalQtd;

        qrySel('.pizzaWindowArea').style.opacity = 0;
        qrySel('.pizzaWindowArea').style.display = 'flex';
        setTimeout(()=>{qrySel('.pizzaWindowArea').style.opacity = 1;},200);
       
    });

   

    qrySel('.pizza-area').append(pizzaItem);
});

//Eventos do modal
function closeModal(){
    qrySel('.pizzaWindowArea').style.opacity = 0;
    setTimeout(()=>{
        qrySel('.pizzaWindowArea').style.display = 'none';
    },500);
}
qrySelAll('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item)=>{
    item.addEventListener('click',closeModal);
});
qrySel('.pizzaInfo--qtmenos').addEventListener('click', ()=>{
    if(modalQtd > 1){
        modalQtd--;
        qrySel('.pizzaInfo--qt').innerHTML = modalQtd;
    }
    
});
qrySel('.pizzaInfo--qtmais').addEventListener('click', ()=>{
    modalQtd++;
    qrySel('.pizzaInfo--qt').innerHTML = modalQtd;
});
qrySelAll('.pizzaInfo--size').forEach((size, sizeIndex)=>{
    size.addEventListener('click',(e)=>{
        qrySel('.pizzaInfo--size.selected').classList.remove('selected');
        size.classList.add('selected');
        let newPrice = currentPrice;
        if(sizeIndex === 0){
            newPrice = currentPrice - 6;
            qrySel('.pizzaInfo--actualPrice').innerHTML = `R$ ${newPrice.toFixed(2)}`;
        }else
        if(sizeIndex === 1){
            newPrice = currentPrice - 3;
            qrySel('.pizzaInfo--actualPrice').innerHTML = `R$ ${newPrice.toFixed(2)}`;
        }else{
            newPrice = currentPrice;
            qrySel('.pizzaInfo--actualPrice').innerHTML = `R$ ${newPrice}`;
        }
    })
});
qrySel('.pizzaInfo--addButton').addEventListener('click',()=>{
    let size = parseInt(qrySel('.pizzaInfo--size.selected').getAttribute('data-key'));
    
    cart.push({
        id: pizzaJson[modalKey].id,
        size,
        qtd: modalQtd
    });
    closeModal();
})