import { NavLink, Outlet } from "react-router-dom";

const links = [
  { to: "/", label: "الرئيسية" },
  { to: "/equipment", label: "الأجهزة المتاحة" },
  { to: "/add", label: "اعرض جهازك" },
];

export function Layout() {
  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-30 border-b border-teal-50 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
          <NavLink to="/" className="flex items-center gap-3">
            <img
              src="/awn-logo.png"
              alt="شعار عون"
              className="h-12 w-20 object-contain"
            />
            <span>
              <span className="block text-xl font-extrabold text-awn-900">
                عون | Awn
              </span>
              <span className="block text-xs text-teal-700">
                جهازك اللي مش محتاجه، ممكن يساعد حد تاني
              </span>
            </span>
          </NavLink>
          <nav className="hidden items-center gap-2 sm:flex">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `rounded-full px-4 py-2 text-sm font-bold transition ${
                    isActive
                      ? "bg-awn-700 text-white"
                      : "text-awn-800 hover:bg-awn-50"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>
        <nav className="flex gap-2 overflow-x-auto px-4 pb-3 sm:hidden">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `whitespace-nowrap rounded-full px-4 py-2 text-sm font-bold ${
                  isActive ? "bg-awn-700 text-white" : "bg-awn-50 text-awn-800"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
      <footer className="mt-16 border-t border-teal-50 bg-awn-50">
        <div className="mx-auto max-w-6xl px-4 py-8 text-sm leading-7 text-teal-800">
          <p className="font-bold">عون | Awn</p>
          <p>جهازك اللي مش محتاجه، ممكن يساعد حد تاني.</p>
          <p className="mt-2">
            الإعلانات التجريبية للتجربة فقط، وليست عروضًا حقيقية. أي جهاز تضيفه
            يتحفظ على نفس المتصفح فقط، ومش بيظهر تلقائيًا عند ناس تانية.
          </p>
        </div>
      </footer>
    </div>
  );
}
