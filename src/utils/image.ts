/**
 * TMDB 이미지 URL을 내부 프록시 URL로 변환합니다.
 * @param url TMDB 이미지 URL
 * @returns 내부 프록시 URL
 */
export function mapTmdbImageUrl(url: string) {
	const match = url.match(/^https:\/\/image\.tmdb\.org\/t\/p\/original\/(.+)$/)
	return match ? `/image/tmdb/${match[1]}` : url
}
