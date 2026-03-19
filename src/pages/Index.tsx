import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const WINDOW_IMG = "https://cdn.poehali.dev/projects/a4bb76c4-0ff1-4547-be0e-7e38f2c0d6ec/files/270ad152-496b-4192-9d9c-1e491d785a77.jpg";
const BALCONY_IMG = "https://cdn.poehali.dev/projects/a4bb76c4-0ff1-4547-be0e-7e38f2c0d6ec/files/4003513e-9f01-421a-8da1-021bce83a3a0.jpg";
const DOOR_IMG = "https://cdn.poehali.dev/projects/a4bb76c4-0ff1-4547-be0e-7e38f2c0d6ec/files/1c379a6c-00cb-4c13-bd42-f0f78ba07c4e.jpg";

const NAV_ITEMS = [
  { id: "home", label: "Главная" },
  { id: "catalog", label: "Каталог" },
  { id: "services", label: "Услуги" },
  { id: "portfolio", label: "Портфолио" },
  { id: "about", label: "О компании" },
  { id: "guarantee", label: "Гарантия" },
  { id: "contacts", label: "Контакты" },
];

function useScrollAnimation() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll(".animate-on-scroll").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

const Index = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", message: "" });
  const [formSent, setFormSent] = useState(false);

  useScrollAnimation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = NAV_ITEMS.map((n) => n.id);
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0a0a0a", color: "#f0e8d0" }}>

      {/* NAVBAR */}
      <nav
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
          transition: "all 0.5s",
          background: scrolled ? "rgba(10,10,10,0.96)" : "transparent",
          borderBottom: scrolled ? "1px solid rgba(201,168,76,0.15)" : "none",
          backdropFilter: scrolled ? "blur(12px)" : "none",
        }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 36, height: 36, border: "1px solid #c9a84c", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: 12, height: 12, background: "#c9a84c", clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }} />
            </div>
            <div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, letterSpacing: "0.2em", color: "#f0d080", lineHeight: 1 }}>ELEGANCE</div>
              <div style={{ fontSize: "0.55rem", letterSpacing: "0.35em", color: "#9a8860", textTransform: "uppercase", lineHeight: 1, marginTop: 2 }}>Windows &amp; Doors</div>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 32 }} className="hidden lg:flex">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`nav-link ${activeSection === item.id ? "active" : ""}`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => scrollTo("contacts")}
            className="gold-btn hidden lg:block"
            style={{ padding: "10px 24px", color: "#0a0a0a" }}
          >
            <span>Заказать замер</span>
          </button>

          <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden" style={{ color: "#c9a84c" }}>
            <Icon name={menuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>

        {menuOpen && (
          <div style={{ background: "#0f0f0f", borderTop: "1px solid rgba(201,168,76,0.15)", padding: "24px", display: "flex", flexDirection: "column", gap: 16 }}>
            {NAV_ITEMS.map((item) => (
              <button key={item.id} onClick={() => scrollTo(item.id)} className="nav-link" style={{ textAlign: "left" }}>
                {item.label}
              </button>
            ))}
            <button onClick={() => scrollTo("contacts")} className="gold-btn" style={{ padding: "14px 24px", width: "100%", marginTop: 8, color: "#0a0a0a" }}>
              <span>Заказать замер</span>
            </button>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="home" style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0 }}>
          <img src={WINDOW_IMG} alt="Элитные окна" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.4 }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, #0a0a0a 40%, rgba(10,10,10,0.6) 70%, transparent)" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, #0a0a0a 0%, transparent 40%, rgba(10,10,10,0.3) 100%)" }} />
        </div>
        <div style={{ position: "absolute", top: "25%", right: 40, width: 1, height: 160, background: "linear-gradient(to bottom, transparent, #c9a84c, transparent)", opacity: 0.4 }} className="hidden lg:block" />

        <div style={{ position: "relative", maxWidth: 1280, margin: "0 auto", padding: "100px 24px 60px" }}>
          <div style={{ maxWidth: 640 }}>
            <div className="animate-on-scroll" style={{ color: "#c9a84c", fontSize: "0.7rem", letterSpacing: "0.4em", textTransform: "uppercase", marginBottom: 24 }}>
              ✦ Премиум качество ✦
            </div>
            <h1 className="animate-on-scroll" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.5rem, 7vw, 5rem)", fontWeight: 300, lineHeight: 1.1, marginBottom: 24, transitionDelay: "0.1s" }}>
              Окна,{" "}
              <span className="gold-text" style={{ fontStyle: "italic" }}>которые</span>
              <br />
              меняют пространство
            </h1>
            <p className="animate-on-scroll" style={{ color: "#9a8860", fontSize: "1.1rem", fontWeight: 300, lineHeight: 1.7, marginBottom: 40, maxWidth: 480, transitionDelay: "0.2s" }}>
              Элитные ПВХ-окна, балконы и двери. Производство по европейским стандартам, монтаж с гарантией 10 лет.
            </p>
            <div className="animate-on-scroll" style={{ display: "flex", flexWrap: "wrap", gap: 16, transitionDelay: "0.3s" }}>
              <button onClick={() => scrollTo("catalog")} className="gold-btn" style={{ padding: "16px 32px", color: "#0a0a0a" }}>
                <span>Смотреть каталог</span>
              </button>
              <button onClick={() => scrollTo("contacts")} style={{ padding: "16px 32px", border: "1px solid rgba(201,168,76,0.3)", color: "#c9a84c", fontSize: "0.75rem", letterSpacing: "0.12em", textTransform: "uppercase", background: "transparent", cursor: "pointer", transition: "border-color 0.3s" }}>
                Бесплатный замер
              </button>
            </div>
            <div className="animate-on-scroll" style={{ display: "flex", gap: 48, marginTop: 64, transitionDelay: "0.4s" }}>
              {[["1200+", "Объектов"], ["10", "Лет гарантии"], ["48ч", "Замер и расчёт"]].map(([num, label]) => (
                <div key={label}>
                  <div className="gold-text" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem" }}>{num}</div>
                  <div style={{ color: "#6a5840", fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", marginTop: 4 }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, animation: "bounce 2s infinite" }}>
          <div style={{ color: "rgba(201,168,76,0.4)", fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase" }}>Листайте</div>
          <div style={{ width: 1, height: 32, background: "linear-gradient(to bottom, #c9a84c, transparent)" }} />
        </div>
      </section>

      <div className="divider-gold" />

      {/* CATALOG */}
      <section id="catalog" style={{ padding: "112px 24px", maxWidth: 1280, margin: "0 auto" }}>
        <div className="animate-on-scroll" style={{ textAlign: "center", marginBottom: 64 }}>
          <div style={{ color: "#c9a84c", fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", letterSpacing: "0.3em", opacity: 0.6, marginBottom: 16 }}>✦ ✦ ✦</div>
          <h2 className="section-title" style={{ color: "#f0e8d0" }}>Каталог продукции</h2>
          <div className="divider-gold" style={{ maxWidth: 200, margin: "24px auto" }} />
          <p style={{ color: "#6a5840", fontSize: "0.75rem", letterSpacing: "0.3em", textTransform: "uppercase" }}>Премиальные решения для вашего дома</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
          {[
            {
              img: WINDOW_IMG, title: "ПВХ Окна", subtitle: "Серия Platinum",
              desc: "Многокамерные профили REHAU и VEKA. Тепло-, звуко- и шумоизоляция класса А+. Двойной и тройной стеклопакет.",
              price: "от 8 500 ₽",
              features: ["Профиль REHAU / VEKA", "5-камерный профиль", "Гарантия 10 лет"],
            },
            {
              img: BALCONY_IMG, title: "Балконы", subtitle: "Серия Prestige",
              desc: "Остекление балконов и лоджий «под ключ». Холодное и тёплое остекление. Отделка, утепление, обшивка.",
              price: "от 45 000 ₽",
              features: ["Холодное и тёплое", "Отделка включена", "Дизайн-проект бесплатно"],
            },
            {
              img: DOOR_IMG, title: "Входные двери", subtitle: "Серия Grand",
              desc: "Элитные входные двери из ПВХ. Многоточечные замки, антивандальное покрытие, тепловой контур.",
              price: "от 32 000 ₽",
              features: ["Многоточечный замок", "Термо-разрыв", "Доставка и установка"],
            },
          ].map((item, i) => (
            <div key={i} className="luxury-card animate-on-scroll" style={{ transitionDelay: `${i * 0.15}s` }}>
              <div style={{ position: "relative", overflow: "hidden", height: 260 }}>
                <img src={item.img} alt={item.title} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.7s" }} className="hover:scale-105" />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, #111, transparent)" }} />
                <div style={{ position: "absolute", top: 16, right: 16, background: "#c9a84c", color: "#0a0a0a", fontSize: "0.65rem", fontWeight: 700, padding: "4px 12px", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                  {item.subtitle}
                </div>
              </div>
              <div style={{ padding: 24 }}>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.6rem", color: "#f0e8d0", marginBottom: 8 }}>{item.title}</h3>
                <p style={{ color: "#6a5840", fontSize: "0.85rem", lineHeight: 1.7, marginBottom: 16 }}>{item.desc}</p>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, marginBottom: 20, display: "flex", flexDirection: "column", gap: 6 }}>
                  {item.features.map((f) => (
                    <li key={f} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.75rem", color: "#9a8860" }}>
                      <div style={{ width: 4, height: 4, background: "#c9a84c", borderRadius: "50%", flexShrink: 0 }} />
                      {f}
                    </li>
                  ))}
                </ul>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 16, borderTop: "1px solid rgba(201,168,76,0.15)" }}>
                  <div>
                    <div style={{ color: "rgba(201,168,76,0.5)", fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.2em" }}>Цена</div>
                    <div className="gold-text" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem" }}>{item.price}</div>
                  </div>
                  <button onClick={() => scrollTo("contacts")} className="gold-btn" style={{ padding: "10px 20px", color: "#0a0a0a", fontSize: "0.7rem" }}>
                    <span>Заказать</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="divider-gold" />

      {/* SERVICES */}
      <section id="services" style={{ padding: "112px 24px", backgroundColor: "#080808" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div className="animate-on-scroll" style={{ textAlign: "center", marginBottom: 64 }}>
            <div style={{ color: "#c9a84c", fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", letterSpacing: "0.3em", opacity: 0.6, marginBottom: 16 }}>✦ ✦ ✦</div>
            <h2 className="section-title" style={{ color: "#f0e8d0" }}>Наши услуги</h2>
            <div className="divider-gold" style={{ maxWidth: 200, margin: "24px auto" }} />
            <p style={{ color: "#6a5840", fontSize: "0.75rem", letterSpacing: "0.3em", textTransform: "uppercase" }}>Полный цикл от замера до сдачи объекта</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
            {[
              { icon: "Ruler", title: "Бесплатный замер", desc: "Выезд специалиста в удобное время. Точный расчёт стоимости без скрытых платежей. В день обращения." },
              { icon: "Settings2", title: "Производство", desc: "Собственное производство на импортном оборудовании. Контроль качества на каждом этапе по ГОСТ." },
              { icon: "Wrench", title: "Монтаж", desc: "Установка сертифицированными мастерами. Пеноуретан, паро- и гидроизоляция, отделка откосов." },
              { icon: "Paintbrush", title: "Отделка откосов", desc: "Чистовая отделка из MDF или штукатурки. Любой цвет под ваш интерьер. Гарантия 5 лет." },
              { icon: "ShieldCheck", title: "Сервис и ремонт", desc: "Регулировка, замена уплотнителей, ремонт фурнитуры. Обслуживаем окна любых производителей." },
              { icon: "Home", title: "«Под ключ»", desc: "Полный комплекс работ: демонтаж, монтаж, отделка, уборка. Принимаете готовый результат." },
            ].map((s, i) => (
              <div key={i} className="luxury-card animate-on-scroll" style={{ padding: 32, transitionDelay: `${i * 0.1}s` }}>
                <div style={{ width: 48, height: 48, border: "1px solid rgba(201,168,76,0.35)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24 }}>
                  <Icon name={s.icon} size={20} className="text-[#c9a84c]" fallback="Star" />
                </div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.3rem", color: "#f0e8d0", marginBottom: 12 }}>{s.title}</h3>
                <p style={{ color: "#6a5840", fontSize: "0.85rem", lineHeight: 1.7 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider-gold" />

      {/* PORTFOLIO */}
      <section id="portfolio" style={{ padding: "112px 24px", maxWidth: 1280, margin: "0 auto" }}>
        <div className="animate-on-scroll" style={{ textAlign: "center", marginBottom: 64 }}>
          <div style={{ color: "#c9a84c", fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", letterSpacing: "0.3em", opacity: 0.6, marginBottom: 16 }}>✦ ✦ ✦</div>
          <h2 className="section-title" style={{ color: "#f0e8d0" }}>Портфолио</h2>
          <div className="divider-gold" style={{ maxWidth: 200, margin: "24px auto" }} />
          <p style={{ color: "#6a5840", fontSize: "0.75rem", letterSpacing: "0.3em", textTransform: "uppercase" }}>Реализованные объекты</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
          {[
            { img: WINDOW_IMG, label: "Жилой комплекс «Прима»", tag: "96 окон", wide: true },
            { img: BALCONY_IMG, label: "Коттедж Рублёвка", tag: "Балконы" },
            { img: DOOR_IMG, label: "БЦ «Меридиан»", tag: "Входные группы" },
            { img: BALCONY_IMG, label: "ЖК «Небо»", tag: "240 квартир", wide: true },
            { img: WINDOW_IMG, label: "Апартаменты «Сити»", tag: "Панорамное" },
          ].map((p, i) => (
            <div
              key={i}
              className="animate-on-scroll"
              style={{
                position: "relative", overflow: "hidden", cursor: "pointer",
                height: 240, transitionDelay: `${i * 0.1}s`,
                gridColumn: p.wide ? "span 2" : "span 1",
              }}
            >
              <img src={p.img} alt={p.label} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.7s" }} className="hover:scale-110" />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,10,10,0.85), transparent 60%)" }} />
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: 20 }}>
                <div style={{ color: "#c9a84c", fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 4 }}>{p.tag}</div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", color: "white" }}>{p.label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="divider-gold" />

      {/* ABOUT */}
      <section id="about" style={{ padding: "112px 24px", backgroundColor: "#080808" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }} className="grid-cols-1 lg:grid-cols-2">
          <div className="animate-on-scroll">
            <div style={{ color: "#c9a84c", fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", letterSpacing: "0.3em", opacity: 0.6, marginBottom: 16 }}>✦ ✦ ✦</div>
            <h2 className="section-title" style={{ color: "#f0e8d0", marginBottom: 24 }}>О компании</h2>
            <div className="divider-gold" style={{ maxWidth: 160, marginBottom: 32 }} />
            <p style={{ color: "#9a8860", fontSize: "1rem", lineHeight: 1.8, marginBottom: 20 }}>
              Компания <span style={{ color: "#c9a84c" }}>ELEGANCE Windows</span> — более 12 лет на рынке элитных оконных конструкций. Производим и устанавливаем ПВХ-окна, балконы и двери для частных домов и коммерческих объектов.
            </p>
            <p style={{ color: "#6a5840", fontSize: "0.9rem", lineHeight: 1.8, marginBottom: 40 }}>
              Используем сертифицированные профили европейских производителей: REHAU, VEKA, KBE. Собственное производство оснащено станками Schirmer и Pertici. Каждый продукт проходит технический контроль перед отгрузкой.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
              {[["12 лет", "На рынке"], ["50+", "Сотрудников"], ["1200+", "Клиентов"], ["3", "Производства"]].map(([n, l]) => (
                <div key={l} style={{ borderLeft: "2px solid #c9a84c", paddingLeft: 16 }}>
                  <div className="gold-text" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem" }}>{n}</div>
                  <div style={{ color: "#6a5840", fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", marginTop: 4 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="animate-on-scroll" style={{ position: "relative", transitionDelay: "0.2s" }}>
            <div style={{ position: "absolute", top: -16, left: -16, right: 16, bottom: 16, border: "1px solid rgba(201,168,76,0.15)" }} />
            <img src={BALCONY_IMG} alt="Производство" style={{ width: "100%", height: 500, objectFit: "cover", position: "relative", zIndex: 1 }} />
            <div style={{ position: "absolute", bottom: -16, right: -16, background: "#c9a84c", color: "#0a0a0a", padding: 24, zIndex: 2 }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", fontWeight: 700 }}>№1</div>
              <div style={{ fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", marginTop: 4 }}>В регионе</div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider-gold" />

      {/* GUARANTEE */}
      <section id="guarantee" style={{ padding: "112px 24px", maxWidth: 1280, margin: "0 auto" }}>
        <div className="animate-on-scroll" style={{ textAlign: "center", marginBottom: 64 }}>
          <div style={{ color: "#c9a84c", fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", letterSpacing: "0.3em", opacity: 0.6, marginBottom: 16 }}>✦ ✦ ✦</div>
          <h2 className="section-title" style={{ color: "#f0e8d0" }}>Гарантия качества</h2>
          <div className="divider-gold" style={{ maxWidth: 200, margin: "24px auto" }} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 40 }} className="grid-cols-1 md:grid-cols-2">
          {[
            { icon: "ShieldCheck", title: "10 лет на конструкцию", text: "Гарантия на весь профиль, стеклопакет и фурнитуру. При любом дефекте производства — бесплатная замена. Официальный гарантийный талон с печатью." },
            { icon: "Hammer", title: "5 лет на монтаж", text: "Гарантия на все монтажные работы. Если после установки обнаружится продувание или промерзание — устраним бесплатно в течение 48 часов." },
          ].map((g, i) => (
            <div key={i} className="luxury-card animate-on-scroll" style={{ padding: 40, transitionDelay: `${i * 0.15}s` }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 24 }}>
                <div style={{ width: 64, height: 64, border: "1px solid #c9a84c", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon name={g.icon} size={28} className="text-[#c9a84c]" fallback="Shield" />
                </div>
                <div>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.5rem", color: "#f0e8d0", marginBottom: 12 }}>{g.title}</h3>
                  <p style={{ color: "#6a5840", fontSize: "0.9rem", lineHeight: 1.7 }}>{g.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
          {[
            { icon: "BadgeCheck", title: "Сертификаты", text: "Вся продукция сертифицирована по ГОСТ 30674-99 и европейским стандартам EN" },
            { icon: "FileText", title: "Договор", text: "Официальный договор с прописанными сроками, стоимостью и обязательствами" },
            { icon: "Clock", title: "Сроки", text: "Соблюдаем заявленные сроки. Задержка — скидка 1% за каждый день просрочки" },
            { icon: "Star", title: "Качество", text: "Контроль на каждом этапе: производство, доставка, монтаж, сдача объекта" },
          ].map((g, i) => (
            <div key={i} className="luxury-card animate-on-scroll" style={{ padding: 24, textAlign: "center", transitionDelay: `${i * 0.1}s` }}>
              <div style={{ width: 40, height: 40, border: "1px solid rgba(201,168,76,0.35)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                <Icon name={g.icon} size={18} className="text-[#c9a84c]" fallback="Star" />
              </div>
              <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", color: "#f0e8d0", marginBottom: 8 }}>{g.title}</h4>
              <p style={{ color: "#6a5840", fontSize: "0.8rem", lineHeight: 1.6 }}>{g.text}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="divider-gold" />

      {/* CONTACTS */}
      <section id="contacts" style={{ padding: "112px 24px", backgroundColor: "#080808" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div className="animate-on-scroll" style={{ textAlign: "center", marginBottom: 64 }}>
            <div style={{ color: "#c9a84c", fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", letterSpacing: "0.3em", opacity: 0.6, marginBottom: 16 }}>✦ ✦ ✦</div>
            <h2 className="section-title" style={{ color: "#f0e8d0" }}>Свяжитесь с нами</h2>
            <div className="divider-gold" style={{ maxWidth: 200, margin: "24px auto" }} />
            <p style={{ color: "#6a5840", fontSize: "0.75rem", letterSpacing: "0.3em", textTransform: "uppercase" }}>Бесплатный замер и консультация</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64 }} className="grid-cols-1 lg:grid-cols-2">
            <div className="animate-on-scroll">
              <div style={{ display: "flex", flexDirection: "column", gap: 32, marginBottom: 48 }}>
                {[
                  { icon: "Phone", label: "Телефон", value: "+7 (800) 555-00-00", sub: "Звонок бесплатный" },
                  { icon: "Mail", label: "E-mail", value: "info@elegance-windows.ru", sub: "Ответим в течение часа" },
                  { icon: "MapPin", label: "Адрес", value: "г. Москва, ул. Примерная, 12", sub: "Пн–Сб 9:00–20:00" },
                  { icon: "Clock", label: "Режим работы", value: "Пн–Сб: 9:00–20:00", sub: "Воскресенье — выходной" },
                ].map((c, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 20 }}>
                    <div style={{ width: 40, height: 40, border: "1px solid rgba(201,168,76,0.35)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 4 }}>
                      <Icon name={c.icon} size={16} className="text-[#c9a84c]" />
                    </div>
                    <div>
                      <div style={{ color: "#6a5840", fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 4 }}>{c.label}</div>
                      <div style={{ color: "#f0e8d0", fontWeight: 500 }}>{c.value}</div>
                      <div style={{ color: "#6a5840", fontSize: "0.8rem", marginTop: 2 }}>{c.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ padding: 24, border: "1px solid rgba(201,168,76,0.2)", background: "rgba(201,168,76,0.04)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                  <Icon name="Gift" size={18} className="text-[#c9a84c]" />
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.2rem", color: "#f0e8d0" }}>Акция</span>
                </div>
                <p style={{ color: "#9a8860", fontSize: "0.9rem" }}>
                  При заказе от 3-х окон — <span style={{ color: "#c9a84c" }}>скидка 15%</span> и бесплатная установка москитных сеток
                </p>
              </div>
            </div>

            <div className="luxury-card animate-on-scroll" style={{ padding: 40, transitionDelay: "0.2s" }}>
              {formSent ? (
                <div style={{ textAlign: "center", padding: "48px 0" }}>
                  <div style={{ width: 64, height: 64, border: "1px solid #c9a84c", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
                    <Icon name="CheckCircle" size={28} className="text-[#c9a84c]" />
                  </div>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.8rem", color: "#f0e8d0", marginBottom: 12 }}>Заявка принята!</h3>
                  <p style={{ color: "#6a5840", fontSize: "0.9rem" }}>Наш менеджер свяжется с вами в течение 30 минут.</p>
                  <button onClick={() => setFormSent(false)} style={{ marginTop: 24, color: "#c9a84c", fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}>
                    Отправить ещё
                  </button>
                </div>
              ) : (
                <>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.8rem", color: "#f0e8d0", marginBottom: 8 }}>Заказать замер</h3>
                  <p style={{ color: "#6a5840", fontSize: "0.85rem", marginBottom: 32 }}>Специалист приедет в удобное время и рассчитает точную стоимость</p>
                  <form onSubmit={handleFormSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    {[
                      { label: "Ваше имя", key: "name" as const, type: "text", placeholder: "Иван Иванов" },
                      { label: "Телефон", key: "phone" as const, type: "tel", placeholder: "+7 (___) ___-__-__" },
                    ].map((f) => (
                      <div key={f.key}>
                        <label style={{ color: "#6a5840", fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", display: "block", marginBottom: 8 }}>{f.label}</label>
                        <input
                          type={f.type}
                          required
                          value={formData[f.key]}
                          onChange={(e) => setFormData({ ...formData, [f.key]: e.target.value })}
                          placeholder={f.placeholder}
                          style={{ width: "100%", background: "#111", border: "1px solid rgba(201,168,76,0.2)", padding: "12px 16px", color: "#f0e8d0", fontSize: "0.9rem", outline: "none" }}
                          onFocus={(e) => e.target.style.borderColor = "#c9a84c"}
                          onBlur={(e) => e.target.style.borderColor = "rgba(201,168,76,0.2)"}
                        />
                      </div>
                    ))}
                    <div>
                      <label style={{ color: "#6a5840", fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", display: "block", marginBottom: 8 }}>Комментарий</label>
                      <textarea
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Количество окон, адрес, пожелания..."
                        rows={3}
                        style={{ width: "100%", background: "#111", border: "1px solid rgba(201,168,76,0.2)", padding: "12px 16px", color: "#f0e8d0", fontSize: "0.9rem", outline: "none", resize: "none" }}
                        onFocus={(e) => e.target.style.borderColor = "#c9a84c"}
                        onBlur={(e) => e.target.style.borderColor = "rgba(201,168,76,0.2)"}
                      />
                    </div>
                    <button type="submit" className="gold-btn" style={{ padding: 16, color: "#0a0a0a", marginTop: 8, width: "100%", cursor: "pointer" }}>
                      <span>Записаться на замер →</span>
                    </button>
                    <p style={{ color: "#3a3020", fontSize: "0.72rem", textAlign: "center" }}>Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности</p>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid rgba(201,168,76,0.15)", padding: "40px 24px", backgroundColor: "#0a0a0a" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 28, height: 28, border: "1px solid #c9a84c", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: 8, height: 8, background: "#c9a84c", clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }} />
            </div>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", color: "#c9a84c", letterSpacing: "0.15em" }}>ELEGANCE Windows &amp; Doors</span>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 24, justifyContent: "center" }}>
            {NAV_ITEMS.map((n) => (
              <button key={n.id} onClick={() => scrollTo(n.id)} className="nav-link" style={{ color: "#3a3020" }}>
                {n.label}
              </button>
            ))}
          </div>
          <div style={{ color: "#2a2015", fontSize: "0.75rem" }}>© 2024 ELEGANCE. Все права защищены</div>
        </div>
      </footer>

    </div>
  );
};

export default Index;
