import { Children, cloneElement, isValidElement } from "react"
import type { ReactElement } from "react"
import type { AvatarGroupProps, AvatarProps } from "./types"
import { Avatar } from "./Avatar"
import { cn } from "../../../utils/cn.js"

export function AvatarGroup({
  children,
  max = 4,
  size = "md",
  className,
}: AvatarGroupProps) {
  const avatarArray = Children.toArray(children)
  const visibleAvatars = avatarArray.slice(0, max)
  const remainingCount = avatarArray.length - max

  const groupClasses = cn(
    "flex",
    "-space-x-2", // Overlap avatars
    className
  )

  return (
    <div className={groupClasses}>
      {visibleAvatars.map((avatar, index) => {
        if (isValidElement<AvatarProps>(avatar)) {
          return cloneElement(avatar as ReactElement<AvatarProps>, {
            key: index,
            size,
            className: cn(
              "ring-2 ring-stone-50", // White ring for separation
              avatar.props.className
            ),
          })
        }
        return avatar
      })}

      {remainingCount > 0 && (
        <Avatar
          fallback={`+${remainingCount}`}
          size={size}
          className="ring-2 ring-stone-50 bg-stone-200 text-stone-600"
        />
      )}
    </div>
  )
}
