import fitz
import docx


class ResumeExtractor:

    @staticmethod
    def extract_pdf_text(file_path: str):

        text = ""

        doc = fitz.open(file_path)

        for page in doc:
            text += page.get_text()

        return text

    @staticmethod
    def extract_docx_text(file_path: str):

        document = docx.Document(file_path)

        text = "\n".join([
            para.text for para in document.paragraphs
        ])

        return text

    @staticmethod
    def extract_text(file_path: str):

        if file_path.endswith(".pdf"):
            return ResumeExtractor.extract_pdf_text(
                file_path
            )

        elif file_path.endswith(".docx"):
            return ResumeExtractor.extract_docx_text(
                file_path
            )

        else:
            raise Exception("Unsupported file type")