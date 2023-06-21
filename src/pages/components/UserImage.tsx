import Image from 'next/image';
import React from 'react'
import { VscAccount } from 'react-icons/vsc'
type ProfileImageProps = {
    src?: string | null;
    className?: string;
  };

function UserImage({ src, className = "" }: ProfileImageProps) {
    return (
        <>
            <div
                className={`relative h-10 w-10 overflow-hidden rounded-full ${className}`}
            >
                {src == null ? (
                    <VscAccount className="h-full w-full" />
                ) : (
                    <Image src={src} alt="Profile Image" quality={100} fill />
                )}
            </div>
        </>
    )
}

export default UserImage