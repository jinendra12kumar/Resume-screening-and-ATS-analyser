import re


SKILLS_DB = [
    "python",
    "fastapi",
    "django",
    "flask",
    "react",
    "node.js",
    "aws",
    "docker",
    "kubernetes",
    "postgresql",
    "mysql",
    "mongodb",
    "redis",
    "javascript",
    "typescript",
    "html",
    "css",
    "git",
    "linux"
]


class SkillExtractor:

    @staticmethod
    def extract_skills(text: str):

        text = text.lower()

        found_skills = set()

        for skill in SKILLS_DB:

            pattern = r"\b" + re.escape(skill) + r"\b"

            if re.search(pattern, text):
                found_skills.add(skill)

        return list(found_skills)