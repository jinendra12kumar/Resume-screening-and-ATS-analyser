from sentence_transformers import (
    SentenceTransformer
)

from sklearn.metrics.pairwise import (
    cosine_similarity
)


class EmbeddingService:

    model = SentenceTransformer(
        "all-MiniLM-L6-v2"
    )

    @staticmethod
    def generate_embedding(text: str):

        return EmbeddingService.model.encode(
            text
        )

    @staticmethod
    def similarity(text1: str, text2: str):

        emb1 = EmbeddingService.generate_embedding(
            text1
        )

        emb2 = EmbeddingService.generate_embedding(
            text2
        )

        similarity_score = cosine_similarity(
            [emb1],
            [emb2]
        )[0][0]

        return float(similarity_score * 100)