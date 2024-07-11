import json
import os
from glob import glob

from dotenv import load_dotenv

from langchain_core.prompts import PromptTemplate
from langchain_openai import ChatOpenAI

from output_parsers import description_parser, Description

YOUR_PRODUCTS_FOLDER_PATH = "C:/Users/Dejan/Documents/GitHub/Chatbot/chatbot/products/"
YOUR_PARSED_PRODUCTS_FOLDER_PATH = "C:/Users/Dejan/Documents/GitHub/Chatbot/chatbot/parsed_products/"

if __name__ == '__main__':
    # load environment variables
    load_dotenv()

    # iterate each json file
    for index, fname in enumerate(glob(YOUR_PRODUCTS_FOLDER_PATH + "*.json")):

        # parse only the first 10 products
        if index >= 10:
            break

        # read file
        with open(fname, 'r', encoding='utf-8') as f:

            # load to json
            product = json.load(f)

            # create template
            summary_template = """
            given the product description: {description} I want you to parse it as a dictionary. 
            For boolean values use true/false. Values need to be in macedonian language
            
            {format_instructions}
            """

            # create prompt template with context
            summary_prompt_template = PromptTemplate(
                input_variables=["description"],
                template=summary_template,
                partial_variables={"format_instructions": description_parser.get_format_instructions()}
            )

            # load model
            llm = ChatOpenAI(temperature=0, model_name="gpt-3.5-turbo")

            # create chain
            chain = summary_prompt_template | llm | description_parser

            # invoke chain
            result: Description = chain.invoke(input={"description": product["description"]})

            # add parsed description to json
            product["description"] = result.description

            # get file name
            file_name = fname.split("\\")[1]

            # save to directory
            path = os.getcwd()
            with open(YOUR_PARSED_PRODUCTS_FOLDER_PATH + file_name, 'w', encoding='utf-8') as f:
                json.dump(product, f, ensure_ascii=False, indent=4)

            print(f"Product {index} parsed.")
