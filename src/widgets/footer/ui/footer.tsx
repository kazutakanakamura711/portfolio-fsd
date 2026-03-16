const TECHNOLOGIES =
  'React / TypeScript / Tailwind CSS / Shadcn/ui / MicroCMS / Vite / Storybook / Vitest'

export const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t py-8 bg-black text-white">
      <div className="max-w-5xl mx-auto px-4 flex flex-col items-center gap-2">
        <p className="text-xs text-muted-foreground text-center">
          Built with {TECHNOLOGIES}
        </p>
        <p className="text-xs text-muted-foreground">
          © {currentYear} Kazutaka Nakamura
        </p>
      </div>
    </footer>
  )
}
