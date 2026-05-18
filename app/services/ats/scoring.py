class ATSScoringEngine:

    @staticmethod
    def calculate_total_score(
        section_score: float,
        keyword_score: float,
        formatting_score: float
    ):

        total = (
            (section_score * 0.4) +
            (keyword_score * 0.4) +
            (formatting_score * 0.2)
        )

        return round(total, 2)