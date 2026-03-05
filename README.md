# 🐾 MedHist — Sistema de Gestión de Historial Clínico Veterinario

Sistema web para la gestión de pacientes (mascotas), citas, expedientes médicos y vacunaciones. Diseñado para clínicas veterinarias que necesitan administrar su historial clínico de forma centralizada.

---

## Tech Stack

| Tecnología                                    | Versión  | Uso                                     |
| --------------------------------------------- | -------- | --------------------------------------- |
| [React](https://react.dev/)                   | 19       | UI principal                            |
| [TypeScript](https://www.typescriptlang.org/) | 5.9      | Tipado estático                         |
| [Vite](https://vite.dev/)                     | 8 (beta) | Build tool y dev server                 |
| [Tailwind CSS](https://tailwindcss.com/)      | 4        | Estilos utilitarios                     |
| [React Router](https://reactrouter.com/)      | 7        | Enrutamiento SPA                        |
| [Zustand](https://zustand-demo.pmnd.rs/)      | 5        | Manejo de estado global                 |
| [Axios](https://axios-http.com/)              | 1.13     | Cliente HTTP                            |
| [TanStack Query](https://tanstack.com/query)  | 5        | Cache y sincronización de datos remotos |

---

## Estructura de carpetas

```
src/
├── App.tsx                  # Definición de rutas principales
├── main.tsx                 # Punto de entrada
│
├── assets/                  # Imágenes y recursos estáticos
│
├── components/              # UI reutilizable (Atomic Design)
│   ├── atoms/               # Unidades mínimas: Input, Alert, ReturnLink, AddButton, ToggleFormButton
│   ├── molecules/           # Combinaciones: Alert compuesto, PageNavigator, SettingsNav
│   ├── organisms/           # Bloques de UI completos por dominio
│   │   ├── patients/        # ListPatients, FormPatient, ItemPatient, ConfirmDeletePatientModal
│   │   ├── appointments/    # (idem para citas)
│   │   ├── medicalRecords/  # (idem para expedientes)
│   │   └── vaccinations/    # (idem para vacunaciones)
│   └── templates/           # Layouts: AdminLayout, AuthLayout
│
├── entities/                # Tipos TypeScript (modelos de dominio)
│   ├── patient.ts
│   ├── appointment.ts
│   ├── veccination.ts
│   ├── veterinarian.ts
│   └── pagination.ts
│
├── features/                # Lógica de negocio conectada a UI (Feature components)
│   ├── patients/
│   ├── appointments/
│   ├── medicalRecords/
│   ├── vaccinations/
│   └── layout/              # Header
│
├── helpers/
│   ├── crypto.ts            # Utilidades de cifrado
│   └── mappers/             # Transformación de datos API → entidades
│
├── pages/
│   ├── admin/               # Páginas protegidas
│   │   ├── Admin.tsx        # Vista principal (pacientes + formulario)
│   │   ├── Patients.tsx     # Lista de pacientes
│   │   ├── Appointment.tsx  # Citas del paciente
│   │   ├── MedicalRecord.tsx
│   │   ├── Vaccination.tsx
│   │   ├── Profile.tsx      # Perfil del veterinario
│   │   └── ResetPassword.tsx
│   └── auth/                # Páginas públicas (login, registro, etc.)
│
├── services/
│   ├── api.ts               # Instancias de Axios (apiAuth / apiPublic) + interceptores
│   └── errorHandler.ts      # Manejo centralizado de errores HTTP
│
└── store/                   # Estado global con Zustand
    ├── auth.ts              # Sesión y autenticación
    ├── patient.ts           # Pacientes (CRUD + paginación + showForm)
    ├── appointment.ts       # Citas
    ├── medical_record.ts    # Expedientes médicos
    ├── veccination.ts       # Vacunaciones
    ├── veterinarian.ts      # Perfil del veterinario
    └── url.ts               # URL base dinámica para navegación
```

---

## Arquitectura

El proyecto sigue una arquitectura por **dominio + capas**, combinando **Atomic Design** para los componentes de UI.

```
Página (page)
  └── Feature Component       ← conecta store con UI
        ├── Store (Zustand)   ← estado global + llamadas al servicio
        ├── Service (Axios)   ← peticiones HTTP a la API REST
        └── Organism/Molecule ← componente de presentación puro
```

### Principios aplicados

- **Atomic Design**: `atoms` → `molecules` → `organisms` → `templates` → `pages`
- **Feature components**: separan la lógica de negocio (store, efectos) de los componentes de presentación
- **Stores Zustand por dominio**: cada entidad tiene su propio store con estado local, acciones CRUD y paginación
- **Dos instancias Axios**: `apiAuth` (con interceptor de 401/500 para logout automático) y `apiPublic` (sin autenticación)
- **Mappers**: transforman los datos crudos de la API al modelo de dominio interno
- **Rutas protegidas**: `AdminLayout` valida sesión con `getSession()` antes de renderizar las páginas del área admin

---

## Variables de entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
VITE_API=host
```

---

## Comandos

```bash
# Instalar dependencias
bun install

# Iniciar servidor de desarrollo
bun run dev

# Compilar para producción
bun run build

# Previsualizar build
bun run preview

# Lint
bun run lint
```

---

## Requisitos previos

- Node.js ≥ 22
- Backend REST corriendo (ver variable `VITE_API`)
