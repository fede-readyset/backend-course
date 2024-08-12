// Integramos MP del lado del cliente

const mp = new MercadoPago("APP_USR-92aec2ad-fcf3-4413-bde0-219473bd1e0b", {
    locale:"es-AR"
});


document.getElementById("checkout-btn").addEventListener("click", async () => {
    try {
        //Paso los datos del producto
        const orderData = {
            title: "Patito",
            quantity: 1,
            price: 100
        }
        const response = await fetch("http://localhost:8080/create-preference", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(orderData)
        })

        const preference = await response.json();
        createCheckoutButton(preference.id);

    } catch (error) {
        alert(error)
    }
});

const createCheckoutButton = (preferenceId) => {
    const bricksBuilder = mp.bricks();

    const renderComponent =  async () => {
        // Corrección para evitar que se dupliquen los botones:

        if(window.checkoutButton) window.checkoutButton.unmount();

        await bricksBuilder.create("wallet","wallet_container",{
            initialization: {
                preferenceId: preferenceId
            }
        })
    }

    renderComponent();
}