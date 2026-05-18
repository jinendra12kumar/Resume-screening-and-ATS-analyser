from sqlalchemy.ext.asyncio import AsyncSession

from app.db.models.job_match import JobMatch

from app.services.ai.embedding_service import (
    EmbeddingService
)

from app.services.job.skill_matcher import (
    SkillMatcher
)


class JobMatchingEngine:

    @staticmethod
    async def match_resume_to_job(
        db: AsyncSession,
        resume,
        parsed_resume,
        job
    ):

        # SEMANTIC SIMILARITY
        semantic_score = (
            EmbeddingService.similarity(
                parsed_resume.raw_text,
                job.description
            )
        )

        # SKILL MATCHING
        skill_analysis = SkillMatcher.match(
            parsed_resume.skills,
            job.extracted_skills
        )

        # OVERALL SCORE
        overall_score = (
            (semantic_score * 0.7) +
            (skill_analysis["score"] * 0.3)
        )

        recommendation = (
            "Strong match candidate"
            if overall_score >= 75
            else "Moderate match candidate"
        )

        match = JobMatch(
            resume_id=resume.id,
            job_id=job.id,
            semantic_score=semantic_score,
            skill_match_score=skill_analysis["score"],
            overall_score=overall_score,
            matched_skills=skill_analysis[
                "matched_skills"
            ],
            missing_skills=skill_analysis[
                "missing_skills"
            ],
            recommendation=recommendation
        )

        db.add(match)

        await db.commit()

        return {
            "semantic_score": semantic_score,
            "skill_match_score": skill_analysis[
                "score"
            ],
            "overall_score": overall_score,
            "matched_skills": skill_analysis[
                "matched_skills"
            ],
            "missing_skills": skill_analysis[
                "missing_skills"
            ],
            "recommendation": recommendation
        }