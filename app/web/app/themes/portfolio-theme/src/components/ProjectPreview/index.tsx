import { ReactComponent as ArrowRight } from 'line-awesome/svg/arrow-right-solid.svg'
import { ReactComponent as GitHub } from 'line-awesome/svg/github.svg'
import Button from '../Button'
import clsx from 'clsx'

interface PreviewProps {
  className?: string
  thumbnail?: string
  video?: string
  alt: string
}

const Preview = ({ className, thumbnail, video, alt }: PreviewProps) => {
  return (
    <div className={clsx('w-full lg:w-[40%] rounded-md', className)}>
      {thumbnail ? (
        <img
          className="w-full !my-0"
          loading="lazy"
          src={thumbnail}
          alt={alt}
        />
      ) : null}
      {video ? (
        <video
          src={video}
          className="w-full !my-0"
          preload="none"
          autoPlay
          muted
          loop
        />
      ) : null}
    </div>
  )
}

interface ProjectPreviewProps {
  title: string
  thumbnail?: string
  video?: string
  github?: string
  excerpt: string
  url: string
  tags: string[]
}

const ProjectPreview = ({
  title,
  thumbnail,
  github,
  video,
  excerpt,
  url,
  tags = [],
}: ProjectPreviewProps) => {
  const READ_MORE_LABEL: Record<string, string> = {
    en: 'Continue reading',
    de: 'Weiterlesen',
  }

  const lang =
    window.location.href.replace(`${window.origin}/`, '').split('/')[0] ?? 'en'

  const label = READ_MORE_LABEL[lang] ?? READ_MORE_LABEL.en

  return (
    <div className="flex flex-col-reverse lg:flex-row gap-8 justify-between items-start my-5 lg:my-20">
      <div className="flex flex-col lg:w-[60%] gap-4">
        <h2 className="!my-0">{title}</h2>
        <ul className="list-none !my-0 !pl-0 flex flex-wrap gap-2">
          {tags.map((tag, i) => (
            <li
              className="px-[6px] rounded-[5px] bg-dark-2 text-white !m-0"
              key={i}
            >
              {tag}
            </li>
          ))}
        </ul>

        <Preview
          className="lg:hidden"
          thumbnail={thumbnail}
          video={video}
          alt={title}
        />
        <p
          className="!my-0 leading-8"
          dangerouslySetInnerHTML={{ __html: excerpt }}
        />
        <div className="flex justify-between mt-4">
          <div>
            {github ? (
              <Button href={github} target="_blank" small light>
                <GitHub className="!text-dark-2" width="24" height="24" />
              </Button>
            ) : null}
          </div>
          <a href={url} className="flex gap-2 items-center">
            {label} <ArrowRight width="24" height="24" />
          </a>
        </div>
      </div>
      <Preview
        className="hidden lg:block"
        thumbnail={thumbnail}
        video={video}
        alt={title}
      />
    </div>
  )
}

export default ProjectPreview
