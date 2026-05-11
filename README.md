# Pitagorasz-tétel Kalkulátor 📐

Ez a projekt egy egyszerű, de hatékony eszköz a derékszögű háromszögek oldalhosszainak kiszámításához és ellenőrzéséhez a **Pitagorasz-tétel** alapján.

---

## 🚀 Funkciók

A program három fő esetet képes kezelni:

1.  **Átfogó kiszámítása:** Ha megadod a két befogót ($a$ és $b$), a program kiszámolja az átfogót ($c$).
2.  **Hiányzó befogó kiszámítása:** Ha megadod az egyik befogót ($a$ vagy $b$) és az átfogót ($c$), a program kiszámolja a hiányzó befogót.
3.  **Derékszögű háromszög ellenőrzése:** Ha megadod mindhárom oldalt, a program eldönti, hogy azok alkothatnak-e derékszögű háromszöget.

---

## 📑 Matematikai háttér

A számítások alapja a jól ismert képlet:

$$a^2 + b^2 = c^2$$

Ahol:
* **$a$ és $b$**: a derékszögű háromszög befogói.
* **$c$**: a derékszögű háromszög átfogója (a leghosszabb oldal).

### Alkalmazott képletek:
* **Átfogó keresése:** $c = \sqrt{a^2 + b^2}$
* **Befogó keresése:** $a = \sqrt{c^2 - b^2}$

---

## 🛠️ Használat

1.  Indítsd el a programot.
2.  Válaszd ki a kívánt műveletet (számítás vagy ellenőrzés).
3.  Add meg az ismert oldalakat.
4.  A program azonnal kijelzi az eredményt vagy az igazolást.

---

> **Megjegyzés:** A program kizárólag pozitív számokkal dolgozik, hiszen a háromszögek oldalai nem lehetnek negatívak vagy nulla hosszúak.