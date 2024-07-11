from typing import List, Dict, Any
from langchain.output_parsers import PydanticOutputParser
from langchain_core.pydantic_v1 import BaseModel, Field


class Description(BaseModel):
    description: Dict[str, str] = Field(description="product description")


description_parser = PydanticOutputParser(pydantic_object=Description)
