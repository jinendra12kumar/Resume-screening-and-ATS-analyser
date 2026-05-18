import re


SECTION_PATTERNS = {
    "education": r"(education|academic background)",
    "experience": r"(experience|work experience|employment)",
    "projects": r"(projects|personal projects)",
    "skills": r"(skills|technical skills)",
    "certifications": r"(certifications|licenses)"
}


class ResumeSectionParser:

    @staticmethod
    def identify_sections(text: str):

        sections = {}

        lines = text.split("\n")

        current_section = "general"

        sections[current_section] = []

        for line in lines:

            line_lower = line.lower()

            matched = False

            for section_name, pattern in SECTION_PATTERNS.items():

                if re.search(pattern, line_lower):

                    current_section = section_name

                    sections[current_section] = []

                    matched = True

                    break

            if not matched:
                sections[current_section].append(line)

        return {
            key: "\n".join(value)
            for key, value in sections.items()
        }