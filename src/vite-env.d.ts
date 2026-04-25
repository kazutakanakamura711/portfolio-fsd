/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

import '@react-three/fiber'

interface ImportMetaEnv {
  readonly VITE_MICROCMS_SERVICE_DOMAIN: string
  readonly VITE_MICROCMS_API_KEY: string
  readonly VITE_EMAILJS_SERVICE_ID: string
  readonly VITE_EMAILJS_TEMPLATE_ID: string
  readonly VITE_EMAILJS_PUBLIC_KEY: string
  readonly VITE_CONTACT_TO_EMAIL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
