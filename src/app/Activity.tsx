import { useEffect, useState } from 'react'
import { discordSdk } from '../hooks/useDiscordSdk'
import VideoPlayer from '../components/video-player'
import { useSyncState } from '@robojs/sync'
import { Episode } from '../types/episode'
import { EpisodeItem } from '../components/episode-item'

export const Activity = () => {
	const [appMode, setAppMode] = useSyncState<'list' | 'watch'>('list', ['app-mode', discordSdk.channelId])
	const [videoId, setVideoId] = useSyncState<string | null>(null, ['video-id', discordSdk.channelId])

	const [episodes, setEpisodes] = useState<Episode[]>([])

	useEffect(() => {
		const fetchEpisodes = async () => {
			const response = await fetch('/episode/new')
			if (!response.ok) {
				return
			}
			const json = await response.json()
			setEpisodes(json.result)
		}
		fetchEpisodes()
	}, [])

	const startWatchMode = (videoId: string) => {
		setVideoId(videoId)
		setAppMode('watch')
	}

	const closeWatchMode = () => {
		setVideoId(null)
		setAppMode('list')
	}

	return (
		<div className="h-full min-h-dvh w-full bg-neutral-950 text-neutral-100">
			{appMode === 'list' ? (
				<div className="grid grid-cols-2 p-3 lg:grid-cols-4">
					{episodes.map((episode) => (
						<EpisodeItem key={episode.id} episode={episode} onSelect={startWatchMode} />
					))}
				</div>
			) : (
				<div className="group h-full w-full">
					<div className="fixed left-0 top-0 z-50 flex w-full items-center px-10 py-8">
						<button onClick={closeWatchMode} className="opacity-0 transition-all group-hover:opacity-100">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								className="size-10 rounded-lg transition-all hover:bg-neutral-800"
							>
								<path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
							</svg>
						</button>
					</div>
					<VideoPlayer src={`/video/${videoId}`} />
				</div>
			)}
		</div>
	)
}
