import { useEffect, useRef } from 'react'
import { discordSdk } from '../hooks/useDiscordSdk'
import VideoPlayer from '../components/video-player'
import { useSyncState } from '@robojs/sync'

export const Activity = () => {
	const [isPlaying, setIsPlaying] = useSyncState<boolean>(false, ['video-playing', discordSdk.channelId])
	const videoRef = useRef<HTMLVideoElement>(null)

	const onToggleButtonClick = () => {
		setIsPlaying((prev) => !prev)
	}

	useEffect(() => {
		if (videoRef.current) {
			if (isPlaying) {
				videoRef.current.play()
			} else {
				videoRef.current.pause()
			}
		}
	}, [isPlaying])

	return (
		<div>
			<VideoPlayer ref={videoRef} src="/video/1740757369492" />
			<button onClick={onToggleButtonClick}>{isPlaying ? 'pause' : 'play'}</button>
		</div>
	)
}
