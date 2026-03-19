import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const WINDOW_IMG = "https://cdn.poehali.dev/projects/a4bb76c4-0ff1-4547-be0e-7e38f2c0d6ec/files/270ad152-496b-4192-9d9c-1e491d785a77.jpg";
const BALCONY_IMG = "https://cdn.poehali.dev/projects/a4bb76c4-0ff1-4547-be0e-7e38f2c0d6ec/files/4003513e-9f01-421a-8da1-021bce83a3a0.jpg";
const DOOR_IMG = "https://cdn.poehali.dev/projects/a4bb76c4-0ff1-4547-be0e-7e38f2c0d6ec/files/1c379a6c-00cb-4c13-bd42-f0f78ba07c4e.jpg";

const NAV_ITEMS = [
  { id: "home", label: "Главная" },
  { id: "catalog", label: "Каталог" },
  { id: "services", label: "Услуги" },
  { id: "about", label: "О нас" },
  { id: "guarantee", label: "Гарантия" },
  { id: "contacts", label: "Контакты" },
];

function useScrollAnimation() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        });
      },
      { threshold: 0.1 }
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
      setScrolled(window.scrollY > 40);
      for (const { id } of [...NAV_ITEMS].reverse()) {
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

  return (
    <div style={{ backgroundColor: "#fafbfc", color: "#1e2532", fontFamily: "'Golos Text', 'Montserrat', sans-serif" }}>

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        background: scrolled ? "rgba(250,251,252,0.96)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid #e8eef4" : "none",
        transition: "all 0.35s ease",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", height: 68, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 38, height: 38, borderRadius: 10,
              background: "linear-gradient(135deg, #2a8fd4, #1a6fa0)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 4px 12px rgba(42,143,212,0.35)",
            }}>
              <Icon name="Grid2x2" size={18} style={{ color: "#fff" }} />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: "1.1rem", color: "#1e2532", letterSpacing: "-0.02em", lineHeight: 1 }}>Элеганс</div>
              <div style={{ fontSize: "0.62rem", color: "#8aa0b8", letterSpacing: "0.06em", textTransform: "uppercase", lineHeight: 1, marginTop: 2 }}>Окна · Двери · Балконы</div>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 28 }} className="hidden lg:flex">
            {NAV_ITEMS.map((item) => (
              <button key={item.id} onClick={() => scrollTo(item.id)}
                className={`nav-link ${activeSection === item.id ? "active" : ""}`}
                style={{ background: "none", border: "none", cursor: "pointer" }}
              >
                {item.label}
              </button>
            ))}
          </div>

          <button onClick={() => scrollTo("contacts")} className="btn-primary hidden lg:flex" style={{ padding: "10px 22px", fontSize: "0.82rem" }}>
            <Icon name="Phone" size={15} />
            Заказать замер
          </button>

          <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden" style={{ background: "none", border: "none", cursor: "pointer", color: "#2a8fd4" }}>
            <Icon name={menuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>

        {menuOpen && (
          <div style={{ background: "#fff", borderTop: "1px solid #e8eef4", padding: "20px 24px", display: "flex", flexDirection: "column", gap: 16 }}>
            {NAV_ITEMS.map((item) => (
              <button key={item.id} onClick={() => scrollTo(item.id)}
                className="nav-link" style={{ background: "none", border: "none", cursor: "pointer", textAlign: "left", fontSize: "1rem" }}
              >
                {item.label}
              </button>
            ))}
            <button onClick={() => scrollTo("contacts")} className="btn-accent" style={{ marginTop: 8 }}>
              Заказать замер
            </button>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="home" style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0 }}>
          <img src={WINDOW_IMG} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(110deg, rgba(250,251,252,0.97) 45%, rgba(250,251,252,0.7) 70%, rgba(250,251,252,0.15) 100%)" }} />
        </div>
        <div style={{
          position: "absolute", top: "15%", right: "8%",
          width: 320, height: 320,
          background: "radial-gradient(circle, rgba(42,143,212,0.12) 0%, transparent 70%)",
          borderRadius: "50%", pointerEvents: "none",
        }} />

        <div style={{ position: "relative", maxWidth: 1200, margin: "0 auto", padding: "120px 24px 80px", width: "100%" }}>
          <div style={{ maxWidth: 580 }}>
            <div className="animate-on-scroll" style={{ marginBottom: 20 }}>
              <span className="tag tag-blue" style={{ fontSize: "0.8rem" }}>
                <Icon name="Award" size={13} />
                Работаем с 2012 года · Гарантия 10 лет
              </span>
            </div>

            <h1 className="animate-on-scroll" style={{
              fontWeight: 800, fontSize: "clamp(2.2rem, 5.5vw, 3.8rem)",
              lineHeight: 1.15, letterSpacing: "-0.03em", color: "#1e2532",
              marginBottom: 20, transitionDelay: "0.1s",
            }}>
              Тёплые окна для{" "}
              <span style={{ color: "#2a8fd4" }}>уютного дома</span>
            </h1>

            <p className="animate-on-scroll" style={{
              fontSize: "1.1rem", color: "#5a6b7e", lineHeight: 1.7,
              marginBottom: 36, maxWidth: 480, transitionDelay: "0.2s",
            }}>
              ПВХ-окна, балконы и двери под ключ. Замер бесплатно, монтаж за 1 день, гарантия 10 лет без звёздочек.
            </p>

            <div className="animate-on-scroll" style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 48, transitionDelay: "0.3s" }}>
              <button onClick={() => scrollTo("catalog")} className="btn-accent">
                <Icon name="Eye" size={16} />
                Смотреть каталог
              </button>
              <button onClick={() => scrollTo("contacts")} className="btn-outline">
                <Icon name="Ruler" size={16} />
                Бесплатный замер
              </button>
            </div>

            <div className="animate-on-scroll" style={{
              display: "flex", transitionDelay: "0.4s",
              background: "#fff", borderRadius: 14, overflow: "hidden",
              boxShadow: "0 4px 24px rgba(42,143,212,0.1)", border: "1px solid #e0eef8",
              width: "fit-content",
            }}>
              {[["1200+", "Объектов"], ["10 лет", "Гарантия"], ["48 ч", "Замер и расчёт"]].map(([n, l], i) => (
                <div key={l} style={{
                  padding: "16px 28px", textAlign: "center",
                  borderRight: i < 2 ? "1px solid #e8eef4" : "none",
                }}>
                  <div style={{ fontSize: "1.6rem", fontWeight: 800, color: "#2a8fd4", lineHeight: 1, letterSpacing: "-0.03em" }}>{n}</div>
                  <div style={{ fontSize: "0.72rem", color: "#8aa0b8", marginTop: 4, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.04em" }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* CATALOG */}
      <section id="catalog" style={{ padding: "96px 24px", backgroundColor: "#fafbfc" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="animate-on-scroll" style={{ textAlign: "center", marginBottom: 56 }}>
            <span className="tag tag-blue" style={{ marginBottom: 16, display: "inline-flex" }}>
              <Icon name="Package" size={13} />
              Наша продукция
            </span>
            <h2 className="section-title">Каталог продукции</h2>
            <p className="section-subtitle" style={{ maxWidth: 480, margin: "12px auto 0" }}>
              Производим и устанавливаем по всему городу. Цены без наценок — напрямую с завода.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 24 }}>
            {[
              {
                img: WINDOW_IMG,
                badge: "Хит продаж", badgeColor: "#fff3cd", badgeText: "#92620a",
                icon: "Wind", iconBg: "#e0f2fe", iconColor: "#0ea5e9",
                title: "ПВХ Окна", subtitle: "Серия «Комфорт»",
                desc: "Профили REHAU и VEKA — тепло-, звуко- и влагоизоляция класса А. Двойной и тройной стеклопакет.",
                price: "от 8 500 ₽",
                features: ["Профиль REHAU / VEKA", "5-камерный профиль", "Гарантия 10 лет"],
              },
              {
                img: BALCONY_IMG,
                badge: "Популярное", badgeColor: "#e0f2fe", badgeText: "#1a6fa0",
                icon: "Home", iconBg: "#f0fdf4", iconColor: "#22c55e",
                title: "Балконы", subtitle: "Тёплое и холодное",
                desc: "Остекление и отделка «под ключ». Любые размеры, любой стиль. Дизайн-проект бесплатно.",
                price: "от 45 000 ₽",
                features: ["Холодное и тёплое", "Отделка включена", "Дизайн-проект в подарок"],
              },
              {
                img: DOOR_IMG,
                badge: "Надёжность", badgeColor: "#f0fdf4", badgeText: "#1a7a50",
                icon: "DoorOpen", iconBg: "#fff7ed", iconColor: "#f97316",
                title: "Входные двери", subtitle: "Серия «Защита»",
                desc: "Стальные и ПВХ двери с многоточечным замком. Тепловой контур, шумоизоляция, антивандальное покрытие.",
                price: "от 32 000 ₽",
                features: ["Многоточечный замок", "Термо-разрыв", "Доставка и установка"],
              },
            ].map((item, i) => (
              <div key={i} className="site-card animate-on-scroll" style={{ transitionDelay: `${i * 0.12}s` }}>
                <div style={{ position: "relative", height: 220, overflow: "hidden", borderRadius: "16px 16px 0 0" }}>
                  <img src={item.img} alt={item.title} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.6s" }} className="hover:scale-105" />
                  <div style={{ position: "absolute", top: 14, left: 14 }}>
                    <span style={{ background: item.badgeColor, color: item.badgeText, fontSize: "0.72rem", fontWeight: 700, padding: "4px 10px", borderRadius: 100 }}>
                      {item.badge}
                    </span>
                  </div>
                </div>
                <div style={{ padding: 24 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                    <div style={{ width: 42, height: 42, borderRadius: 10, background: item.iconBg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Icon name={item.icon} size={20} style={{ color: item.iconColor }} fallback="Star" />
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: "1.1rem", color: "#1e2532" }}>{item.title}</div>
                      <div style={{ fontSize: "0.78rem", color: "#8aa0b8" }}>{item.subtitle}</div>
                    </div>
                  </div>
                  <p style={{ color: "#5a6b7e", fontSize: "0.88rem", lineHeight: 1.65, marginBottom: 16 }}>{item.desc}</p>
                  <ul style={{ listStyle: "none", padding: 0, margin: "0 0 20px", display: "flex", flexDirection: "column", gap: 6 }}>
                    {item.features.map((f) => (
                      <li key={f} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.82rem", color: "#4a5568" }}>
                        <Icon name="Check" size={14} style={{ color: "#22c55e", flexShrink: 0 }} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 16, borderTop: "1px solid #f0f4f8" }}>
                    <div>
                      <div style={{ fontSize: "0.7rem", color: "#8aa0b8", textTransform: "uppercase", letterSpacing: "0.06em" }}>Стоимость</div>
                      <div style={{ fontWeight: 800, fontSize: "1.3rem", color: "#2a8fd4" }}>{item.price}</div>
                    </div>
                    <button onClick={() => scrollTo("contacts")} className="btn-primary" style={{ padding: "10px 18px", fontSize: "0.8rem" }}>
                      Заказать
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* SERVICES */}
      <section id="services" style={{ padding: "96px 24px", background: "#f0f6fc" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="animate-on-scroll" style={{ textAlign: "center", marginBottom: 56 }}>
            <span className="tag tag-blue" style={{ marginBottom: 16, display: "inline-flex" }}>
              <Icon name="Wrench" size={13} />
              Что мы делаем
            </span>
            <h2 className="section-title">Полный цикл работ</h2>
            <p className="section-subtitle" style={{ maxWidth: 440, margin: "12px auto 0" }}>
              От первого звонка до сдачи объекта — всё берём на себя
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
            {[
              { icon: "Ruler", color: "#0ea5e9", bg: "#e0f2fe", title: "Бесплатный замер", desc: "Выезжаем в день обращения. Точный расчёт стоимости — без скрытых платежей и сюрпризов." },
              { icon: "Factory", color: "#a855f7", bg: "#f5f3ff", title: "Собственное производство", desc: "Производим на импортном оборудовании. Контроль качества на каждом этапе." },
              { icon: "Hammer", color: "#f97316", bg: "#fff7ed", title: "Профессиональный монтаж", desc: "Сертифицированные мастера, пеноуретан, паро- и гидроизоляция, отделка откосов." },
              { icon: "PaintBucket", color: "#22c55e", bg: "#f0fdf4", title: "Отделка откосов", desc: "MDF или штукатурка в любой цвет. Чистовая отделка за 1 день. Гарантия 5 лет." },
              { icon: "Settings", color: "#ec4899", bg: "#fdf2f8", title: "Сервис и ремонт", desc: "Регулировка, замена уплотнителей и фурнитуры. Обслуживаем окна любых марок." },
              { icon: "CheckSquare", color: "#14b8a6", bg: "#f0fdfa", title: "Сдача «под ключ»", desc: "Демонтаж, монтаж, отделка, уборка. Вы принимаете идеально готовый результат." },
            ].map((s, i) => (
              <div key={i} className="site-card animate-on-scroll" style={{ padding: 24, transitionDelay: `${i * 0.08}s`, background: "#fff" }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: s.bg, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                  <Icon name={s.icon} size={22} style={{ color: s.color }} fallback="Star" />
                </div>
                <h3 style={{ fontWeight: 700, fontSize: "1rem", color: "#1e2532", marginBottom: 8 }}>{s.title}</h3>
                <p style={{ color: "#6b7c93", fontSize: "0.875rem", lineHeight: 1.65 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ABOUT */}
      <section id="about" style={{ padding: "96px 24px", background: "#f0f6fc" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }} className="grid-cols-1 lg:grid-cols-2">
          <div className="animate-on-scroll">
            <span className="tag tag-blue" style={{ marginBottom: 20, display: "inline-flex" }}>
              <Icon name="Building2" size={13} />
              О компании
            </span>
            <h2 className="section-title" style={{ marginBottom: 20 }}>12 лет делаем дома теплее</h2>
            <p style={{ color: "#5a6b7e", fontSize: "1rem", lineHeight: 1.75, marginBottom: 16 }}>
              Мы — местная компания, которая производит и устанавливает окна, балконы и двери. Без посредников, напрямую с завода.
            </p>
            <p style={{ color: "#7a8ea0", fontSize: "0.95rem", lineHeight: 1.75, marginBottom: 32 }}>
              Используем сертифицированные профили REHAU, VEKA, KBE. Собственное производство оснащено европейским оборудованием. Каждое изделие проходит контроль качества перед отгрузкой клиенту.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {[
                { n: "12 лет", l: "на рынке", icon: "CalendarDays", c: "#0ea5e9", bg: "#e0f2fe" },
                { n: "50+", l: "специалистов", icon: "Users", c: "#a855f7", bg: "#f5f3ff" },
                { n: "1200+", l: "клиентов", icon: "Heart", c: "#f97316", bg: "#fff7ed" },
                { n: "3", l: "производства", icon: "Factory", c: "#22c55e", bg: "#f0fdf4" },
              ].map(({ n, l, icon, c, bg }) => (
                <div key={l} style={{ background: "#fff", borderRadius: 12, padding: 16, display: "flex", alignItems: "center", gap: 12, border: "1px solid #e8eef4" }}>
                  <div style={{ width: 42, height: 42, borderRadius: 10, background: bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Icon name={icon} size={20} style={{ color: c }} fallback="Star" />
                  </div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: "1.3rem", color: "#1e2532", lineHeight: 1 }}>{n}</div>
                    <div style={{ fontSize: "0.75rem", color: "#8aa0b8", marginTop: 2 }}>{l}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="animate-on-scroll" style={{ position: "relative", transitionDelay: "0.2s" }}>
            <div style={{ borderRadius: 20, overflow: "hidden", boxShadow: "0 24px 64px rgba(42,143,212,0.15)" }}>
              <img src={BALCONY_IMG} alt="Производство" style={{ width: "100%", height: 460, objectFit: "cover", display: "block" }} />
            </div>
            <div style={{
              position: "absolute", bottom: -20, right: -16,
              background: "#2a8fd4", color: "#fff", borderRadius: 16,
              padding: "16px 24px", boxShadow: "0 8px 32px rgba(42,143,212,0.4)",
            }}>
              <div style={{ fontWeight: 800, fontSize: "1.6rem", lineHeight: 1 }}>№1</div>
              <div style={{ fontSize: "0.72rem", marginTop: 4, opacity: 0.85, textTransform: "uppercase", letterSpacing: "0.06em" }}>В регионе</div>
            </div>
            <div style={{
              position: "absolute", top: -16, left: -16,
              background: "#fff", borderRadius: 14, padding: "12px 18px",
              boxShadow: "0 4px 24px rgba(0,0,0,0.1)", border: "1px solid #e8eef4",
              display: "flex", alignItems: "center", gap: 10,
            }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: "#fefce8", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon name="Star" size={18} style={{ color: "#f59e0b" }} />
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "#1e2532" }}>4.9 из 5</div>
                <div style={{ fontSize: "0.7rem", color: "#8aa0b8" }}>Рейтинг клиентов</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* GUARANTEE */}
      <section id="guarantee" style={{ padding: "96px 24px", backgroundColor: "#fafbfc" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="animate-on-scroll" style={{ textAlign: "center", marginBottom: 56 }}>
            <span className="tag tag-green" style={{ marginBottom: 16, display: "inline-flex" }}>
              <Icon name="ShieldCheck" size={13} />
              Уверены в качестве
            </span>
            <h2 className="section-title">Гарантия без звёздочек</h2>
            <p className="section-subtitle" style={{ maxWidth: 480, margin: "12px auto 0" }}>
              Всё что говорим — прописываем в договоре
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }} className="grid-cols-1 md:grid-cols-2">
            {[
              {
                icon: "ShieldCheck", bg: "#e0f2fe", c: "#0ea5e9",
                title: "10 лет на конструкцию",
                text: "Гарантия на профиль, стеклопакет и фурнитуру. При любом заводском дефекте — бесплатная замена. Официальный гарантийный талон.",
              },
              {
                icon: "Hammer", bg: "#fff7ed", c: "#f97316",
                title: "5 лет на монтаж",
                text: "Гарантия на монтажные работы. Если появится продувание или промерзание — устраним бесплатно в течение 48 часов.",
              },
            ].map((g, i) => (
              <div key={i} className="site-card animate-on-scroll" style={{ padding: 32, transitionDelay: `${i * 0.15}s` }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 20 }}>
                  <div style={{ width: 56, height: 56, borderRadius: 14, background: g.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Icon name={g.icon} size={26} style={{ color: g.c }} fallback="Shield" />
                  </div>
                  <div>
                    <h3 style={{ fontWeight: 700, fontSize: "1.15rem", color: "#1e2532", marginBottom: 10 }}>{g.title}</h3>
                    <p style={{ color: "#6b7c93", fontSize: "0.9rem", lineHeight: 1.7 }}>{g.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
            {[
              { icon: "BadgeCheck", c: "#0ea5e9", bg: "#e0f2fe", title: "Сертификаты", text: "ГОСТ 30674-99, европейские стандарты EN. Вся документация на руки клиенту." },
              { icon: "FileText", c: "#a855f7", bg: "#f5f3ff", title: "Договор", text: "Сроки, стоимость, обязательства — всё прописано. Никаких устных договорённостей." },
              { icon: "Clock", c: "#f97316", bg: "#fff7ed", title: "Сроки", text: "Задержка — скидка 1% за каждый день. Нам выгодно работать быстро." },
              { icon: "ThumbsUp", c: "#22c55e", bg: "#f0fdf4", title: "Контроль", text: "Проверяем качество при производстве, доставке, монтаже и на сдаче объекта." },
            ].map((g, i) => (
              <div key={i} className="site-card animate-on-scroll" style={{ padding: 24, transitionDelay: `${i * 0.1}s` }}>
                <div style={{ width: 44, height: 44, borderRadius: 11, background: g.bg, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                  <Icon name={g.icon} size={20} style={{ color: g.c }} fallback="Star" />
                </div>
                <h4 style={{ fontWeight: 700, fontSize: "1rem", color: "#1e2532", marginBottom: 8 }}>{g.title}</h4>
                <p style={{ color: "#6b7c93", fontSize: "0.85rem", lineHeight: 1.6 }}>{g.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* CONTACTS */}
      <section id="contacts" style={{ padding: "96px 24px", background: "#f0f6fc" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="animate-on-scroll" style={{ textAlign: "center", marginBottom: 56 }}>
            <span className="tag tag-orange" style={{ marginBottom: 16, display: "inline-flex" }}>
              <Icon name="MessageCircle" size={13} />
              Свяжитесь с нами
            </span>
            <h2 className="section-title">Замер бесплатно</h2>
            <p className="section-subtitle" style={{ maxWidth: 440, margin: "12px auto 0" }}>
              Оставьте заявку — мы перезвоним в течение 30 минут
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "start" }} className="grid-cols-1 lg:grid-cols-2">
            <div className="animate-on-scroll">
              <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 28 }}>
                {[
                  { icon: "Phone", bg: "#e0f2fe", c: "#0ea5e9", label: "Звоните бесплатно", value: "+7 (912) 518-92-07", sub: "Пн–Сб с 9:00 до 20:00" },
                  { icon: "Mail", bg: "#f5f3ff", c: "#a855f7", label: "Пишите на почту", value: "Aleksandrbogovid@mail.ru", sub: "Ответим в течение часа" },
                  { icon: "MapPin", bg: "#fff7ed", c: "#f97316", label: "Приезжайте в офис", value: "ул. Магистральная, 63, корп. 7, рынок «Пятёрочка»", sub: "Рядом с метро Сокольники" },
                ].map((c) => (
                  <div key={c.label} style={{ background: "#fff", borderRadius: 14, padding: 20, border: "1px solid #e8eef4", display: "flex", alignItems: "center", gap: 16 }}>
                    <div style={{ width: 48, height: 48, borderRadius: 12, background: c.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Icon name={c.icon} size={20} style={{ color: c.c }} />
                    </div>
                    <div>
                      <div style={{ fontSize: "0.72rem", color: "#8aa0b8", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 3 }}>{c.label}</div>
                      <div style={{ fontWeight: 700, fontSize: "1rem", color: "#1e2532" }}>{c.value}</div>
                      <div style={{ fontSize: "0.8rem", color: "#8aa0b8", marginTop: 2 }}>{c.sub}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ background: "linear-gradient(135deg, #fff7ed, #ffedd5)", borderRadius: 16, padding: 24, border: "1px solid #fed7aa" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                  <Icon name="Gift" size={20} style={{ color: "#f97316" }} />
                  <span style={{ fontWeight: 700, fontSize: "1rem", color: "#7c2d12" }}>Акция до конца месяца</span>
                </div>
                <p style={{ color: "#9a3412", fontSize: "0.9rem", lineHeight: 1.6 }}>
                  При заказе от 3-х окон — <strong>скидка 15%</strong> и москитные сетки в подарок
                </p>
              </div>
            </div>

            <div className="site-card animate-on-scroll" style={{ padding: 36, transitionDelay: "0.2s" }}>
              {formSent ? (
                <div style={{ textAlign: "center", padding: "40px 20px" }}>
                  <div style={{
                    width: 72, height: 72, borderRadius: 18, background: "#f0fdf4",
                    display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px",
                  }}>
                    <Icon name="CheckCircle2" size={36} style={{ color: "#22c55e" }} />
                  </div>
                  <h3 style={{ fontWeight: 800, fontSize: "1.5rem", color: "#1e2532", marginBottom: 10 }}>Отлично! Заявка принята</h3>
                  <p style={{ color: "#6b7c93", fontSize: "0.95rem", lineHeight: 1.6 }}>Наш специалист перезвонит вам в течение <strong>30 минут</strong> для согласования времени замера.</p>
                  <button onClick={() => setFormSent(false)} style={{ marginTop: 24, color: "#2a8fd4", background: "none", border: "none", cursor: "pointer", fontSize: "0.875rem", fontWeight: 600, textDecoration: "underline" }}>
                    Отправить ещё одну заявку
                  </button>
                </div>
              ) : (
                <>
                  <h3 style={{ fontWeight: 800, fontSize: "1.4rem", color: "#1e2532", marginBottom: 6 }}>Заказать замер</h3>
                  <p style={{ color: "#6b7c93", fontSize: "0.875rem", marginBottom: 28 }}>
                    Специалист приедет, измерит и рассчитает точную стоимость — бесплатно
                  </p>
                  <form onSubmit={(e) => { e.preventDefault(); setFormSent(true); }} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    {[
                      { label: "Ваше имя", key: "name" as const, type: "text", placeholder: "Иван Иванов" },
                      { label: "Телефон", key: "phone" as const, type: "tel", placeholder: "+7 (___) ___-__-__" },
                    ].map((f) => (
                      <div key={f.key}>
                        <label className="form-label">{f.label}</label>
                        <input
                          type={f.type} required value={formData[f.key]}
                          onChange={(e) => setFormData({ ...formData, [f.key]: e.target.value })}
                          placeholder={f.placeholder}
                          className="form-input"
                        />
                      </div>
                    ))}
                    <div>
                      <label className="form-label">Комментарий (необязательно)</label>
                      <textarea
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Количество окон, адрес, пожелания..."
                        rows={3}
                        className="form-input"
                        style={{ resize: "none" }}
                      />
                    </div>
                    <button type="submit" className="btn-accent" style={{ marginTop: 4, justifyContent: "center" }}>
                      <Icon name="CalendarCheck" size={16} />
                      Записаться на замер
                    </button>
                    <p style={{ color: "#a0b0c0", fontSize: "0.72rem", textAlign: "center" }}>
                      Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#1e2532", padding: "40px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 34, height: 34, borderRadius: 8, background: "linear-gradient(135deg, #2a8fd4, #1a6fa0)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon name="Grid2x2" size={16} style={{ color: "#fff" }} />
            </div>
            <span style={{ fontWeight: 700, fontSize: "1rem", color: "#fff" }}>Элеганс</span>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 24, justifyContent: "center" }}>
            {NAV_ITEMS.map((n) => (
              <button key={n.id} onClick={() => scrollTo(n.id)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "#8aa0b8", fontSize: "0.85rem", fontWeight: 500, transition: "color 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#8aa0b8")}
              >
                {n.label}
              </button>
            ))}
          </div>
          <div style={{ color: "#4a5568", fontSize: "0.75rem" }}>© 2024 Элеганс. Все права защищены</div>
        </div>
      </footer>

    </div>
  );
};

export default Index;