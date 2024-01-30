# CRM Testaufgabe

## Infos vorab

Das CRM kann alle Basis CRUD Operationen ausführen und hat ein paar kleine Extras. Wichtig ist jedoch, dass die type safety nicht überall gewährleistet ist und die jetzigen /pages sowie das default.vue layout in einer realen Umgebung **refaktoriert** werden müssten Header, Footer, Usermenü etc. sowie InfoBanner, DataTable, Pagination und EditModal. Bestimmte Funktionen sind - wie bspw. die Pagination - auch bedingt durch die Mock API, normalerweise würde sie per Store über die meta der /customer response umgesetzt werden und nicht "manuell" per method gebildet.

Zum schnellen Prototyping wurde Nuxt UI genutzt, weitere Technologien sind **Nuxt 3.10.0**, **Vue 3.3.9**, **Pinia 0.5.1 (2.x)** als zentralisierte Store Management. Implementiert als Module über Nuxt selbst und nicht als Standalone Dependencies um zentralisiertes Management über die **Nuxt DevTools** zu ermöglichen und bessere Übersicht zu gewährleisten.

Seit dem Update Nuxt 3.9.x wirft das NuxtUI hydration warnings, welche jedoch durch die neue **Vue Version 3.5**. behoben werden sollen, da ab dann auf ein Vue eigenes Composable zur Umsetzung zugegriffen werden kann, das Issue ist schon bei Github [Github Issue: NuxtUI Hydration](https://github.com/nuxt/ui/issues/1171).

## Setup

```bash
# yarn
yarn install

```

## DB Server (json-server)

Um die Mock API DB zu starten:

```bash
# yarn
yarn startdb

```

## Developmentserver

```bash
# yarn
yarn run dev -o

```
