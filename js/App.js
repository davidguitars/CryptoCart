const Products = [fireCape, infernalCape, runeScim];
//team
let cardItem = []
const cardContainer = document.querySelector('#container-1');

// seleccionando las viarables de partes de la card item

const cardContent = document.querySelector('.card-container')
const imageHeader = document.querySelector('.image-header')
const tittleCard = document.querySelector('.tittle-card')
const textCard = document.querySelector('.text-card')
const itemsCard = document.querySelector('.items-card')
const eth = document.querySelector('.eth')
const days = document.querySelector('.days')
const contenedorCarrito = document.querySelector('.contenedorCarrito')
const carritoIcono = document.querySelector('.modal-body')


// Funciones de recorrido de las cards

Products.forEach((producto) => {
    const card = document.createElement('div')
    card.ClassName = 'card'
    card.innerHTML = `
    <section class="card-container">
    <header class="image-header">
        <img src="${producto.img}" alt="image equilibrium" class="image-main">
        <div class="overlay"></div>
        <img src="https://raw.githubusercontent.com/Jean-carje/nft-preview-card-component-main/82a22800073516e524360d46b8bf4aafaa8d1283/images/icon-view.svg" alt="" class="view">
    </header>
    <h1 class="tittle-card">${producto.id}</h1>
    <h3>${producto.name}</h3>
    <div class="items-card">
    <div class="left">
        <img src="https://raw.githubusercontent.com/Jean-carje/nft-preview-card-component-main/82a22800073516e524360d46b8bf4aafaa8d1283/images/icon-ethereum.svg" alt="" class="img-item">
        <spam class="eth">${producto.price} ETH</spam>
    </div>
    <div class="right">
                    <img src="https://raw.githubusercontent.com/Jean-carje/nft-preview-card-component-main/82a22800073516e524360d46b8bf4aafaa8d1283/images/icon-clock.svg" alt="" class="img-item">
                    <spam class="days"> ${producto.time}day left</spam>
                    </div>
                    </div>
                    <footer class="creator-section">
                    <img src="https://avatars.githubusercontent.com/u/66575135?s=400&u=4e316d2a8fd2ddd46d3cf94cdb25b86b4ebd081c&v=4" alt="" class="img-creator">
                    <p class="text-creator">Creation of <a href="https://github.com/davidguitars" class="name-creator">David Daniel</a></p>
                </footer>
                <section>

                <button id="showAlert" class="boton btn btn-warning" data-id='${producto.id}'>Add to cart</button>
            </section>
`

    cardContainer.append(card)

})


// agregando los productos al modal del actualizarCarrito
const modalCarrito = () => {
    if (cardItem.length > 0) {
        carritoIcono.innerHTML = ''
        cardItem.map((producto, index) => {
            const card = document.createElement('div')
            card.ClassName = 'card'
            card.innerHTML = `
            <div>
            <img src="${producto.img}" style="width:60px">
            <h3>${producto.name}</h3>
            <p>Precio es $:${producto.price}</p>
            <span> numero de orden es:${producto.id}</span>
            </div>
            <button class="removeBoton btn" index=${index}><i class="fas fa-trash-alt"index=${index}></i></button>
            `
            carritoIcono.append(card)

        })


    } else {
        carritoIcono.innerHTML = 'no hay productos agregados'
    }

}

cardItem = JSON.parse(localStorage.getItem('cardItem')) || [];
modalCarrito()


// Eligiendo productos
const addItem = (e) => {
    const takeProduct = e.target.getAttribute('data-id')
    const producto = Products.find((producto) => producto.id == takeProduct)
    cardItem.push(producto)

    localStorage.setItem('cardItem', JSON.stringify(cardItem))

    //Agregando la libreria Toastify para mostrar una alaert de producto agregado
    Toastify({
        text: "Agregado correctamente",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        className: "added",
        style: {
            background: "linear-gradient(to right, #dcff03, #ede700, #f8ce00, #feb500, #ff9d0a)",
            color: 'black'
        },
        onClick: function() {}
    }).showToast();

    modalCarrito()
}


//agregando carrito al localStorage
const addButton = document.querySelectorAll('.boton')
addButton.forEach((botonCompra) => {
    botonCompra.addEventListener('click', addItem)

})


// imprimiendo el carrito 
if (localStorage.getItem('cardItem')) {
    // agregando operadores avanzados
    carrito = JSON.parse(localStorage.getItem('cardItem')) || [];


}

// //alerta de finalizacion de compra
const alertaDeCompra = document.querySelector('.alertBoton')

const alertFinalizacion = () => {
    Swal.fire(
        'Hemos recibido su compra!',
        'Un agente se pondra en contacto con usted!',
        'success'

    )
    setTimeout(() => location.href = "../index.html", 3000);



}


alertaDeCompra.addEventListener('click', alertFinalizacion)







// ELIMINANDO LOS ITEMS DEL CARRITO DEL

const botonRemove = document.querySelector('.contenedorCarrito')
const link = (index) => {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.key(index);
            Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
            )
        }
    })

}

botonRemove.addEventListener('click', (e) => {

    let newArray = cardItem;
    newArray.splice(e.target.attributes.index.value, 1)
    console.log(newArray)
    localStorage.setItem('cardItem', JSON.stringify(newArray))

    modalCarrito()

})



// capturando nuestra api de tokens para criptos
const tokenApi = document.querySelector('#botontoken')
const botonPortos = document.querySelector('#portos')

const tokenApp = () => {
    let pagesNumbers = (max) => {
        return Math.floor(Math.random() * max);
    }
    fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=clp&order=market_cap_desc&per_page=3&page=${pagesNumbers(5)}&sparkline=false`)
        .then(res => res.json())
        .then(data => mostrarData(data))
        .catch((error) => {
            console.log(error)
        })
}


const mostrarData = (data) => {
    let portos = []

    data.forEach((data, key) => {
        console.log(data)
        portos.push(`
            <div class="flex flex-justify-between flex-align-center bg-black porto">
        <div class="mt-1">
        <img src=${data.image} alt="" width="48" height="48" /> 
          <div class="flex flex-align-center flex-justify-between mb-2">
            <p class="text-xl mr-4"><b>${(data.symbol).toUpperCase()} </b></p>
            <p class="text-xl"><select class="bg-dark"><option value="CLP">CLP</option>
            <option value="EUR">EUR</option>
            <option value="USD">USD</option>
            </select>: ${data.current_price}</p>
          </div>
          <div class="flex flex-align-center flex-justify-between">
            <small class="text-gray-500">${data.name}</small>
            <small class="flex flex-align-center text-error"><svg width="20" height="20" viewBox="5 5 20 20" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M10.869 16.6308C10.811 16.5743 10.563 16.3609 10.359 16.1622C9.076 14.9971 6.976 11.9576 6.335 10.3668C6.232 10.1252 6.014 9.51437 6 9.18802C6 8.8753 6.072 8.5772 6.218 8.29274C6.422 7.93814 6.743 7.65368 7.122 7.49781C7.385 7.39747 8.172 7.2416 8.186 7.2416C9.047 7.08573 10.446 7 11.992 7C13.465 7 14.807 7.08573 15.681 7.21335C15.695 7.22796 16.673 7.38383 17.008 7.55431C17.62 7.86702 18 8.47784 18 9.13151V9.18802C17.985 9.61374 17.605 10.509 17.591 10.509C16.949 12.0141 14.952 14.9834 13.625 16.1768C13.625 16.1768 13.284 16.5129 13.071 16.659C12.765 16.887 12.386 17 12.007 17C11.584 17 11.19 16.8724 10.869 16.6308Z"
                  fill="#FF4842" />
              </svg>${data.ath_change_percentage}%</small>
          </div>
        </div>
    </div>
        `)

    })

    document.querySelector('.portos').innerHTML = `<div class="portos">${portos}</div>`
}




tokenApi.addEventListener('click', tokenApp)

window.onload = () => {
    tokenApp()
}