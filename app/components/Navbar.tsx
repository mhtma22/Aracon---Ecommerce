// app/components/Navbar.tsx
export default function Navbar() {
    return (
      <nav className="flex items-center justify-center gap-12 px-8 py-4 shadow-sm border-b-9 b-white">
        <div className="flex flex-col items-center">
          <a href="/"><h1 className="text-2xl font-italic" style={{fontFamily: 'Lexend', fontSize: '34px'}}>ARACON.PE</h1></a>
        </div>
        <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row hidden md:flex">
                <ul className="flex gap-6" style={{fontFamily: 'Smooch Sans', fontSize: '24px'}}>
                    <li><a href="/">Inicio</a></li>
                    <li><a href="/products">Tienda</a></li>
                    <li><a href="/cart">Carrito</a></li>
                </ul>
            </div>
        </div>
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center justify-between border border-white rounded-full p-2 h-10 gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="20px" viewBox="0 0 24 24"><path fill="currentColor" d="m19.6 21l-6.3-6.3q-.75.6-1.725.95T9.5 16q-2.725 0-4.612-1.888T3 9.5t1.888-4.612T9.5 3t4.613 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l6.3 6.3zM9.5 14q1.875 0 3.188-1.312T14 9.5t-1.312-3.187T9.5 5T6.313 6.313T5 9.5t1.313 3.188T9.5 14"/></svg>
            <input type="text" placeholder="Buscar" className="w-[400px]" style={{border: 'none', outline: 'none', backgroundColor: 'transparent', fontFamily: 'Smooch Sans', fontSize: '20px'}} />
          </div>
        </div>
        <div className="flex flex-row items-center justify-between">
          <div className="flex items-center">
              <a href="/cart"><img src="/carrito.svg" alt="Carrito" className="w-5 h-5 m-3" /></a>
          </div>   
          <div className="flex items-center">
            <a href=""><img src="/cuenta.svg" alt="Cuenta" className="w-6 h-6 m-3" /></a>
          </div>
        </div>
      </nav>
    );
  }
