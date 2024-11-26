Freedom Store
Freedom Store es un proyecto de e-commerce basado en el universo del juego Helldivers 2. Los usuarios pueden comprar productos de distintas categorías como armas, estratagemas, automatones y terminids, entre otros. El proyecto se conecta a Firebase para obtener los productos y gestionar las órdenes de compra.

Tecnologías Utilizadas
React: Librería de JavaScript para construir la interfaz de usuario.
Firebase: Para la gestión de productos y órdenes.
React Router: Para la navegación entre las diferentes páginas.
React Context API: Para la gestión del estado del carrito de compras.
Toastify: Para mostrar notificaciones de acciones realizadas.
SweetAlert2: Para mostrar alertas personalizadas.
Estructura del Proyecto
El proyecto está organizado de la siguiente manera:

App.js: Componente principal que gestiona las rutas y el contexto del carrito.
components/: Carpeta que contiene todos los componentes reutilizables, tales como:
NavBar: Barra de navegación con enlaces a las diferentes categorías.
ItemListContainer: Contenedor de los productos que se muestran en la página principal.
ItemDetailContainer: Muestra detalles de un solo producto.
Cart: Muestra los productos que se han agregado al carrito de compras.
CartWidget: Muestra el icono del carrito con el número de productos.
ItemCount: Componente para seleccionar la cantidad de productos a agregar al carrito.
Offer: Componente que muestra una oferta diaria aleatoria con descuento.
CartContext: Contexto para gestionar el carrito de compras.
Características
Navegación dinámica: El proyecto utiliza React Router para navegar entre las distintas categorías de productos: armas, estratagemas, automatones, y terminids.
Conexión con Firebase: Los productos se cargan dinámicamente desde Firebase. Cada producto se almacena con su nombre, descripción, precio y categoría.
Carrito de Compras: Los usuarios pueden agregar productos al carrito, actualizar la cantidad, eliminar productos y realizar el pago de su orden.
Notificaciones: Se utilizan Toastify y SweetAlert2 para mostrar notificaciones y alertas personalizadas al realizar acciones como agregar productos, actualizar cantidades y completar una compra.
Oferta del Día:
Un producto aleatorio se selecciona diariamente con un 35% de descuento.
Se muestra el precio original tachado y el precio con descuento destacado.
Incluye un temporizador que muestra el tiempo restante hasta que la oferta cambie.
Los usuarios pueden confirmar su compra directamente desde la oferta.
Gestión de la Oferta Especial:
La oferta del día se maneja actualmente en localStorage para mantener la información persistente entre recargas de página. Sin embargo, la gestión ideal de la oferta especial debería realizarse directamente en la base de datos de Firebase para garantizar que la oferta se actualice de manera centralizada y accesible para todos los usuarios, sin depender de la memoria local del navegador.
La implementación en localStorage es una solución temporal, pero en un sistema más avanzado, esta lógica se gestionaría con un campo de "descuento activo" en la base de datos de Firebase, que se actualizaría automáticamente.
Instrucciones de Uso
Inicio:

En la página principal, se listan los productos organizados por categorías.
Los usuarios pueden explorar las distintas categorías desde la barra de navegación.
Oferta Especial:

En cada visita, se muestra un producto destacado con descuento.
El tiempo restante de la oferta se actualiza en tiempo real.
La oferta cambia automáticamente después de 24 horas.
La gestión de la oferta se realiza a través de localStorage, pero en un futuro se integrará con Firebase para manejarla de manera más eficiente.
Carrito de Compras:

Los usuarios pueden agregar productos al carrito desde la lista o el detalle de un producto.
Es posible actualizar las cantidades, eliminar productos y vaciar el carrito.
Al finalizar la compra, el usuario puede ingresar sus datos a través de un formulario interactivo de SweetAlert2.
Gestión de Pedidos:

Los pedidos se almacenan en Firebase con detalles del cliente, productos y precios.