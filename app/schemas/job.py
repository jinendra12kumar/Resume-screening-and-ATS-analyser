from pydantic import BaseModel


class JobCreateSchema(BaseModel):

    title: str

    company_name: str

    description: str