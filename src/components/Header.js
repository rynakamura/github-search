import { useState } from "react";
import { Link } from "react-router-dom";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

function Header({ darkMode, toggleDarkMode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white px-3">
      <nav
        aria-label="Navegação principal"
        className="mx-auto flex max-w-7xl justify-between p-3 lg:px-8"
      >
        <div className="flex lg:flex-1">
          <Link to="/" aria-label="Ir para a página inicial">
            <h1 className="font-primary font-extrabold text-gray-900 text-3xl sm:text-4xl md:text-5xl md:leading-tight">
              GH <span className="text-palette-primary">S</span>
            </h1>
          </Link>
        </div>
        <div className="flex gap-5">
          <Link
            to="/recent-profiles"
            onClick={() => setMobileMenuOpen(false)}
            className="-mx-3 rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50 hidden lg:flex justify-center flex-col"
            aria-label="Ver últimos perfis acessados"
          >
            Últimos perfis
          </Link>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <button
              onClick={toggleDarkMode}
              className="-mx-3 flex flex-col justify-center cursor-pointer rounded-lg px-5 py-3 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
              aria-label={`Alternar para modo ${darkMode ? "claro" : "escuro"}`}
            >
              {darkMode ? "🌙" : "☀️"}
            </button>
          </div>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            aria-label="Abrir menu de navegação"
          >
            <Bars3Icon aria-hidden="true" className="size-6 text-gray-900" />
          </button>
        </div>
      </nav>
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-gray-100 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <h2 className="font-primary font-extrabold text-gray-900 text-3xl sm:text-4xl md:text-5xl md:leading-tight">
              GH <span className="text-palette-primary">S</span>
            </h2>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              aria-label="Fechar menu de navegação"
            >
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Link
                  to="/recent-profiles"
                  onClick={() => setMobileMenuOpen(false)}
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                  aria-label="Ver últimos perfis acessados"
                >
                  Últimos perfis
                </Link>
              </div>
              <div className="py-6">
                <button
                  onClick={toggleDarkMode}
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                  aria-label={`Alternar para modo ${darkMode ? "claro" : "escuro"}`}
                >
                  {darkMode ? "Modo escuro 🌙" : "Modo claro ☀️"}
                </button>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}

export default Header;