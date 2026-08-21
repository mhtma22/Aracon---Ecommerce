export default function Footer() {
  return (
    <footer className="pr-40 pl-40 p-4 pb-1 bg-gray-200 text-center text-sm text-black">
      <div className="p-4 flex flex-row items-center justify-between">
        <div className="flex flex-col items-left justify-between gap-8">
          <div className="text-left flex flex-col justify-between gap-6">
            <h2 className="text-4xl font-bold" style={{fontFamily: 'Lexend'}}>Aracon</h2>
            <p className="text-xs text-black/60" style={{fontFamily: 'Lexend'}}>
            Tenemos ropa que se adapta a tu 
            <br /> estilo y que lucirás con orgullo, 
            <br /> tanto para mujer como para hombre.</p>
          </div>
          <div className="flex flex-row gap-2">
            <a href="#" className="rounded-full bg-black"><img src="/facebookletter.svg" alt="Facebook" className="w-3 h-3 m-2" /></a>
            <a href="#" className="rounded-full bg-white"><img src="/instagram.svg" alt="Instagram" className="w-3 h-3 m-2" /></a>
            <a href="#" className="rounded-full bg-white"><img src="/github.svg" alt="GitHub" className="w-3 h-3 m-2" /></a>
            <a href="#" className="rounded-full bg-white"><img src="/tiktok.svg" alt="TikTok" className="w-3 h-3 m-2" /></a>
          </div>
        </div>
        <div className="flex flex-col items-left justify-between gap-8">
          <div className="text-left flex flex-col gap-5">
            <div>
              <h3 className="text-2xl" style={{fontFamily: 'Lexend'}}>COMPAÑIA</h3>
            </div>
            <div>
              <ul className="flex flex-col gap-4">
                <li>
                  <a href="#" className="text-black/60" style={{fontFamily: 'Lexend'}}>Nosotros</a>
                </li>
                <li>
                  <a href="#" className="text-black/60" style={{fontFamily: 'Lexend'}}>Destacados</a>
                </li>
                <li>
                  <a href="#" className="text-black/60" style={{fontFamily: 'Lexend'}}>Trabajos</a>
                </li>
                <li>
                  <a href="#" className="text-black/60" style={{fontFamily: 'Lexend'}}>Carrera</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-left justify-between gap-8">
          <div className="text-left flex flex-col gap-5">
            <div>
              <h3 className="text-2xl" style={{fontFamily: 'Lexend'}}>HELP</h3>
            </div>
            <div>
              <ul className="flex flex-col gap-4">
                <li>
                  <a href="#" className="text-black/60" style={{fontFamily: 'Lexend'}}>Atención detallada</a>
                </li>
                <li>
                  <a href="#" className="text-black/60" style={{fontFamily: 'Lexend'}}>Entregas rápidas</a>
                </li>
                <li>
                  <a href="#" className="text-black/60" style={{fontFamily: 'Lexend'}}>Términos y condiciones</a>
                </li>
                <li>
                  <a href="#" className="text-black/60" style={{fontFamily: 'Lexend'}}>Política de privacidad</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-left justify-between gap-8">
          <div className="text-left flex flex-col gap-5">
            <div>
              <h3 className="text-2xl" style={{fontFamily: 'Lexend'}}>FAQ</h3>
            </div>
            <div>
              <ul className="flex flex-col gap-4">
                <li>
                  <a href="#" className="text-black/70" style={{fontFamily: 'Lexend'}}>Cuenta</a>
                </li>
                <li>
                  <a href="#" className="text-black/70" style={{fontFamily: 'Lexend'}}>Gestión de entrega</a>
                </li>
                <li>
                  <a href="#" className="text-black/70" style={{fontFamily: 'Lexend'}}>Pedidos</a>
                </li>
                <li>
                  <a href="#" className="text-black/70" style={{fontFamily: 'Lexend'}}>Pagos</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-left justify-between gap-8">
          <div className="text-left flex flex-col gap-5">
            <div>
              <h3 className="text-2xl" style={{fontFamily: 'Lexend'}}>RECURSOS</h3>
            </div>
            <div>
              <ul className="flex flex-col gap-4">
                <li>
                  <a href="#" className="text-black/60" style={{fontFamily: 'Lexend'}}>Libro de reclamaciones</a>
                </li>
                <li>
                  <a href="#" className="text-black/60" style={{fontFamily: 'Lexend'}}>Tutorial de Desarrollo</a>
                </li>
                <li>
                  <a href="#" className="text-black/60" style={{fontFamily: 'Lexend'}}>Como entrar - Blog</a>
                </li>
                <li>
                  <a href="#" className="text-black/60" style={{fontFamily: 'Lexend'}}>Youtube Cuenta</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="width-100% flex flex-col p-6 mr-12 ml-12 border-b border-black/20">
        
      </div>
      <div className="flex flex-row items-center justify-between p-6 text-center text-sm text-black">
        <div>
          <p className="text-xs text-black/60" style={{fontFamily: 'Lexend'}}>&copy; {new Date().getFullYear()} Aracon. All rights reserved.</p>
        </div>
        <div className="flex flex-row items-center gap-2">
          <a href="#" className="rounded-md bg-white"><img src="/Visa.svg" alt="Visa" className="w-10 h-7 m-1" /></a>
          <a href="#" className="rounded-md bg-white"><img src="/Mastercard.svg" alt="Mastercard" className="w-10 h-7 m-1" /></a>
          <a href="#" className="rounded-md bg-white"><img src="/G%20Pay.svg" alt="G Pay" className="w-10 h-7 m-1" /></a>
          <a href="#" className="rounded-md bg-white"><img src="/Pay.svg" alt="Apple Pay" className="w-10 h-7 m-1" /></a>
          <a href="#" className="rounded-md bg-white"><img src="/PayPal.svg" alt="PayPal" className="w-10 h-7 m-1" /></a>
        </div>
      </div>

    </footer>
  );
}