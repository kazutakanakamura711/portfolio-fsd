const TECHNOLOGIES =
  'React / TypeScript / Tailwind CSS / Shadcn/ui / MicroCMS / Vite / Storybook / Vitest'

export const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-8 bg-black text-white">
      <div className="max-w-5xl mx-auto px-4 flex flex-col items-center gap-2">
        <p className="text-xs text-center">Built with {TECHNOLOGIES}</p>
        <p className="text-xs">© {currentYear} Kazutaka Nakamura</p>
      </div>
    </footer>
  )
}
