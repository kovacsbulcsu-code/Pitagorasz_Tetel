# Pitagorasz-tétel és Háromszög Analizátor 📐

Ez a projekt egy modern, interaktív webes alkalmazás, amely a háromszögek geometriai elemzésére szolgál. A szoftver nemcsak a Pitagorasz-tételt alkalmazza számításokra, hanem segít a háromszögek validálásában és típusuk meghatározásában is.

---

## 🎨 Moduláris Felépítés

A projekt három fő egységre tagolódik, amelyeket egyedi színkódolás és modern, "dark-mode" design jellemez:

1.  **🔵 Geometriai Motor (Kék):** Hiányzó oldalhossz kiszámítása.
    * Befogók ($a, b$) alapján az átfogó ($c$) meghatározása.
    * Átfogó és az egyik befogó alapján a hiányzó oldal kiszámítása.
2.  **🟣 Validátor Modul (Lila):** Háromszög-egyenlőtlenség és derékszög ellenőrzés.
    * Annak igazolása, hogy a megadott adatok alkothatnak-e valós háromszöget.
    * A Pitagorasz-tétel megfordításával ellenőrzi a derékszög meglétét.
3.  **🟢 Szögtípus Analizátor (Emerald):** Szögek szerinti osztályozás.
    * Meghatározza, hogy a háromszög **Hegyesszögű**, **Derékszögű** vagy **Tompaszögű**.

---

## 📑 Matematikai Háttér

### Alapképlet (Pitagorasz-tétel):
$$a^2 + b^2 = c^2$$

### Szögtípus meghatározása (Kozinusz-tétel következménye):
A leghosszabb oldal ($c$) és a két rövidebb oldal ($a, b$) viszonya alapján:
* **Hegyesszögű:** $a^2 + b^2 > c^2$
* **Derékszögű:** $a^2 + b^2 = c^2$
* **Tompaszögű:** $a^2 + b^2 < c^2$

---

## ✨ Technikai Jellemzők

* **Live Visualizer:** SVG-alapú dinamikus rajzfelület, amely valós időben jeleníti meg a háromszög alakját.
* **Modern UI:** Glassmorphism effektusok, neon izzás (glow) és sötétkék-fekete radiális átmenetes háttér.
* **Reaktív Adatfeldolgozás:** Azonnali eredménykijelzés gombnyomás nélkül.
* **Hibakezelés:** Automatikus visszajelzés érvénytelen adatok vagy lehetetlen háromszögek esetén.

---
