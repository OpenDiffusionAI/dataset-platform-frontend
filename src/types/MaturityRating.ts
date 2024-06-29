type MaturityRating = {
    nsfw: 'not-rated' | 'safe' | 'suggestive' | 'explicit'
    violence: 'not-rated' | 'none' | 'mild' | 'extreme'
    gore: 'not-rated' | 'none' | 'mild' | 'extreme'
}

class MaturityRatingLocalization {

    static valueLocalization: Record<string, string> = {
        'not-rated': 'Not Rated',
        'safe': 'Safe',
        'suggestive': 'Suggestive',
        'explicit': 'Explicit',
        'none': 'None',
        'mild': 'Mild',
        'extreme': 'Extreme'
    }

    static getRatingValue(value: string): string {
        return this.valueLocalization[value] ?? 'Unknown value'
    }

}

export {MaturityRatingLocalization}

export default MaturityRating