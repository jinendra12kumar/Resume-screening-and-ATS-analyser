from sqlalchemy.ext.asyncio import AsyncSession

from app.db.models.resume import Resume
from app.db.models.resume_data import ResumeData
from app.db.models.ats_analysis import ATSAnalysis

from app.services.ats.section_checker import (
    ATSSectionChecker
)

from app.services.ats.keyword_checker import (
    ATSKeywordChecker
)

from app.services.ats.recommendation_engine import (
    ATSRecommendationEngine
)

from app.services.ats.scoring import (
    ATSScoringEngine
)


class ATSAnalyzerService:

    @staticmethod
    async def analyze_resume(
        db: AsyncSession,
        resume: Resume,
        parsed_data: ResumeData
    ):

        issues = []

        # SECTION ANALYSIS
        section_analysis = (
            ATSSectionChecker.analyze_sections(
                parsed_data.sections
            )
        )

        issues.extend(section_analysis["issues"])

        # KEYWORD ANALYSIS
        keyword_analysis = (
            ATSKeywordChecker.analyze_keywords(
                parsed_data.raw_text
            )
        )

        # FORMATTING SCORE
        formatting_score = 80

        # FINAL SCORE
        ats_score = (
            ATSScoringEngine.calculate_total_score(
                section_score=section_analysis["score"],
                keyword_score=keyword_analysis["score"],
                formatting_score=formatting_score
            )
        )

        # RECOMMENDATIONS
        recommendations = (
            ATSRecommendationEngine.generate(
                issues,
                keyword_analysis
            )
        )

        ats_analysis = ATSAnalysis(
            resume_id=resume.id,
            ats_score=ats_score,
            issues=issues,
            recommendations=recommendations,
            section_scores=section_analysis["section_scores"],
            keyword_score=keyword_analysis["score"],
            formatting_score=formatting_score,
            content_score=75
        )

        db.add(ats_analysis)

        await db.commit()

        return {
            "ats_score": ats_score,
            "issues": issues,
            "recommendations": recommendations,
            "matched_keywords": keyword_analysis["matched_keywords"],
            "missing_keywords": keyword_analysis["missing_keywords"]
        }