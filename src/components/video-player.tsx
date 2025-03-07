import React, { forwardRef } from 'react'

interface VideoPlayerProps extends React.VideoHTMLAttributes<HTMLVideoElement> {}

const VideoPlayer = forwardRef<HTMLVideoElement, VideoPlayerProps>(({ src, ...props }, ref) => {
	return (
		<div>
			<video ref={ref} {...props}>
				<source src={src} type="video/mp4" />
			</video>
		</div>
	)
})

export default VideoPlayer
