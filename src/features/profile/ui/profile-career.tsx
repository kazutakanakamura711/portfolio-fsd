type Props = {
  about: string
}

export const ProfileCareer = ({ about }: Props) => {
  return (
    <div className="flex flex-col gap-4 border-t pt-8">
      <h2 className="font-medium tracking-wider">経歴概要</h2>
      <div
        className="text-sm leading-relaxed wrap-break-word"
        dangerouslySetInnerHTML={{ __html: about }}
      />
    </div>
  )
}
