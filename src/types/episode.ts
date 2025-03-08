interface Series {
	id: number
	title: string
	overview: string
	cover_image: string
	logo: string | null
	poster: string
	is_game_original: boolean | null
	is_novel_original: boolean | null
	is_manga_original: boolean | null
	homepage: string
	next_episode_to_air: string
	original_name: string | null
	create_at: string
	update_at: string
}

interface Season {
	id: number
	name: string
	number: number
	auto_upload: boolean
	nyaa_query: string
	encoder: string | null
	is_ass: boolean | null
	is_db: boolean
	is_4k: boolean
	air_date: string
	poster: string
	excluded_episode_count: number | null
	included_episode_count: number | null
	create_at: string
	update_at: string
	series_id: number
}

export interface Episode {
	id: number
	title: string
	description: string
	thumbnail: string
	running_time: number
	number: number
	video_id: string
	subtitle_id: string | null
	is_overlap: boolean | null
	is_special: boolean | null
	kr_description: boolean
	create_at: string
	update_at: string
	season_id: number
	series_id: number
	magnet_id: number
	season: Season
	series: Series
}
