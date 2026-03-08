import profileImage from '@/shared/assets/img-profile.jpg'

export const ProfileHero = () => {
  return (
    <div className="flex flex-col items-center gap-4">
      <img
        src={profileImage}
        alt="Kazutaka Nakamura"
        className="w-full max-w-sm object-cover"
      />
      <div className="flex flex-col items-center gap-1">
        <p className="font-medium tracking-widest">KAZUTAKA NAKAMURA</p>
        <p className="text-sm text-muted-foreground tracking-wider">
          フロントエンドエンジニア
        </p>
      </div>
    </div>
  )
}
