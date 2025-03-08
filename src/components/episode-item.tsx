import { Episode } from '../types/episode'
import { mapTmdbImageUrl } from '../utils/image'

interface EpisodeItemProps {
	episode: Episode
	onSelect: (videoId: string, subtitleId: string | null) => void
}

export const EpisodeItem = ({ episode, onSelect }: EpisodeItemProps) => {
	return (
		<div
			id={`${episode.id}`}
			className="cursor-pointer rounded-lg border border-transparent p-1.5 transition-all hover:border-neutral-400 hover:bg-neutral-800"
			onClick={() => onSelect(episode.video_id, episode.subtitle_id)}
		>
			<h5 className="text-xs font-light text-neutral-400">
				{episode.series.title} {episode.season.name}
			</h5>
			<span className="text-sm font-medium">
				{episode.number}. {episode.title}
			</span>
			<div className="overflow-hidden rounded-lg">
				<img src={mapTmdbImageUrl(episode.thumbnail)} alt={episode.title} />
			</div>
		</div>
	)
}
