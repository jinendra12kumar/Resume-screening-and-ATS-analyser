REQUIRED_SECTIONS = [
    "experience",
    "education",
    "skills"
]

OPTIONAL_SECTIONS = [
    "projects",
    "certifications"
]


class ATSSectionChecker:

    @staticmethod
    def analyze_sections(sections: dict):

        score = 0

        issues = []

        found_sections = sections.keys()

        section_scores = {}

        for section in REQUIRED_SECTIONS:

            if section in found_sections:

                score += 20

                section_scores[section] = 20

            else:

                issues.append(
                    f"Missing {section} section"
                )

                section_scores[section] = 0

        for section in OPTIONAL_SECTIONS:

            if section in found_sections:

                score += 10

                section_scores[section] = 10

            else:

                section_scores[section] = 0

        return {
            "score": score,
            "issues": issues,
            "section_scores": section_scores
        }