ATS_KEYWORDS = [
    "python",
    "aws",
    "docker",
    "kubernetes",
    "fastapi",
    "sql",
    "postgresql",
    "microservices",
    "api",
    "react"
]


class ATSKeywordChecker:

    @staticmethod
    def analyze_keywords(text: str):

        text_lower = text.lower()

        matched = []

        missing = []

        for keyword in ATS_KEYWORDS:

            if keyword in text_lower:
                matched.append(keyword)
            else:
                missing.append(keyword)

        score = (
            len(matched) / len(ATS_KEYWORDS)
        ) * 100

        return {
            "score": score,
            "matched_keywords": matched,
            "missing_keywords": missing
        }