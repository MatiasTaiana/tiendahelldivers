# Freedom Store

Freedom Store es un proyecto de e-commerce basado en el universo del juego *Helldivers 2*. Los usuarios pueden comprar productos de distintas categorías como armas, estratagemas, automatones y terminids, entre otros. El proyecto se conecta a Firebase para obtener los productos y gestionar las órdenes de compra.

## Tecnologías Utilizadas

- **React**: Librería de JavaScript para construir la interfaz de usuario.
- **Firebase**: Para la gestión de productos y órdenes.
- **React Router**: Para la navegación entre las diferentes páginas.
- **React Context API**: Para la gestión del estado del carrito de compras.
- **Toastify**: Para mostrar notificaciones de acciones realizadas.
- **SweetAlert2**: Para mostrar alertas personalizadas.

## Estructura del Proyecto

El proyecto está organizado de la siguiente manera:

- **App.js**: Componente principal que gestiona las rutas y el contexto del carrito.
- **components/**: Carpeta que contiene todos los componentes reutilizables, tales como:
  - `NavBar`: Barra de navegación con enlaces a las diferentes categorías.
  - `ItemListContainer`: Contenedor de los productos que se muestran en la página principal.
  - `ItemDetailContainer`: Muestra detalles de un solo producto.
  - `Cart`: Muestra los productos que se han agregado al carrito de compras.
  - `CartWidget`: Muestra el icono del carrito con el número de productos.
  - `ItemCount`: Componente para seleccionar la cantidad de productos a agregar al carrito.
  - `CartContext`: Contexto para gestionar el carrito de compras.


## Características

- **Navegación dinámica**: El proyecto utiliza `React Router` para navegar entre las distintas categorías de productos: armas, estratagemas, automatones, y terminids.
- **Conexión con Firebase**: Los productos se cargan dinámicamente desde Firebase. Cada producto se almacena con su nombre, descripción, imagen, precio y categoría.
- **Carrito de Compras**: Los usuarios pueden agregar productos al carrito, actualizar la cantidad, eliminar productos y realizar el pago de su orden.
- **Notificaciones**: Toastify y SweetAlert2 se usan para mostrar notificaciones al agregar productos al carrito, cambiar cantidades y realizar compras.
