import { Link } from 'react-router-dom'
import { Button, Heading, Title } from '@/shared/ui'

export const NotFoundPage = () => {
  return (
    <section className="mx-auto flex max-w-2xl flex-col items-center gap-6 bg-white/80 px-6 py-16 text-center md:px-10">
      <p className="text-sm tracking-[0.3em] text-black/60">404 NOT FOUND</p>
      <Title as={Heading.H1}>PAGE NOT FOUND</Title>
      <p className="leading-relaxed text-black/70">
        お探しのページは存在しないか、移動された可能性があります。
      </p>
      <Button asChild>
        <Link to="/">トップへ戻る</Link>
      </Button>
    </section>
  )
}
