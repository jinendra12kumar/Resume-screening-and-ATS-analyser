class ATSRecommendationEngine:

    @staticmethod
    def generate(
        issues: list,
        keyword_analysis: dict
    ):

        recommendations = []

        for issue in issues:

            if "Missing" in issue:

                section = issue.replace(
                    "Missing ",
                    ""
                )

                recommendations.append(
                    f"Add a dedicated {section}"
                )

        if keyword_analysis["score"] < 60:

            recommendations.append(
                "Add more ATS-friendly technical keywords"
            )

        if len(keyword_analysis["missing_keywords"]) > 0:

            recommendations.append(
                "Include relevant missing skills where applicable"
            )

        return recommendations