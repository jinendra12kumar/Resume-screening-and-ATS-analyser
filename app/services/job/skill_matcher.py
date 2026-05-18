class SkillMatcher:

    @staticmethod
    def match(
        resume_skills: list,
        jd_skills: list
    ):

        resume_set = set(
            map(str.lower, resume_skills)
        )

        jd_set = set(
            map(str.lower, jd_skills)
        )

        matched = list(
            resume_set.intersection(jd_set)
        )

        missing = list(
            jd_set - resume_set
        )

        score = 0

        if len(jd_set) > 0:

            score = (
                len(matched) / len(jd_set)
            ) * 100

        return {
            "score": round(score, 2),
            "matched_skills": matched,
            "missing_skills": missing
        }