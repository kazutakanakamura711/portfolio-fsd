import type { Applications } from '@/entities/microcms/applications'

type Props = {
  applications: Applications[]
}

const ApplicationItem = ({
  application,
  index,
}: {
  application: Applications
  index: number
}) => {
  const isEven = index % 2 === 0

  return (
    <article
      className={`flex flex-col md:flex-row gap-8 items-start border-t pt-8 ${
        isEven ? '' : 'md:flex-row-reverse'
      }`}
    >
      {/* 画像 */}
      <div className="w-full md:w-1/2">
        <img
          src={`${application.thumbnail.url}?w=800&q=75&fm=webp`}
          alt={application.title}
          className="w-full h-auto object-cover"
        />
      </div>

      {/* テキスト */}
      <div className="w-full md:w-1/2 flex flex-col gap-4 bg-white/80 p-6">
        <h2 className="text-xl font-medium tracking-wider">
          {application.title}
        </h2>
        <p className="text-sm leading-relaxed">{application.description}</p>
        <p className="text-xs">{application.technologies}</p>
        <div className="flex gap-6 text-sm">
          <a
            href={application.url}
            target="_blank"
            rel="noopener noreferrer"
            className="tracking-wider hover:opacity-60 transition-opacity"
          >
            App →
          </a>
          <a
            href={application.github_url}
            target="_blank"
            rel="noopener noreferrer"
            className="tracking-wider hover:opacity-60 transition-opacity"
          >
            GitHub →
          </a>
        </div>
      </div>
    </article>
  )
}

export const ApplicationsList = ({ applications }: Props) => {
  return (
    <div className="flex flex-col gap-8">
      {applications.map((application, index) => (
        <ApplicationItem
          key={application.id}
          application={application}
          index={index}
        />
      ))}
    </div>
  )
}
