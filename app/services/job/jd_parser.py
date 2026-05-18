from app.services.parser.skills import (
    SkillExtractor
)


class JobDescriptionParser:

    @staticmethod
    def parse(description: str):

        skills = SkillExtractor.extract_skills(
            description
        )

        return {
            "skills": skills
        }