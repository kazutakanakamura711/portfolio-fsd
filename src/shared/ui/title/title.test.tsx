import { render } from '@testing-library/react'
import { Title } from './title'
import { Heading, AlignSelf } from './title.types'

describe('Title', () => {
  it('デフォルトでh2としてテキストが描画される', () => {
    const { getByRole } = render(<Title>PROFILE</Title>)
    const heading = getByRole('heading', { level: 2 })

    expect(heading).toBeInTheDocument()
    expect(heading).toHaveTextContent('PROFILE')
  })

  it('as prop でタグを変更できる', () => {
    const { getByRole } = render(<Title as={Heading.H1}>HERO</Title>)
    const heading = getByRole('heading', { level: 1 })

    expect(heading).toBeInTheDocument()
    expect(heading).toHaveTextContent('HERO')
  })

  it('alignSelf=start で self-start クラスが付く', () => {
    const { getByRole } = render(
      <Title alignSelf={AlignSelf.Start}>ABOUT</Title>
    )
    expect(getByRole('heading')).toHaveClass('self-start')
  })

  it('alignSelf=center で self-center クラスが付く', () => {
    const { getByRole } = render(
      <Title alignSelf={AlignSelf.Center}>ABOUT</Title>
    )
    expect(getByRole('heading')).toHaveClass('self-center')
  })

  it('alignSelf=end で self-end クラスが付く', () => {
    const { getByRole } = render(<Title alignSelf={AlignSelf.End}>ABOUT</Title>)
    expect(getByRole('heading')).toHaveClass('self-end')
  })
})
