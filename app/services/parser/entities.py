import re


class ResumeEntities:

    EMAIL_REGEX = r"[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+"

    PHONE_REGEX = r"(\+?\d[\d\s\-\(\)]{8,}\d)"

    LINKEDIN_REGEX = r"(https?:\/\/)?(www\.)?linkedin\.com\/in\/[A-z0-9_-]+"

    GITHUB_REGEX = r"(https?:\/\/)?(www\.)?github\.com\/[A-z0-9_-]+"


    @staticmethod
    def extract_email(text: str):

        match = re.search(
            ResumeEntities.EMAIL_REGEX,
            text
        )

        return match.group(0) if match else None


    @staticmethod
    def extract_phone(text: str):

        match = re.search(
            ResumeEntities.PHONE_REGEX,
            text
        )

        return match.group(0) if match else None


    @staticmethod
    def extract_linkedin(text: str):

        match = re.search(
            ResumeEntities.LINKEDIN_REGEX,
            text
        )

        return match.group(0) if match else None


    @staticmethod
    def extract_github(text: str):

        match = re.search(
            ResumeEntities.GITHUB_REGEX,
            text
        )

        return match.group(0) if match else None