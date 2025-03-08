import { useSyncState } from '@robojs/sync'
import React, { useEffect, useRef, useState } from 'react'
import { discordSdk } from '../hooks/useDiscordSdk'

interface VideoPlayerProps {
	videoSrc: string
	subtitleSrc?: string
}

const VideoPlayer = ({ videoSrc, subtitleSrc }: VideoPlayerProps) => {
	const videoRef = useRef<HTMLVideoElement>(null)
	const containerRef = useRef<HTMLDivElement>(null)

	const [isPlaying, setIsPlaying] = useSyncState<boolean>(false, ['video-playing', discordSdk.channelId])
	const [currentShareTime, setCurrentShareTime] = useSyncState<number>(0, ['video-progress', discordSdk.channelId])

	const [progress, setProgress] = useState(0)
	const [duration, setDuration] = useState(0)
	const [volume, setVolume] = useState(0.5)

	useEffect(() => {
		if (videoRef.current) {
			if (isPlaying) {
				videoRef.current.play()
			} else {
				videoRef.current.pause()
			}
		}
	}, [isPlaying])

	const onToggleButtonClick = () => {
		setIsPlaying((prev) => !prev)
	}

	const onLoadedMetadata = () => {
		if (videoRef.current) {
			setDuration(videoRef.current.duration)
		}
	}

	const onTimeUpdate = () => {
		if (videoRef.current) {
			setProgress(videoRef.current.currentTime)
		}
	}

	const onProgressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (!isNaN(+event.target.value) && videoRef.current) {
			setProgress(+event.target.value)
			setCurrentShareTime(+event.target.value)
		}
	}

	const onVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (!isNaN(+event.target.value) && videoRef.current) {
			setVolume(+event.target.value)
		}
	}

	useEffect(() => {
		if (videoRef.current) {
			videoRef.current.currentTime = currentShareTime
		}
	}, [currentShareTime])

	useEffect(() => {
		if (videoRef.current) {
			videoRef.current.volume = volume
		}
	}, [volume])

	useEffect(() => {
		return () => {
			setProgress(0)
			setDuration(0)
			setCurrentShareTime(0)
			setIsPlaying(false)
		}
	}, [])

	return (
		<div ref={containerRef} className="flex h-full w-full flex-col items-center justify-center">
			<video
				ref={videoRef}
				onLoadedMetadata={onLoadedMetadata}
				onTimeUpdate={onTimeUpdate}
				className="aspect-video h-screen w-full"
				onClick={onToggleButtonClick}
			>
				<source src={videoSrc} type="video/mp4" />
				<track label="Korean" kind="subtitles" lang="kr" src={subtitleSrc} default />
			</video>
			<div className="fixed bottom-0 flex h-32 w-full items-center gap-3 px-10 opacity-0 transition-all group-hover:opacity-100">
				<button onClick={onToggleButtonClick} className="relative">
					{isPlaying ? (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							className="size-10 rounded-lg transition-all hover:bg-neutral-800"
						>
							<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
						</svg>
					) : (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							className="size-10 rounded-lg transition-all hover:bg-neutral-800"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
							/>
						</svg>
					)}
				</button>
				<div className="flex w-full flex-col justify-center pt-6">
					<div className="relative mb-2 w-full">
						<div className="h-1 w-full rounded-full bg-white/30 transition-all duration-200 group-hover:h-1.5"></div>

						<div
							className="absolute left-0 top-0 h-1 rounded-full bg-blue-400 transition-all duration-200 group-hover:h-1.5"
							style={{ width: `${(progress / duration) * 100}%` }}
						></div>

						<input
							type="range"
							min={0}
							max={duration}
							value={progress}
							onChange={onProgressChange}
							className="absolute left-0 top-0 h-1 w-full cursor-pointer appearance-none bg-transparent transition-all duration-200 group-hover:h-1.5"
							style={{
								WebkitAppearance: 'none',
								margin: 0
							}}
						/>
					</div>
					<span className="text-xs text-white">
						{Math.floor(progress / 60)}:
						{Math.floor(progress % 60)
							.toString()
							.padStart(2, '0')}{' '}
						/{Math.floor(duration / 60)}:
						{Math.floor(duration % 60)
							.toString()
							.padStart(2, '0')}
					</span>
				</div>
				<div className="flex items-center">
					<button className="mr-2 text-white">{volume > 0 ? '🔊' : '🔇'}</button>
					<div className="relative w-20">
						<div className="h-1 w-full rounded-full bg-white/30 transition-all duration-200 group-hover:h-1.5"></div>

						<div
							className="absolute left-0 top-0 h-1 rounded-full bg-blue-400 transition-all duration-200 group-hover:h-1.5"
							style={{ width: `${volume * 100}%` }}
						></div>

						<input
							type="range"
							min={0}
							max={1}
							step={0.1}
							value={volume}
							onChange={onVolumeChange}
							className="absolute left-0 top-0 h-1 w-full cursor-pointer appearance-none bg-transparent transition-all duration-200 group-hover:h-1.5"
							style={{
								WebkitAppearance: 'none',
								margin: 0
							}}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default VideoPlayer
